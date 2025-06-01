const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/emailService');
const io = require('../server');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
  try {
    let query;
    
    if (req.user.role === 'patient') {
      query = Appointment.find({ patient: req.user.id });
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      query = Appointment.find({ doctor: doctor._id });
    } else {
      // Admin can see all appointments
      query = Appointment.find();
    }
    
    const appointments = await query.sort('-date');
    
    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is appointment owner or admin
    if (
      appointment.patient.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      const doctor = await Doctor.findOne({ user: req.user.id });
      
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return next(
          new ErrorResponse(`User not authorized to access this appointment`, 401)
        );
      }
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res, next) => {
  try {
    // Add patient to req.body
    req.body.patient = req.user.id;
    
    // Check if doctor exists
    const doctor = await Doctor.findById(req.body.doctor);
    
    if (!doctor) {
      return next(
        new ErrorResponse(`Doctor not found with id of ${req.body.doctor}`, 404)
      );
    }
    
    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      doctor: req.body.doctor,
      date: req.body.date,
      time: req.body.time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    if (existingAppointment) {
      return next(
        new ErrorResponse('This appointment slot is already booked', 400)
      );
    }
    
    // Create meeting link (in a real app, this would integrate with a video API)
    const meetingId = crypto.randomBytes(8).toString('hex');
    req.body.meetingLink = `${process.env.FRONTEND_URL}/meeting/${meetingId}`;
    
    const appointment = await Appointment.create(req.body);
    
    // Send notification to doctor
    const doctorUser = await User.findById(doctor.user);
    
    const message = `You have a new appointment request from ${req.user.name} on ${appointment.date} at ${appointment.time}.`;
    
    try {
      await sendEmail({
        email: doctorUser.email,
        subject: 'New Appointment Request',
        message
      });
      
      // Real-time notification via Socket.io
      io.to(`doctor-${doctor._id}`).emit('new-appointment', {
        message: 'You have a new appointment request',
        appointment
      });
    } catch (err) {
      console.error('Error sending appointment notification:', err);
    }
    
    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is appointment owner or doctor or admin
    if (
      appointment.patient.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      const doctor = await Doctor.findOne({ user: req.user.id });
      
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return next(
          new ErrorResponse(`User not authorized to update this appointment`, 401)
        );
      }
    }
    
    // Prevent changing patient or doctor
    if (req.body.patient || req.body.doctor) {
      return next(
        new ErrorResponse('Cannot change patient or doctor of an appointment', 400)
      );
    }
    
    // If doctor is updating, only allow certain fields
    if (req.user.role === 'doctor') {
      const allowedFields = ['status', 'diagnosis', 'prescription', 'followUpDate', 'notes'];
      Object.keys(req.body).forEach(key => {
        if (!allowedFields.includes(key)) {
          delete req.body[key];
        }
      });
    }
    
    // If status is being updated to completed, set payment status to paid if not already
    if (req.body.status === 'completed' && appointment.paymentStatus !== 'paid') {
      req.body.paymentStatus = 'paid';
      req.body.paymentDate = Date.now();
    }
    
    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    // Notify patient if appointment status changed
    if (req.body.status && req.body.status !== appointment.status) {
      const patient = await User.findById(appointment.patient);
      
      const message = `Your appointment status has been updated to ${req.body.status}.`;
      
      try {
        await sendEmail({
          email: patient.email,
          subject: 'Appointment Status Update',
          message
        });
        
        // Real-time notification via Socket.io
        io.to(`patient-${patient._id}`).emit('appointment-update', {
          message: 'Your appointment status has been updated',
          appointment
        });
      } catch (err) {
        console.error('Error sending status update notification:', err);
      }
    }
    
    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return next(
        new ErrorResponse(`Appointment not found with id of ${req.params.id}`, 404)
      );
    }
    
    // Make sure user is appointment owner or admin
    if (
      appointment.patient.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return next(
        new ErrorResponse(`User not authorized to delete this appointment`, 401)
      );
    }
    
    await appointment.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get available slots for a doctor
// @route   GET /api/appointments/slots/:doctorId
// @access  Public
exports.getAvailableSlots = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    
    if (!doctor) {
      return next(
        new ErrorResponse(`Doctor not found with id of ${req.params.doctorId}`, 404)
      );
    }
    
    // Get requested date or default to today
    const date = req.query.date ? new Date(req.query.date) : new Date();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Find doctor's availability for this day
    const availability = doctor.availableDays.find(day => day.day === dayName);
    
    if (!availability) {
      return res.status(200).json({
        success: true,
        data: []
      });
    }
    
    // Get booked appointments for this doctor on this date
    const bookedAppointments = await Appointment.find({
      doctor: doctor._id,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      },
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Generate available slots
    const availableSlots = availability.slots.map
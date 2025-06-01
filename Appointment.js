const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Appointment must belong to a patient']
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'Appointment must belong to a doctor']
  },
  date: {
    type: Date,
    required: [true, 'Please provide appointment date']
  },
  time: {
    type: String,
    required: [true, 'Please provide appointment time']
  },
  duration: {
    type: Number,
    default: 30 // minutes
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  reason: {
    type: String,
    required: [true, 'Please provide reason for appointment']
  },
  symptoms: [String],
  notes: String,
  diagnosis: String,
  prescription: [{
    medicine: String,
    dosage: String,
    frequency: String,
    duration: String,
    notes: String
  }],
  followUpDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentAmount: Number,
  paymentMethod: String,
  paymentDate: Date,
  meetingLink: String
});

// Populate patient and doctor data when querying appointments
appointmentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'patient',
    select: 'name email phone'
  }).populate({
    path: 'doctor',
    select: 'specialization consultationFee',
    populate: {
      path: 'user',
      select: 'name avatar'
    }
  });
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
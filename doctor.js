const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  specialization: {
    type: String,
    required: [true, 'Please enter your specialization']
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please enter your license number'],
    unique: true
  },
  education: [{
    degree: String,
    university: String,
    year: Number
  }],
  experience: [{
    position: String,
    hospital: String,
    from: Date,
    to: Date,
    current: Boolean,
    description: String
  }],
  bio: String,
  consultationFee: {
    type: Number,
    required: [true, 'Please enter your consultation fee']
  },
  availableDays: [{
    day: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    slots: [{
      startTime: String,
      endTime: String,
      maxPatients: Number
    }]
  }],
  languages: [String],
  awards: [{
    name: String,
    year: Number,
    organization: String
  }],
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be at least 1.0'],
    max: [5, 'Rating must be at most 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Populate user data when querying doctors
doctorSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email avatar phone'
  });
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema);
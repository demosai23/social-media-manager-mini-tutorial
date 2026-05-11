const mongoose = require('mongoose')

const tutorialProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    enum: ['facebook', 'instagram'],
  },
  completedLessons: {
    type: [Number],
    default: [],
  },
  totalLessons: {
    type: Number,
    default: 4,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('TutorialProgress', tutorialProgressSchema)
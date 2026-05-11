const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

// POST — Save a new message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required!' })
    }

    // Save to MongoDB
    const newMessage = new Message({ name, email, subject, message })
    await newMessage.save()

    res.status(201).json({ success: true, message: 'Message sent successfully! ✅' })
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// GET — Retrieve all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log('--- REGISTER HIT ---')
    console.log('Body received:', req.body)

    const { email, password } = req.body

    if (!email || !password) {
      console.log('Validation failed: missing fields')
      return res.status(400).json({ error: 'Please fill in all fields!' })
    }

    if (password.length < 6) {
      console.log('Validation failed: password too short')
      return res.status(400).json({ error: 'Password must be at least 6 characters!' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('Validation failed: email already exists')
      return res.status(400).json({ error: 'Email already registered!' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({ email, password: hashedPassword })
    await user.save()

    console.log('User saved:', user.email)

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (err) {
    console.log('REGISTER ERROR:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log('--- LOGIN HIT ---')
    console.log('Body received:', req.body)

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Please fill in all fields!' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'No account found with this email!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password!' })
    }

    user.lastLogin = new Date()
    await user.save()

    console.log('Login successful:', user.email)

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      },
    })
  } catch (err) {
    console.log('LOGIN ERROR:', err.message)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
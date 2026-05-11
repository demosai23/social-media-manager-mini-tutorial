const express = require('express')
const router = express.Router()
const TutorialProgress = require('../models/TutorialProgress')

// GET — Load progress for a user and platform
router.get('/:userId/:platform', async (req, res) => {
  try {
    const { userId, platform } = req.params
    console.log(`Loading progress for ${userId} on ${platform}`)

    const progress = await TutorialProgress.findOne({ userId, platform })

    if (!progress) {
      return res.status(200).json({
        completedLessons: [],
        totalLessons: 4,
        completed: false,
      })
    }

    res.status(200).json(progress)
  } catch (err) {
    console.log('Progress load error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// POST — Save progress for a user and platform
router.post('/save', async (req, res) => {
  try {
    const { userId, email, platform, completedLessons, totalLessons } = req.body
    console.log(`Saving progress for ${email} on ${platform}`)

    // Check if progress already exists
    let progress = await TutorialProgress.findOne({ userId, platform })

    if (progress) {
      // Update existing
      progress.completedLessons = completedLessons
      progress.completed = completedLessons.length >= totalLessons
      progress.lastUpdated = new Date()
      await progress.save()
    } else {
      // Create new
      progress = new TutorialProgress({
        userId,
        email,
        platform,
        completedLessons,
        totalLessons,
        completed: completedLessons.length >= totalLessons,
      })
      await progress.save()
    }

    console.log(`Progress saved: ${completedLessons.length}/${totalLessons}`)

    res.status(200).json({
      success: true,
      message: 'Progress saved!',
      progress,
    })
  } catch (err) {
    console.log('Progress save error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// GET — Load all progress for dashboard
router.get('/all/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const allProgress = await TutorialProgress.find({ userId })
    res.status(200).json(allProgress)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
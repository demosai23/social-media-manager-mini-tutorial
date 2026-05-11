const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnectDB = require ('./config/db')
const messageRoutes = require('./routes/messageRoutes')
const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/messages', messageRoutes)
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.send('Server is running ✅')
})

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`)
})
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import {
  FaFacebook,
  FaInstagram,
  FaBook,
  FaCheckCircle,
  FaArrowRight,
  FaUser,
  FaSignOutAlt,
  FaStar,
  FaLock,
} from 'react-icons/fa'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [fbProgress, setFbProgress] = useState(0)
  const [igProgress, setIgProgress] = useState(0)
  const [fbCompleted, setFbCompleted] = useState(0)
  const [igCompleted, setIgCompleted] = useState(0)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      toast.error('Please log in first!')
      navigate('/login')
    } else {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      loadAllProgress(parsedUser.id)
    }
  }, [navigate])

  const loadAllProgress = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/progress/all/${userId}`)
      const data = await response.json()
      if (response.ok) {
        data.forEach((p) => {
          const percent = Math.round((p.completedLessons.length / p.totalLessons) * 100)
          if (p.platform === 'facebook') {
            setFbProgress(percent)
            setFbCompleted(p.completedLessons.length)
          }
          if (p.platform === 'instagram') {
            setIgProgress(percent)
            setIgCompleted(p.completedLessons.length)
          }
        })
      }
    } catch (_error) {
      console.log('Could not load progress')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    toast.success('Logged out successfully!')
    setTimeout(() => navigate('/'), 1500)
  }

  const totalCompleted = fbCompleted + igCompleted

  const platforms = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-500 text-3xl" />,
      borderColor: 'hover:border-blue-500/50',
      progressColor: 'bg-blue-500',
      badgeColor: 'bg-blue-500/20 text-blue-400',
      progress: fbProgress,
      completed: fbCompleted,
      lessons: 4,
      path: '/tutorials/facebook',
      topics: [
        'Setting up a Business Page',
        'Creating your first post',
        'Facebook Insights',
        'Running Basic Ads',
      ],
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="text-pink-500 text-3xl" />,
      borderColor: 'hover:border-pink-500/50',
      progressColor: 'bg-pink-500',
      badgeColor: 'bg-pink-500/20 text-pink-400',
      progress: igProgress,
      completed: igCompleted,
      lessons: 4,
      path: '/tutorials/instagram',
      topics: [
        'Setting up a Business Profile',
        'Creating engaging Reels',
        'Using Stories effectively',
        'Growing your followers',
      ],
    },
  ]

  const stats = [
    {
      label: 'Tutorials Available',
      value: '8',
      icon: <FaBook className="text-blue-400" />,
    },
    {
      label: 'Platforms',
      value: '2',
      icon: <FaStar className="text-pink-400" />,
    },
    {
      label: 'Completed',
      value: totalCompleted,
      icon: <FaCheckCircle className="text-green-400" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-16">

        {/* WELCOME HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-white font-extrabold text-3xl md:text-4xl mb-2">
              Welcome back,{' '}
              <span className="gradient-text">
                {user?.email?.split('@')[0] || 'Learner'} 👋
              </span>
            </h1>
            <p className="text-gray-400 text-sm">
              Pick up where you left off or start a new tutorial.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2">
              <FaUser className="text-gray-400 text-sm" />
              <span className="text-gray-300 text-sm">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-white font-extrabold text-2xl">{stat.value}</div>
              <div className="text-gray-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PLATFORM CARDS */}
        <h2 className="text-white font-bold text-xl mb-4">
          Your Tutorial Tracks
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {platforms.map((platform, i) => (
            <div
              key={i}
              className={`bg-[#1a1a1a] border border-white/10 ${platform.borderColor} rounded-2xl p-6 transition`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {platform.icon}
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {platform.name}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${platform.badgeColor}`}>
                      {platform.lessons} Lessons
                    </span>
                  </div>
                </div>
                <div className="text-gray-400 text-sm font-semibold">
                  {platform.progress}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                <div
                  className={`${platform.progressColor} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${platform.progress}%` }}
                />
              </div>
              <p className="text-gray-500 text-xs mb-5">
                {platform.completed} of {platform.lessons} lessons completed
              </p>

              {/* Topics */}
              <ul className="space-y-2 mb-6">
                {platform.topics.map((topic, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-gray-400 text-sm"
                  >
                    {j < platform.completed ? (
                      <FaCheckCircle className="text-green-400 text-xs flex-shrink-0" />
                    ) : (
                      <FaLock className="text-gray-600 text-xs flex-shrink-0" />
                    )}
                    {topic}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(platform.path)}
                className="gradient-btn w-full text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                {platform.progress === 0 && 'Start ' + platform.name + ' Tutorials'}
                {platform.progress > 0 && platform.progress < 100 && 'Continue ' + platform.name + ' Tutorials'}
                {platform.progress === 100 && 'Review ' + platform.name + ' Tutorials'}
                <FaArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* QUICK TIPS */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            Quick Tips for Beginners
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                tip: 'Start with Facebook',
                desc: 'Facebook is easier for beginners. Master it before moving to Instagram.',
              },
              {
                tip: 'Post Consistently',
                desc: 'Even 3 posts per week is better than posting 10 times then going silent.',
              },
              {
                tip: 'Engage with Comments',
                desc: 'Always reply to comments. It builds trust and boosts your reach.',
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-sm" />
                  <span className="text-white font-semibold text-sm">{item.tip}</span>
                </div>
                <p className="text-gray-400 text-xs pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
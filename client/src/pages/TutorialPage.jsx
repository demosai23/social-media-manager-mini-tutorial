import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaArrowRight,
  FaClock,
  FaStar,
  FaCheckCircle,
} from 'react-icons/fa'

function TutorialPage() {
  const navigate = useNavigate()

  const tracks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className="text-blue-500 text-5xl" />,
      color: 'blue',
      borderColor: 'hover:border-blue-500/50',
      badgeColor: 'bg-blue-500/20 text-blue-400',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      path: '/tutorials/facebook',
      level: 'Beginner',
      duration: '4 Lessons',
      description:
        'Learn how to set up a Facebook Business Page, create posts, understand insights, and run your first ad.',
      topics: [
        'Setting up a Business Page',
        'Creating your first post',
        'Understanding Facebook Insights',
        'Running Basic Ads',
      ],
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className="text-pink-500 text-5xl" />,
      color: 'pink',
      borderColor: 'hover:border-pink-500/50',
      badgeColor: 'bg-pink-500/20 text-pink-400',
      buttonColor: 'bg-pink-500 hover:bg-pink-600',
      path: '/tutorials/instagram',
      level: 'Beginner',
      duration: '4 Lessons',
      description:
        'Learn how to set up an Instagram Business Profile, create Reels, use Stories, and grow your followers.',
      topics: [
        'Setting up a Business Profile',
        'Creating engaging Reels',
        'Using Stories effectively',
        'Growing your followers',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-16">

        {/* ───── HEADER ───── */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Choose Your <span className="gradient-text">Tutorial Track</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Pick a platform and start learning at your own pace.
            All tutorials are beginner-friendly and free.
          </p>
        </div>

        {/* ───── TUTORIAL CARDS ───── */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tracks.map((track, i) => (
            <div
              key={i}
              className={`bg-[#1a1a1a] border border-white/10 ${track.borderColor} rounded-2xl p-8 transition flex flex-col`}
            >
              {/* Icon */}
              <div className="mb-6">{track.icon}</div>

              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-3 py-1 rounded-full ${track.badgeColor}`}>
                  {track.level}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 flex items-center gap-1">
                  <FaClock className="text-xs" /> {track.duration}
                </span>
              </div>

              {/* Title + Description */}
              <h2 className="text-white font-bold text-2xl mb-3">
                {track.name} Tutorials
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                {track.description}
              </p>

              {/* Topics */}
              <ul className="space-y-3 mb-8 flex-1">
                {track.topics.map((topic, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-gray-300 text-sm"
                  >
                    <FaCheckCircle className={`text-${track.color}-500 flex-shrink-0`} />
                    {topic}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => navigate(track.path)}
                className={`${track.buttonColor} w-full text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition`}
              >
                Start {track.name} Track <FaArrowRight />
              </button>
            </div>
          ))}
        </div>

        {/* ───── WHY THESE PLATFORMS ───── */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            Why <span className="gradient-text">Facebook & Instagram?</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '👥',
                title: 'Biggest Audience',
                desc: 'Facebook has 3B+ users. Instagram has 2B+. Your audience is already there.',
              },
              {
                icon: '💰',
                title: 'Best for Business',
                desc: 'Both platforms have powerful free tools built specifically for small businesses.',
              },
              {
                icon: '📱',
                title: 'Beginner Friendly',
                desc: 'Easy to use interfaces with lots of built-in guidance for new page owners.',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default TutorialPage
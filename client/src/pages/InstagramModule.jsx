import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import {
  FaInstagram,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaLock,
  FaSpinner,
} from 'react-icons/fa'
import toast from 'react-hot-toast'

const lessons = [
  {
    id: 1,
    title: 'Setting up a Business Profile',
    duration: '5 min read',
    content: [
      {
        heading: 'What is an Instagram Business Profile?',
        text: 'An Instagram Business Profile is a free account type designed for brands, businesses, and creators. It unlocks analytics, contact buttons, ads, and Instagram Shopping.',
      },
      {
        heading: 'Step 1 — Download Instagram',
        text: 'Download the Instagram app on your phone. Create a personal account first if you do not have one — you will convert it to a Business Profile in the next steps.',
      },
      {
        heading: 'Step 2 — Switch to Professional Account',
        text: 'Go to your Profile, tap the three lines menu, then Settings, then Account, then Switch to Professional Account. Choose Business from the options.',
      },
      {
        heading: 'Step 3 — Fill in Your Profile',
        text: 'Add a clear profile photo (your logo), write a concise bio (max 150 characters), and add your website link and contact information.',
      },
      {
        heading: 'Step 4 — Connect to Facebook Page',
        text: 'Link your Instagram Business Profile to your Facebook Business Page. This allows you to run ads across both platforms and cross-post content easily.',
      },
    ],
    tip: 'Pro Tip: Write your Instagram bio like a 3-second elevator pitch. Include what you do, who you help, and a call-to-action like "Check our latest work below".',
  },
  {
    id: 2,
    title: 'Creating Engaging Reels',
    duration: '6 min read',
    content: [
      {
        heading: 'Why Reels are the Most Powerful Tool',
        text: 'Instagram Reels get significantly more reach than regular posts or Stories. Instagram actively pushes Reels to non-followers, making them the best way to grow your audience organically.',
      },
      {
        heading: 'Step 1 — Open the Reels Camera',
        text: 'Tap the + button at the bottom of Instagram, then select Reel. You will see options for video length (15s, 30s, 60s, 90s). Start with 15-30 seconds.',
      },
      {
        heading: 'Step 2 — Plan Your Hook',
        text: 'The first 1-2 seconds determine if someone keeps watching. Start with something visually interesting or a bold statement. Never start with a slow intro.',
      },
      {
        heading: 'Step 3 — Add Audio',
        text: 'Tap the music note icon to add trending audio. Using trending sounds boosts your Reel chances of being pushed to the Explore page.',
      },
      {
        heading: 'Step 4 — Write Your Caption and Hashtags',
        text: 'Write a short engaging caption and add 5-10 relevant hashtags. Use a mix of large (1M+ posts) and small (under 100K posts) hashtags for best reach.',
      },
    ],
    tip: 'Pro Tip: Film Reels in batches. Set aside one hour per week and film 3-5 Reels at once. This keeps you consistent without feeling overwhelmed.',
  },
  {
    id: 3,
    title: 'Using Stories Effectively',
    duration: '5 min read',
    content: [
      {
        heading: 'What are Instagram Stories?',
        text: 'Stories are 15-second photos or videos that disappear after 24 hours. They appear at the top of your followers feeds and are perfect for behind-the-scenes content and quick updates.',
      },
      {
        heading: 'Step 1 — Post Stories Daily',
        text: 'Unlike feed posts, Stories should be posted daily. They keep you at the top of your followers feeds and signal to the algorithm that you are an active account.',
      },
      {
        heading: 'Step 2 — Use Interactive Stickers',
        text: 'Add Poll, Quiz, and Question stickers to your Stories. These dramatically increase engagement and tell the algorithm your audience is interested in your content.',
      },
      {
        heading: 'Step 3 — Save Best Stories as Highlights',
        text: 'Story Highlights appear permanently on your profile. Use them to organize your best Stories into categories like About Us, Services, Reviews, and Tips.',
      },
      {
        heading: 'Step 4 — Use the Link Sticker',
        text: 'If you have a website, add the Link sticker to your Stories to drive traffic. This is one of the most powerful tools for converting followers into customers.',
      },
    ],
    tip: 'Pro Tip: Show your face in Stories at least twice a week. People follow people, not just brands. Personal Stories build deeper trust with your audience.',
  },
  {
    id: 4,
    title: 'Growing Your Followers',
    duration: '7 min read',
    content: [
      {
        heading: 'The Truth About Growing on Instagram',
        text: 'Growing on Instagram takes time and consistency. There are no shortcuts. Focus on providing genuine value and the followers will come naturally.',
      },
      {
        heading: 'Strategy 1 — Post Reels Consistently',
        text: 'Aim for 3-5 Reels per week. Reels are the top priority for organic reach right now. This is the fastest free way to reach new audiences.',
      },
      {
        heading: 'Strategy 2 — Engage Every Day',
        text: 'Spend 15-20 minutes daily replying to comments, responding to DMs, and commenting on posts from accounts in your niche. Engagement attracts engagement.',
      },
      {
        heading: 'Strategy 3 — Collaborate with Others',
        text: 'Use the Collab feature to co-post content with other creators in your niche. Your Reel appears on both profiles, doubling your reach instantly.',
      },
      {
        heading: 'Strategy 4 — Analyze and Adjust',
        text: 'Check your Instagram Insights weekly. Look at which content got the most reach and saves. Double down on those content types and drop what is not working.',
      },
    ],
    tip: 'Pro Tip: Focus on getting Saves on your posts. When someone saves your post, Instagram sees it as highly valuable content and shows it to more people.',
  },
]

function InstagramModule() {
  const navigate = useNavigate()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completed, setCompleted] = useState([])
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [user, setUser] = useState(null)

  const lesson = lessons[currentLesson]

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (!savedUser) {
      toast.error('Please log in first!')
      navigate('/login')
      return
    }
    const parsedUser = JSON.parse(savedUser)
    setUser(parsedUser)
    loadProgress(parsedUser.id)
  }, [navigate])

  const loadProgress = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/progress/${userId}/instagram`)
      const data = await response.json()
      if (response.ok) {
        setCompleted(data.completedLessons || [])
      }
    } catch (_error) {
      toast.error('Could not load progress.')
    }
    setLoadingProgress(false)
  }

  const saveProgress = async (newCompleted) => {
    if (!user) return
    try {
      await fetch('http://localhost:5000/api/progress/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          platform: 'instagram',
          completedLessons: newCompleted,
          totalLessons: lessons.length,
        }),
      })
    } catch (_error) {
      toast.error('Could not save progress.')
    }
  }

  const handleComplete = async () => {
    let newCompleted = completed
    if (!completed.includes(currentLesson)) {
      newCompleted = [...completed, currentLesson]
      setCompleted(newCompleted)
      await saveProgress(newCompleted)
      toast.success('Lesson completed! Progress saved! 🎉')
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1)
    } else {
      toast.success('You completed the Instagram Track! 🏆')
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  if (loadingProgress) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <FaSpinner className="text-pink-500 text-4xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-16">

        <div className="flex items-center gap-3 mb-8">
          <FaInstagram className="text-pink-500 text-4xl" />
          <div>
            <h1 className="text-white font-extrabold text-3xl">
              Instagram Tutorials
            </h1>
            <p className="text-gray-400 text-sm">
              {completed.length} of {lessons.length} lessons completed
            </p>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 mb-10">
          <div
            className="bg-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completed.length / lessons.length) * 100}%` }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="flex flex-col gap-3">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-2">
              Lessons
            </h3>
            {lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setCurrentLesson(i)}
                className={`flex items-center gap-3 p-4 rounded-xl border text-left transition ${
                  currentLesson === i
                    ? 'bg-pink-500/20 border-pink-500/50 text-white'
                    : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {completed.includes(i) ? (
                  <FaCheckCircle className="text-green-400 flex-shrink-0" />
                ) : (
                  <FaLock className="text-gray-600 flex-shrink-0 text-xs" />
                )}
                <div>
                  <p className="text-sm font-semibold">Lesson {i + 1}</p>
                  <p className="text-xs opacity-70">{l.title}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-pink-400 text-xs font-semibold uppercase tracking-widest">
                  Lesson {currentLesson + 1} of {lessons.length}
                </span>
                <h2 className="text-white font-bold text-2xl mt-1">
                  {lesson.title}
                </h2>
              </div>
              <span className="text-gray-500 text-xs">{lesson.duration}</span>
            </div>

            <div className="flex flex-col gap-6 mb-8">
              {lesson.content.map((block, i) => (
                <div key={i}>
                  <h4 className="text-white font-semibold mb-2">{block.heading}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4 mb-8">
              <p className="text-pink-300 text-sm">{lesson.tip}</p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <FaArrowLeft /> Previous
              </button>
              <button
                onClick={handleComplete}
                className="gradient-btn text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2"
              >
                {currentLesson === lessons.length - 1 ? 'Finish Track' : 'Complete & Next'}
                <FaArrowRight />
              </button>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default InstagramModule
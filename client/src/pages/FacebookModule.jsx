import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import {
  FaFacebook,
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
    title: 'Setting up a Business Page',
    duration: '5 min read',
    content: [
      {
        heading: 'What is a Facebook Business Page?',
        text: 'A Facebook Business Page is a free public profile specifically created for businesses, brands, organizations, and public figures. Unlike personal profiles, Business Pages give you access to tools like insights, ads, and scheduling.',
      },
      {
        heading: 'Step 1 — Log in to Facebook',
        text: 'Go to facebook.com and log in to your personal account. Your personal account will not be visible on your business page.',
      },
      {
        heading: 'Step 2 — Create a Page',
        text: 'Click on the menu (9 dots) in the top right corner. Select Page from the options. You will be taken to the Page creation screen.',
      },
      {
        heading: 'Step 3 — Fill in Your Details',
        text: 'Enter your Page Name (your business name), Category (e.g., Digital Marketing Agency), and a short Description of what your business does.',
      },
      {
        heading: 'Step 4 — Add Profile and Cover Photos',
        text: 'Upload a clear profile photo (your logo works best) and a cover photo that represents your brand. These are the first things visitors see.',
      },
    ],
    tip: 'Pro Tip: Use your business logo as your profile photo. It makes your page look professional and trustworthy immediately.',
  },
  {
    id: 2,
    title: 'Creating Your First Post',
    duration: '4 min read',
    content: [
      {
        heading: 'Why Posting Matters',
        text: 'Regular posts keep your audience engaged and help Facebook algorithm show your page to more people. Consistency is more important than perfection.',
      },
      {
        heading: 'Step 1 — Go to Your Page',
        text: 'Navigate to your Business Page and find the Create Post box at the top of your page feed.',
      },
      {
        heading: 'Step 2 — Write Your Caption',
        text: 'Keep it short and clear. Start with a hook — the first line should grab attention. Use action words like Discover, Learn, or Try.',
      },
      {
        heading: 'Step 3 — Add an Image or Video',
        text: 'Posts with visuals get 3x more engagement than text-only posts. Use bright, clear images that relate to your message.',
      },
      {
        heading: 'Step 4 — Publish or Schedule',
        text: 'Click Post Now to publish immediately, or use Schedule Post to set a future date and time. Best times to post: 9AM, 12PM, or 6PM.',
      },
    ],
    tip: 'Pro Tip: Always end your post with a question or call-to-action like "What do you think? Drop a comment below!" to boost engagement.',
  },
  {
    id: 3,
    title: 'Understanding Facebook Insights',
    duration: '6 min read',
    content: [
      {
        heading: 'What are Facebook Insights?',
        text: 'Facebook Insights is a free analytics tool built into your Business Page. It shows you how your page and posts are performing — who is seeing them, clicking them, and engaging with them.',
      },
      {
        heading: 'How to Access Insights',
        text: 'On your Business Page, click Professional Dashboard or look for the Insights tab. Here you will find all your page analytics.',
      },
      {
        heading: 'Key Metric — Reach',
        text: 'Reach tells you how many unique people saw your post. A post with high reach means Facebook is showing it to many people.',
      },
      {
        heading: 'Key Metric — Engagement',
        text: 'Engagement counts likes, comments, shares, and clicks. High engagement signals to Facebook that your content is valuable.',
      },
      {
        heading: 'Key Metric — Page Likes',
        text: 'This shows how your total followers are growing over time. A steady upward trend means your content strategy is working.',
      },
    ],
    tip: 'Pro Tip: Check your Insights every week. Look at which posts got the most reach and make more content like those.',
  },
  {
    id: 4,
    title: 'Running Basic Ads',
    duration: '7 min read',
    content: [
      {
        heading: 'Why Run Facebook Ads?',
        text: 'Organic reach on Facebook has declined over the years. Ads let you reach thousands of targeted people even with a small budget — as little as $1 per day.',
      },
      {
        heading: 'Step 1 — Boost a Post',
        text: 'The easiest way to start is by Boosting an existing post. Find a post on your page and click the blue Boost Post button below it.',
      },
      {
        heading: 'Step 2 — Define Your Audience',
        text: 'Choose who sees your ad. You can target by location, age, gender, and interests. For beginners, start with your local area and broad interests.',
      },
      {
        heading: 'Step 3 — Set Your Budget',
        text: 'Start small — $5 to $10 total is enough to test. Facebook will show you an estimated reach before you confirm.',
      },
      {
        heading: 'Step 4 — Review and Publish',
        text: 'Review your ad preview, make sure the image and text look good on mobile, then click Boost to launch your first ad.',
      },
    ],
    tip: 'Pro Tip: Always test your ad with a small budget first ($5). Only increase spending on ads that are already performing well.',
  },
]

function FacebookModule() {
  const navigate = useNavigate()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completed, setCompleted] = useState([])
  const [loadingProgress, setLoadingProgress] = useState(true)
  const [user, setUser] = useState(null)

  const lesson = lessons[currentLesson]

  // Load user and progress on mount
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
      const response = await fetch(`http://localhost:5000/api/progress/${userId}/facebook`)
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
          platform: 'facebook',
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
      toast.success('You completed the Facebook Track! 🏆')
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }

  if (loadingProgress) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <FaSpinner className="text-blue-500 text-4xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-16">

        <div className="flex items-center gap-3 mb-8">
          <FaFacebook className="text-blue-500 text-4xl" />
          <div>
            <h1 className="text-white font-extrabold text-3xl">
              Facebook Tutorials
            </h1>
            <p className="text-gray-400 text-sm">
              {completed.length} of {lessons.length} lessons completed
            </p>
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-2 mb-10">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
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
                    ? 'bg-blue-500/20 border-blue-500/50 text-white'
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
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
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

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8">
              <p className="text-blue-300 text-sm">{lesson.tip}</p>
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

export default FacebookModule
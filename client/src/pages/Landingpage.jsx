import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaPlay, FaCheckCircle, FaStar, FaArrowRight } from 'react-icons/fa'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />

      {/* ───── HERO SECTION ───── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-gray-300 mb-6">
          <FaStar className="text-yellow-400 text-xs" />
          <span>Free Tutorials for Beginners</span>
          <FaStar className="text-yellow-400 text-xs" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight max-w-4xl mb-6">
          Master{' '}
          <span className="gradient-text">Social Media</span>
          <br />
          From Zero to Pro
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10">
          Learn how to grow your brand on{' '}
          <span className="text-blue-400 font-semibold">Facebook</span> and{' '}
          <span className="text-pink-400 font-semibold">Instagram</span> with
          step-by-step beginner-friendly tutorials.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={() => navigate('/signup')}
            className="gradient-btn text-white font-bold px-8 py-4 rounded-xl text-lg flex items-center gap-2 justify-center"
          >
            Start Learning Free <FaArrowRight />
          </button>
          <button
            onClick={() => navigate('/tutorials')}
            className="border border-white/20 hover:border-white/50 text-white px-8 py-4 rounded-xl text-lg flex items-center gap-2 justify-center transition"
          >
            <FaPlay className="text-sm" /> Watch Preview
          </button>
        </div>

        {/* Social Proof Numbers */}
        <div className="grid grid-cols-3 gap-8 max-w-lg w-full">
          {[
            { number: '10+', label: 'Tutorials' },
            { number: '2', label: 'Platforms' },
            { number: '100%', label: 'Free' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-extrabold gradient-text">{stat.number}</span>
              <span className="text-gray-400 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── PLATFORMS SECTION ───── */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Two Platforms. <span className="gradient-text">One Place.</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            We focus deeply on the two most powerful platforms for beginners.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Facebook Card */}
            <div
              onClick={() => navigate('/tutorials/facebook')}
              className="bg-[#1a1a1a] border border-white/10 hover:border-blue-500/50 rounded-2xl p-8 cursor-pointer transition group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-500/20 p-4 rounded-xl">
                  <FaFacebook className="text-blue-500 text-4xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Facebook</h3>
                  <p className="text-gray-400 text-sm">Pages, Ads & Groups</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Setting up a Business Page',
                  'Creating your first post',
                  'Understanding Facebook Insights',
                  'Running Basic Ads',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Facebook Tutorials <FaArrowRight />
              </div>
            </div>

            {/* Instagram Card */}
            <div
              onClick={() => navigate('/tutorials/instagram')}
              className="bg-[#1a1a1a] border border-white/10 hover:border-pink-500/50 rounded-2xl p-8 cursor-pointer transition group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-pink-500/20 p-4 rounded-xl">
                  <FaInstagram className="text-pink-500 text-4xl" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Instagram</h3>
                  <p className="text-gray-400 text-sm">Feed, Reels & Stories</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Setting up a Business Profile',
                  'Creating engaging Reels',
                  'Using Stories effectively',
                  'Growing your followers',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <FaCheckCircle className="text-pink-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Start Instagram Tutorials <FaArrowRight />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ───── HOW IT WORKS SECTION ───── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Three simple steps to start your social media journey.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Create an Account',
                desc: 'Sign up for free in under 30 seconds. No credit card needed.',
                color: 'text-blue-400',
              },
              {
                step: '02',
                title: 'Pick a Platform',
                desc: 'Choose Facebook or Instagram and start your guided tutorial.',
                color: 'text-pink-400',
              },
              {
                step: '03',
                title: 'Learn & Grow',
                desc: 'Follow step-by-step lessons and track your progress as you go.',
                color: 'text-purple-400',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className={`text-5xl font-extrabold ${item.color} mb-4 opacity-50`}>
                  {item.step}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BANNER SECTION ───── */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join beginners who are already learning social media management for free.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="gradient-btn text-white font-bold px-10 py-4 rounded-xl text-lg flex items-center gap-2 mx-auto"
          >
            Create Free Account <FaArrowRight />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaEye, FaEyeSlash } from 'react-icons/fa'
import toast from 'react-hot-toast'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields!')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        window.dispatchEvent(new Event('storage'))
        toast.success('Welcome back!')
        setTimeout(() => navigate('/dashboard'), 1500)
      } else {
        toast.error(data.error || 'Something went wrong!')
      }
    } catch (_error) {
      toast.error('Cannot connect to server. Is it running?')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-4">

      <div className="flex items-center gap-2 mb-8">
        <FaFacebook className="text-blue-500 text-3xl" />
        <FaInstagram className="text-pink-500 text-3xl" />
        <span className="gradient-text font-bold text-2xl">SocialPro</span>
      </div>

      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-white font-bold text-2xl text-center mb-2">
          Welcome back
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Log in to continue your learning journey
        </p>

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-300 text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                className="w-full bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="gradient-btn text-white font-bold py-3 rounded-xl text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>

        </div>

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1 border-white/10" />
          <span className="text-gray-500 text-xs">Do not have an account?</span>
          <hr className="flex-1 border-white/10" />
        </div>

        <Link
          to="/signup"
          className="block text-center text-pink-400 hover:text-pink-300 text-sm font-medium transition"
        >
          Create a free account
        </Link>

      </div>

      <Link
        to="/"
        className="text-gray-500 hover:text-gray-300 text-sm mt-6 transition"
      >
        Back to Home
      </Link>

    </div>
  )
}

export default Login
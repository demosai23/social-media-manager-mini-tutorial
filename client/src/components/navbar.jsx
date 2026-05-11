import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
const [user, setUser] = useState(null)
const navigate = useNavigate()

const checkUser = () => {
  const savedUser = localStorage.getItem('user')
  setUser(savedUser ? JSON.parse(savedUser) : null)
}

useEffect(() => {
  checkUser()
  window.addEventListener('storage', checkUser)
  return () => window.removeEventListener('storage', checkUser)
}, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    toast.success('Logged out successfully!')
    setTimeout(() => navigate('/'), 1500)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaFacebook className="text-blue-500 text-2xl" />
          <FaInstagram className="text-pink-500 text-2xl" />
          <span className="gradient-text font-bold text-xl">SocialPro</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          <Link to="/"          className="hover:text-white transition">Home</Link>
          <Link to="/tutorials" className="hover:text-white transition">Tutorials</Link>
          <Link to="/contact"   className="hover:text-white transition">Contact</Link>
          {user && (
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            // ── LOGGED IN STATE ──
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-3 py-2">
                <FaUser className="text-gray-400 text-xs" />
                <span className="text-gray-300 text-sm">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            // ── LOGGED OUT STATE ──
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="text-sm text-gray-300 hover:text-white transition px-4 py-2 rounded-lg border border-white/20 hover:border-white/50"
              >
                Log In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="text-sm text-white gradient-btn px-4 py-2 rounded-lg font-semibold"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/tutorials"
            className="text-gray-300 hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Tutorials
          </Link>
          <Link
            to="/contact"
            className="text-gray-300 hover:text-white transition"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <hr className="border-white/10" />
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <FaUser className="text-gray-400 text-xs" />
                <span className="text-gray-300 text-sm">{user.email}</span>
              </div>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false) }}
                className="text-gray-300 hover:text-white transition text-left"
              >
                Log In
              </button>
              <button
                onClick={() => { navigate('/signup'); setMenuOpen(false) }}
                className="gradient-btn text-white px-4 py-2 rounded-lg font-semibold text-left"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
import { FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaFacebook className="text-blue-500 text-xl" />
          <FaInstagram className="text-pink-500 text-xl" />
          <span className="gradient-text font-bold text-lg">SocialPro</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link to="/"          className="hover:text-white transition">Home</Link>
          <Link to="/tutorials" className="hover:text-white transition">Tutorials</Link>
          <Link to="/contact"   className="hover:text-white transition">Contact</Link>
          <Link to="/signup"    className="hover:text-white transition">Sign Up</Link>
        </div>

        {/* Credit */}
        <p className="text-gray-500 text-sm flex items-center gap-1">
          Made with <FaHeart className="text-pink-500" /> for beginners
        </p>

      </div>
    </footer>
  )
}

export default Footer
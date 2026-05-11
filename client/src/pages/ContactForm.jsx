import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { FaEnvelope, FaUser, FaPaperPlane, FaFacebook, FaInstagram, FaCheckCircle } from 'react-icons/fa'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields!')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setSubmitted(true)
        toast.success('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong!')
      }
    } catch (_error) {
      toast.error('Cannot connect to server. Is it running?')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-28 pb-16">

        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have a question? Send us a message and we will get back to you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="flex flex-col gap-6">

            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <FaEnvelope className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Email</p>
                    <p className="text-white text-sm">hello@socialpro.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-500/20 p-3 rounded-xl">
                    <FaUser className="text-pink-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Support</p>
                    <p className="text-white text-sm">Available Mon-Fri</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex flex-col gap-3">
                <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition">
                  <FaFacebook className="text-blue-500" />
                  <span className="text-sm">Facebook Page</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition">
                  <FaInstagram className="text-pink-500" />
                  <span className="text-sm">Instagram Profile</span>
                </a>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold text-lg mb-4">Quick FAQ</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-white text-sm font-semibold">Is this free?</p>
                  <p className="text-gray-400 text-xs mt-1">Yes! All tutorials are completely free.</p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Do I need experience?</p>
                  <p className="text-gray-400 text-xs mt-1">No. Everything is beginner-friendly.</p>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">How long per lesson?</p>
                  <p className="text-gray-400 text-xs mt-1">Around 5-7 minutes each.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="md:col-span-2 bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">

            {submitted && (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <FaCheckCircle className="text-green-400 text-6xl mb-6" />
                <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                <p className="text-gray-400 mb-8">Thanks for reaching out! We will get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="gradient-btn text-white font-semibold px-6 py-3 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {!submitted && (
              <div className="flex flex-col gap-5">
                <h2 className="text-white font-bold text-xl mb-2">Send a Message</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Juan dela Cruz"
                      className="bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-gray-300 text-sm font-medium">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Question about Facebook Ads"
                    className="bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-300 text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={6}
                    className="bg-[#0f0f0f] border border-white/10 focus:border-blue-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gradient-btn text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading && <span>Sending...</span>}
                  {!loading && <span className="flex items-center gap-2">Send Message <FaPaperPlane /></span>}
                </button>

              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactForm
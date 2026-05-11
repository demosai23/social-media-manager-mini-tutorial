import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Pages
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TutorialPage from './pages/TutorialPage'
import FacebookModule from './pages/FacebookModule'
import InstagramModule from './pages/InstagramModule'
import ContactForm from './pages/ContactForm'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333'
          }
        }}
      />

      <Routes>
        <Route path="/"                     element={<LandingPage />} />
        <Route path="/signup"               element={<SignUp />} />
        <Route path="/login"                element={<Login />} />
        <Route path="/dashboard"            element={<Dashboard />} />
        <Route path="/tutorials"            element={<TutorialPage />} />
        <Route path="/tutorials/facebook"   element={<FacebookModule />} />
        <Route path="/tutorials/instagram"  element={<InstagramModule />} />
        <Route path="/contact"              element={<ContactForm />} />
        <Route path="*"                     element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App

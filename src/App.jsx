import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddNote from './pages/AddNote'
import MessageTeacher from './pages/MessageTeacher'
import Test from './Test'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/message-teacher" element={<MessageTeacher />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<div className="text-blue-200">Page not found. <a href="/" className="text-blue-400 hover:text-white underline">Go Home</a></div>} />
        </Routes>
      </div>
      <footer className="border-t border-white/10 py-6 text-center text-blue-200/70">
        Built for rural students • Free and simple
      </footer>
    </div>
  )
}

export default App

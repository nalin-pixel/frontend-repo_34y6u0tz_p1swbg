import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()
  const linkBase = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors'
  const active = 'bg-blue-500 text-white'
  const inactive = 'text-blue-200 hover:text-white hover:bg-blue-500/20'

  return (
    <nav className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-slate-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-white font-semibold">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Rural Learning Hub
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className={`${linkBase} ${pathname==='/'?active:inactive}`}>Home</Link>
            <Link to="/add-note" className={`${linkBase} ${pathname==='/add-note'?active:inactive}`}>Share Note</Link>
            <Link to="/message-teacher" className={`${linkBase} ${pathname==='/message-teacher'?active:inactive}`}>Message Teacher</Link>
            <Link to="/test" className={`${linkBase} ${pathname==='/test'?active:inactive}`}>Status</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-[#F5C842]' : 'text-white/70 hover:text-white'}`

  return (
    <nav className="sticky top-0 z-50 bg-[#12202E]/95 backdrop-blur border-b border-[#5BB8D4]/15">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[#F5C842] font-['Bebas_Neue'] text-2xl tracking-wider">
            ALLA FAYE CAB
          </span>
          <span className="text-white/30 text-xs font-['JetBrains_Mono'] hidden sm:block">LLC</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/lessons" className={linkClass}>Lessons</NavLink>
          <NavLink to="/booking/lookup" className={linkClass}>My Booking</NavLink>
          <Link
            to="/lessons"
            className="bg-[#F5C842] text-[#12202E] text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
          >
            Book a Lesson
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#5BB8D4]/15 px-4 py-4 flex flex-col gap-4 bg-[#12202E]">
          <NavLink to="/lessons" className={linkClass} onClick={() => setOpen(false)}>Lessons</NavLink>
          <NavLink to="/booking/lookup" className={linkClass} onClick={() => setOpen(false)}>My Booking</NavLink>
          <Link
            to="/lessons"
            className="bg-[#F5C842] text-[#12202E] text-sm font-semibold px-4 py-2 rounded text-center"
            onClick={() => setOpen(false)}
          >
            Book a Lesson
          </Link>
        </div>
      )}
    </nav>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'

// Mock — replace with api.getBooking(code) when backend is ready
async function mockLookup(code, email) {
  await new Promise(r => setTimeout(r, 800))
  if (code === 'AFC-1234' && email.includes('@')) {
    return {
      code: 'AFC-1234',
      lesson: 'Manhattan Mastery',
      date: 'Saturday, July 12, 2025',
      time: '10:00 AM',
      name: 'John Doe',
      email: email,
      status: 'paid',
    }
  }
  throw new Error('No booking found with that code and email.')
}

export default function BookingLookup() {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!code || !email) return
    setLoading(true)
    setError('')
    setBooking(null)
    try {
      const result = await mockLookup(code.toUpperCase(), email)
      setBooking(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const statusColor = { paid: 'text-green-400', pending: 'text-yellow-400', cancelled: 'text-red-400' }

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <Link to="/" className="text-[#8B8B8B] text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-10">
        ← Home
      </Link>

      <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide mb-3">FIND MY BOOKING</h1>
      <p className="text-[#8B8B8B] text-sm mb-10">
        Enter the confirmation code from your email and the email address you used to book.
      </p>

      <form onSubmit={handleSearch} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm text-white/70 mb-1.5">Confirmation Code</label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="AFC-1234"
            className="w-full bg-[#2C2C2C] border border-white/10 rounded-lg px-4 py-3 text-white font-['JetBrains_Mono'] placeholder-white/30 outline-none focus:border-[#F5C842] transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1.5">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full bg-[#2C2C2C] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#F5C842] transition-colors"
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F5C842] text-[#1A1A1A] font-semibold py-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-60"
        >
          {loading ? 'Searching…' : 'Find Booking'}
        </button>
      </form>

      {booking && (
        <div className="bg-[#2C2C2C] border border-[#F5C842]/30 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-['JetBrains_Mono'] text-[#F5C842] font-semibold text-lg">{booking.code}</div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${statusColor[booking.status] || 'text-white'}`}>
              {booking.status}
            </span>
          </div>
          <div className="border-t border-white/10 pt-4 space-y-3 text-sm">
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Lesson</span><span className="text-white">{booking.lesson}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Date</span><span className="text-white font-['JetBrains_Mono'] text-xs">{booking.date}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Time</span><span className="text-white font-['JetBrains_Mono']">{booking.time}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Name</span><span className="text-white">{booking.name}</span>
            </div>
          </div>
          <p className="text-[#8B8B8B] text-xs pt-2 border-t border-white/10">
            Need to reschedule? Reply to your confirmation email at least 48 hours before your session.
          </p>
        </div>
      )}
    </div>
  )
}

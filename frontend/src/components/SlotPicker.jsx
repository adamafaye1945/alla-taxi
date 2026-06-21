import { useState, useEffect } from 'react'

// Mock slots for frontend dev — replace with API call when backend is ready
function getMockSlots(date) {
  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']
  const booked = ['11:00', '14:00']
  return times.map((t) => ({
    id: `${date}-${t}`,
    time: t,
    available: !booked.includes(t),
  }))
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function SlotPicker({ selectedSlot, onSlotSelect }) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [slots, setSlots] = useState([])

  useEffect(() => {
    if (!selectedDate) return
    setSlots(getMockSlots(selectedDate))
    onSlotSelect(null)
  }, [selectedDate])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  function isBeforeToday(day) {
    const d = new Date(viewYear, viewMonth, day)
    d.setHours(0, 0, 0, 0)
    const t = new Date(); t.setHours(0, 0, 0, 0)
    return d < t
  }

  function dateStr(day) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="bg-[#2C2C2C] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="text-white/50 hover:text-white p-1 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-['JetBrains_Mono'] text-sm text-white">
            {monthNames[viewMonth]} {viewYear}
          </span>
          <button onClick={nextMonth} className="text-white/50 hover:text-white p-1 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
            <div key={d} className="text-center text-[#8B8B8B] text-xs py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
            const past = isBeforeToday(day)
            const ds = dateStr(day)
            const selected = selectedDate === ds
            return (
              <button
                key={day}
                disabled={past}
                onClick={() => setSelectedDate(ds)}
                className={`rounded-lg py-2 text-sm transition-all ${
                  past
                    ? 'text-white/20 cursor-not-allowed'
                    : selected
                    ? 'bg-[#F5C842] text-[#1A1A1A] font-semibold'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="text-[#8B8B8B] text-sm mb-3 font-['JetBrains_Mono']">
            Available times — {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {slots.map(slot => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => onSlotSelect({ ...slot, date: selectedDate })}
                className={`py-3 rounded-lg text-sm font-['JetBrains_Mono'] transition-all ${
                  !slot.available
                    ? 'bg-white/5 text-white/20 cursor-not-allowed line-through'
                    : selectedSlot?.id === slot.id
                    ? 'bg-[#F5C842] text-[#1A1A1A] font-semibold'
                    : 'bg-[#2C2C2C] text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {formatTime(slot.time)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

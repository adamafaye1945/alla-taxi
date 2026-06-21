import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { lessons } from '../data/lessons'
import SlotPicker from '../components/SlotPicker'
import BookingForm from '../components/BookingForm'

const STEPS = ['Choose a Time', 'Your Info', 'Payment']

function validate(values) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'Name is required'
  if (!values.email?.trim()) errors.email = 'Email is required'
  else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = 'Enter a valid email'
  return errors
}

function formatSlotDisplay(slot) {
  if (!slot) return null
  const date = new Date(slot.date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })
  const [h, m] = slot.time.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h
  const timeStr = `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
  return `${date} at ${timeStr}`
}

export default function BookingPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const lesson = lessons.find(l => l.slug === slug)

  const [step, setStep] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [formValues, setFormValues] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!lesson) return <Navigate to="/lessons" replace />

  function handleFormChange(name, value) {
    setFormValues(v => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }))
  }

  function handleNext() {
    if (step === 0) {
      if (!selectedSlot) return
      setStep(1)
    } else if (step === 1) {
      const errs = validate(formValues)
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
      setStep(2)
    }
  }

  // Mock payment submit — swap for Stripe when backend is ready
  async function handlePay() {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    navigate('/booking/success?code=AFC-' + Math.floor(1000 + Math.random() * 9000))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link to={`/lessons/${slug}`} className="text-[#8B8B8B] text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-10">
        ← {lesson.name}
      </Link>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : ''}`} onClick={() => i < step && setStep(i)}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i === step ? 'bg-[#F5C842] text-[#1A1A1A]' : i < step ? 'bg-[#F5C842]/30 text-[#F5C842]' : 'bg-white/10 text-white/40'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${i === step ? 'text-white' : 'text-white/40'}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-1 ${i < step ? 'bg-[#F5C842]/30' : 'bg-white/10'}`} style={{ width: 32 }} />}
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="bg-[#2C2C2C] border border-white/10 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-white font-semibold">{lesson.name}</div>
          {selectedSlot && (
            <div className="text-[#8B8B8B] text-sm font-['JetBrains_Mono'] mt-0.5">{formatSlotDisplay(selectedSlot)}</div>
          )}
        </div>
        <div className="font-['JetBrains_Mono'] text-[#F5C842] text-xl font-semibold shrink-0">${lesson.price}</div>
      </div>

      {/* Step 0: Slot picker */}
      {step === 0 && (
        <div className="space-y-6">
          <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">PICK A TIME</h2>
          <SlotPicker selectedSlot={selectedSlot} onSlotSelect={setSelectedSlot} />
          <button
            onClick={handleNext}
            disabled={!selectedSlot}
            className="w-full bg-[#F5C842] text-[#1A1A1A] font-semibold py-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-yellow-400 transition-colors"
          >
            Continue to Your Info
          </button>
        </div>
      )}

      {/* Step 1: Contact info */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">YOUR INFO</h2>
          <BookingForm values={formValues} onChange={handleFormChange} errors={errors} />
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="flex-1 border border-white/20 text-white py-4 rounded-lg hover:bg-white/5 transition-colors font-semibold">
              Back
            </button>
            <button onClick={handleNext} className="flex-1 bg-[#F5C842] text-[#1A1A1A] font-semibold py-4 rounded-lg hover:bg-yellow-400 transition-colors">
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide">PAYMENT</h2>

          {/* Booking summary */}
          <div className="bg-[#2C2C2C] border border-white/10 rounded-xl p-6 space-y-3 text-sm">
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Lesson</span><span className="text-white">{lesson.name}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Date & Time</span><span className="text-white font-['JetBrains_Mono'] text-xs">{formatSlotDisplay(selectedSlot)}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Name</span><span className="text-white">{formValues.name}</span>
            </div>
            <div className="flex justify-between text-[#8B8B8B]">
              <span>Email</span><span className="text-white">{formValues.email}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-[#F5C842] font-['JetBrains_Mono']">${lesson.price}.00</span>
            </div>
          </div>

          {/* Stripe will render here */}
          <div className="bg-[#2C2C2C] border border-dashed border-white/20 rounded-xl p-8 text-center">
            <div className="text-[#8B8B8B] text-sm mb-2">Stripe Payment Element</div>
            <div className="text-white/30 text-xs font-['JetBrains_Mono']">
              Cards · Apple Pay · Google Pay
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-white/20 text-white py-4 rounded-lg hover:bg-white/5 transition-colors font-semibold">
              Back
            </button>
            <button
              onClick={handlePay}
              disabled={submitting}
              className="flex-1 bg-[#F5C842] text-[#1A1A1A] font-semibold py-4 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-60"
            >
              {submitting ? 'Processing…' : `Pay $${lesson.price}.00`}
            </button>
          </div>

          <p className="text-[#8B8B8B] text-xs text-center">
            Secured by Stripe. Free cancellation up to 48 hours before your session.
          </p>
        </div>
      )}
    </div>
  )
}

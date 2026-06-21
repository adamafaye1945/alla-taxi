import { useSearchParams, Link } from 'react-router-dom'

export default function BookingSuccess() {
  const [params] = useSearchParams()
  const code = params.get('code') || 'AFC-????'

  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F5C842]/10 border border-[#F5C842]/30 flex items-center justify-center mx-auto mb-8">
        <svg className="w-8 h-8 text-[#F5C842]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide mb-4">
        YOU'RE BOOKED.
      </h1>
      <p className="text-[#8B8B8B] text-base mb-10 leading-relaxed">
        A confirmation email is on its way to you. Keep your confirmation code handy.
      </p>

      <div className="bg-[#2C2C2C] border border-[#F5C842]/30 rounded-xl p-8 mb-10">
        <div className="text-[#8B8B8B] text-sm mb-2">Your confirmation code</div>
        <div className="font-['JetBrains_Mono'] text-4xl text-[#F5C842] font-semibold tracking-widest">
          {code}
        </div>
      </div>

      <div className="bg-[#2C2C2C] border border-white/10 rounded-xl p-6 text-left space-y-3 mb-10">
        <div className="text-white font-semibold mb-3">What to bring</div>
        {[
          'Your TLC hack license or learner\'s permit',
          'A notepad and something to write with',
          'Your questions — there are no dumb ones',
        ].map(item => (
          <div key={item} className="flex items-start gap-3 text-[#8B8B8B] text-sm">
            <span className="text-[#F5C842] shrink-0">→</span>
            {item}
          </div>
        ))}
      </div>

      <p className="text-[#8B8B8B] text-sm mb-8">
        Need to reschedule? Reply to your confirmation email at least 48 hours before your session.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="border border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition-colors">
          Back to Home
        </Link>
        <Link to="/booking/lookup" className="bg-[#F5C842] text-[#1A1A1A] font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors">
          View My Booking
        </Link>
      </div>
    </div>
  )
}

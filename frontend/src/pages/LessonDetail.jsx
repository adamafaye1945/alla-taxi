import { useParams, Link, Navigate } from 'react-router-dom'
import { lessons } from '../data/lessons'

const TaxiDoodle = () => (
  <svg viewBox="0 0 320 150" fill="none" aria-hidden="true" className="w-72 mx-auto">
    {/* Road stripe */}
    <rect x="0" y="135" width="320" height="15" rx="0" fill="#1B2E40" opacity="0.6" />
    <rect x="50" y="139" width="40" height="5" rx="2" fill="#F5C842" opacity="0.3" />
    <rect x="140" y="139" width="40" height="5" rx="2" fill="#F5C842" opacity="0.3" />
    <rect x="230" y="139" width="40" height="5" rx="2" fill="#F5C842" opacity="0.3" />

    {/* Car body */}
    <rect x="30" y="72" width="260" height="60" rx="12" fill="#F5C842" />

    {/* Roof */}
    <path d="M78,72 Q83,32 108,27 L212,27 Q237,32 242,72 Z" fill="#F5C842" />

    {/* Window left */}
    <rect x="88" y="33" width="55" height="34" rx="6" fill="#B8E4F5" opacity="0.85" />
    {/* Window right */}
    <rect x="150" y="33" width="55" height="34" rx="6" fill="#B8E4F5" opacity="0.85" />

    {/* Window shine */}
    <rect x="91" y="36" width="10" height="8" rx="2" fill="white" opacity="0.4" />
    <rect x="153" y="36" width="10" height="8" rx="2" fill="white" opacity="0.4" />

    {/* TAXI sign on roof */}
    <rect x="118" y="12" width="84" height="18" rx="5" fill="white" />
    <text x="160" y="25" textAnchor="middle" fill="#12202E" fontSize="10" fontFamily="sans-serif" fontWeight="800">TAXI</text>

    {/* Door divider */}
    <line x1="160" y1="74" x2="160" y2="130" stroke="#E0A800" strokeWidth="2" />

    {/* Door handles */}
    <rect x="122" y="100" width="20" height="6" rx="3" fill="#E0A800" />
    <rect x="178" y="100" width="20" height="6" rx="3" fill="#E0A800" />

    {/* Headlight */}
    <rect x="24" y="84" width="16" height="22" rx="5" fill="#FFF9CC" />
    <rect x="24" y="84" width="16" height="22" rx="5" fill="#FFE066" opacity="0.5" />

    {/* Taillight */}
    <rect x="280" y="84" width="16" height="22" rx="5" fill="#FF8080" />

    {/* Front bumper */}
    <rect x="20" y="103" width="18" height="9" rx="4" fill="#E0A800" />
    {/* Rear bumper */}
    <rect x="282" y="103" width="18" height="9" rx="4" fill="#E0A800" />

    {/* Front wheel */}
    <circle cx="90" cy="134" r="24" fill="#12202E" />
    <circle cx="90" cy="134" r="13" fill="#1B2E40" />
    <circle cx="90" cy="134" r="5" fill="#5BB8D4" />

    {/* Rear wheel */}
    <circle cx="230" cy="134" r="24" fill="#12202E" />
    <circle cx="230" cy="134" r="13" fill="#1B2E40" />
    <circle cx="230" cy="134" r="5" fill="#5BB8D4" />

    {/* Exhaust puff (friendly!) */}
    <circle cx="298" cy="118" r="5" fill="#7B9DB5" opacity="0.3" />
    <circle cx="307" cy="113" r="4" fill="#7B9DB5" opacity="0.2" />
    <circle cx="315" cy="108" r="3" fill="#7B9DB5" opacity="0.15" />
  </svg>
)

export default function LessonDetail() {
  const { slug } = useParams()
  const lesson = lessons.find(l => l.slug === slug)

  if (!lesson) return <Navigate to="/lessons" replace />

  const others = lessons.filter(l => l.slug !== slug)

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Link to="/lessons" className="text-[#7B9DB5] text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-10">
        ← All Lessons
      </Link>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="text-[#5BB8D4] font-['JetBrains_Mono'] text-sm mb-3">
            {lesson.duration} MIN · ONE-ON-ONE
          </div>
          <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white tracking-wide mb-4">
            {lesson.name.toUpperCase()}
          </h1>
          <p className="text-[#7B9DB5] text-lg leading-relaxed mb-10">{lesson.description}</p>

          <h2 className="text-white font-semibold text-lg mb-4">What you'll learn</h2>
          <ul className="space-y-3 mb-12">
            {lesson.details.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-[#7B9DB5]">
                <span className="text-[#F5C842] mt-0.5 shrink-0">✓</span>
                <span className="text-sm leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>

          <div className="bg-[#1B2E40] border border-[#5BB8D4]/15 rounded-xl p-6">
            <div className="text-white/60 text-sm mb-1">What to bring</div>
            <ul className="space-y-2 mt-3">
              {['Your TLC hack license or learner\'s permit', 'A notepad', 'Your questions — there are no dumb ones'].map(item => (
                <li key={item} className="text-[#7B9DB5] text-sm flex items-start gap-2">
                  <span className="text-[#F5C842] shrink-0">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-[#1B2E40] border border-[#5BB8D4]/15 rounded-xl p-6 space-y-6">
            <div>
              <div className="text-[#7B9DB5] text-sm">Price</div>
              <div className="font-['JetBrains_Mono'] text-4xl text-[#F5C842] font-semibold mt-1">
                ${lesson.price}
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-3 text-sm text-[#7B9DB5]">
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="text-white font-['JetBrains_Mono']">{lesson.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span>Format</span>
                <span className="text-white">In-person or video</span>
              </div>
              <div className="flex justify-between">
                <span>Group size</span>
                <span className="text-white">1-on-1 only</span>
              </div>
            </div>
            <Link
              to={`/book/${lesson.slug}`}
              className="block w-full text-center bg-[#F5C842] text-[#12202E] font-semibold py-4 rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Book This Lesson
            </Link>
            <p className="text-[#7B9DB5] text-xs text-center">
              Free cancellation up to 48 hours before your session
            </p>
          </div>
        </div>
      </div>

      {/* Friendly closing — taxi illustration */}
      <div className="mt-20 rounded-2xl bg-[#1B2E40] border border-[#5BB8D4]/15 overflow-hidden">
        <div className="px-8 pt-10 pb-2 text-center">
          <p className="text-[#5BB8D4] font-['JetBrains_Mono'] text-sm mb-2">YOU'VE GOT THIS</p>
          <h3 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide mb-3">
            See you out there.
          </h3>
          <p className="text-[#7B9DB5] text-base max-w-md mx-auto leading-relaxed">
            Every great NYC cab driver started exactly where you are right now.
            One lesson, one street at a time.
          </p>
        </div>
        <TaxiDoodle />
      </div>

      {/* Other lessons */}
      <div className="mt-16 border-t border-[#5BB8D4]/15 pt-16">
        <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide mb-6">OTHER LESSONS</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map(l => (
            <div key={l.id} className="bg-[#1B2E40] border border-[#5BB8D4]/15 rounded-xl p-5 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <span className="font-['Bebas_Neue'] text-xl text-white tracking-wide">{l.name}</span>
                <span className="font-['JetBrains_Mono'] text-[#F5C842] text-sm">${l.price}</span>
              </div>
              <p className="text-[#7B9DB5] text-xs leading-relaxed">{l.tagline}</p>
              <Link
                to={`/lessons/${l.slug}`}
                className="text-xs text-[#5BB8D4]/50 hover:text-[#5BB8D4] transition-colors"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

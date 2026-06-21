import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'
import LessonCard from '../components/LessonCard'

const testimonials = [
  {
    quote: "I passed my TLC road test first try after just two sessions. Worth every dollar.",
    name: "Moussa D.",
    context: "Now driving for NYC Yellow Cab",
  },
  {
    quote: "Nobody teaches you how to actually work the airports. Alla Faye does. Game changer.",
    name: "Rajesh P.",
    context: "JFK dispatch driver",
  },
  {
    quote: "I came from overseas and didn't know anything about NYC streets. This man mapped it all out for me.",
    name: "Ibrahim K.",
    context: "Rideshare driver, Queens",
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[75vh] flex items-center bg-[#12202E]">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(#5BB8D4 1px, transparent 1px), linear-gradient(90deg, #5BB8D4 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-7xl lg:text-8xl leading-none tracking-wide text-white mb-5">
              LEARN NYC<br />
              <span className="text-[#F5C842]">FROM SOMEONE</span><br />
              WHO DROVE IT.
            </h1>

            <p className="text-[#7B9DB5] text-lg leading-relaxed max-w-lg mb-10">
              One-on-one taxi lessons with Alla Faye — 30 years behind the wheel,
              every borough, every shift.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/lessons"
                className="bg-[#F5C842] text-[#12202E] font-semibold text-base px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors text-center"
              >
                See All Lessons
              </Link>
              <Link
                to="/book/taxi-101"
                className="border border-[#5BB8D4]/30 text-white font-semibold text-base px-8 py-4 rounded-lg hover:bg-[#5BB8D4]/10 transition-colors text-center"
              >
                Book Taxi 101 — $199
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide mb-3">
            LESSONS
          </h2>
          <p className="text-[#7B9DB5] text-base max-w-lg">
            Each session is 60 minutes, one-on-one. Pick the lesson that fits where you are,
            or go all-in with Taxi 101.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons.map(l => (
            <LessonCard key={l.id} lesson={l} featured={l.featured} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-[#1B2E40] border-y border-[#5BB8D4]/15">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide mb-6">
              WHO IS<br /><span className="text-[#F5C842]">ALLA FAYE?</span>
            </h2>
            <div className="space-y-4 text-[#7B9DB5] leading-relaxed">
              <p>
                Thirty years in a New York City cab teaches you things no textbook covers.
                Which blocks lock up on a Tuesday at 5:45 PM. When JFK dispatch opens up.
                How to read a passenger in the first ten seconds.
              </p>
              <p>
                Alla Faye has driven every shift, in every borough, through every season.
                He started Alla Faye Cab LLC to pass that knowledge on — directly, one driver at a time.
              </p>
              <p>
                These aren't generic lessons. They're built from what actually works on the streets.
              </p>
            </div>
          </div>
          <div className="bg-[#12202E] border border-[#5BB8D4]/15 rounded-xl p-8">
            <div className="font-['Bebas_Neue'] text-6xl text-[#F5C842] tracking-wide mb-2">NYC</div>
            <div className="text-[#5BB8D4]/60 text-sm font-['JetBrains_Mono'] mb-8">All 5 Boroughs · 3 Airports</div>
            <div className="space-y-3">
              {['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'].map(b => (
                <div key={b} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F5C842]" />
                  <span className="text-white text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wide mb-12">
          WHAT DRIVERS SAY
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-[#1B2E40] border border-[#5BB8D4]/15 rounded-xl p-6">
              <p className="text-white leading-relaxed mb-6">"{t.quote}"</p>
              <div>
                <div className="text-[#F5C842] font-semibold text-sm">{t.name}</div>
                <div className="text-[#7B9DB5] text-xs mt-0.5">{t.context}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F5C842]">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-[#12202E] tracking-wide mb-4">
            READY TO DRIVE SMARTER?
          </h2>
          <p className="text-[#12202E]/70 text-base mb-8 max-w-md mx-auto">
            Book a one-hour lesson and get 30 years of NYC driving knowledge in a single session.
          </p>
          <Link
            to="/lessons"
            className="inline-block bg-[#12202E] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1B2E40] transition-colors"
          >
            Book Your Lesson
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#5BB8D4]/15 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-['Bebas_Neue'] text-[#F5C842] text-xl tracking-wider">ALLA FAYE CAB LLC</span>
          <span className="text-[#7B9DB5] text-sm">© 2025 · New York City</span>
          <Link to="/booking/lookup" className="text-[#7B9DB5] text-sm hover:text-white transition-colors">
            Find my booking
          </Link>
        </div>
      </footer>
    </div>
  )
}

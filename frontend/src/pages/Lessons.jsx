import { lessons } from '../data/lessons'
import LessonCard from '../components/LessonCard'

export default function Lessons() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#5BB8D4] font-['JetBrains_Mono'] text-sm mb-3">ONE-ON-ONE · 60 MINUTES · NYC</div>
        <h1 className="font-['Bebas_Neue'] text-5xl sm:text-6xl text-white tracking-wide mb-4">
          LESSONS
        </h1>
        <p className="text-[#7B9DB5] text-base max-w-xl leading-relaxed">
          Every lesson is personal. No groups, no recordings, no generic advice.
          Just you, 60 minutes, and 30 years of what actually works on these streets.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {lessons.map(l => (
          <LessonCard key={l.id} lesson={l} featured={l.featured} />
        ))}
      </div>

      <div className="mt-16 bg-[#1B2E40] border border-[#5BB8D4]/15 rounded-xl p-8">
        <h2 className="font-['Bebas_Neue'] text-3xl text-white tracking-wide mb-4">HOW IT WORKS</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Pick a lesson', body: 'Choose the topic that fits where you are in your driving career.' },
            { step: '02', title: 'Book a slot', body: 'Pick a day and time that works for you. Secure it with payment.' },
            { step: '03', title: 'Show up ready', body: 'Bring your permit or license, a notepad, and your questions.' },
          ].map(s => (
            <div key={s.step} className="flex gap-4">
              <div className="font-['Bebas_Neue'] text-4xl text-[#F5C842]/30 leading-none shrink-0">{s.step}</div>
              <div>
                <div className="text-white font-semibold mb-1">{s.title}</div>
                <div className="text-[#7B9DB5] text-sm leading-relaxed">{s.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'

export default function LessonCard({ lesson, featured = false }) {
  return (
    <div className={`relative rounded-xl border p-6 flex flex-col gap-4 transition-all hover:border-[#5BB8D4]/50 hover:-translate-y-0.5 ${
      featured
        ? 'bg-[#F5C842]/8 border-[#F5C842]/40'
        : 'bg-[#1B2E40] border-[#5BB8D4]/15'
    }`}>
      {featured && (
        <span className="absolute -top-3 left-6 bg-[#F5C842] text-[#12202E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </span>
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 className={`font-['Bebas_Neue'] text-2xl tracking-wide ${featured ? 'text-[#F5C842]' : 'text-white'}`}>
          {lesson.name}
        </h3>
        <div className="text-right shrink-0">
          <span className="font-['JetBrains_Mono'] text-xl font-semibold text-[#F5C842]">
            ${lesson.price}
          </span>
          <div className="text-[#7B9DB5] text-xs mt-0.5">{lesson.duration} min</div>
        </div>
      </div>

      <p className="text-[#7B9DB5] text-sm leading-relaxed">{lesson.tagline}</p>

      <Link
        to={`/lessons/${lesson.slug}`}
        className="text-sm text-[#5BB8D4]/70 hover:text-[#5BB8D4] transition-colors underline underline-offset-2"
      >
        See what's covered →
      </Link>

      <Link
        to={`/book/${lesson.slug}`}
        className={`mt-auto text-center text-sm font-semibold py-3 rounded-lg transition-colors ${
          featured
            ? 'bg-[#F5C842] text-[#12202E] hover:bg-yellow-400'
            : 'bg-[#5BB8D4]/15 text-white hover:bg-[#5BB8D4]/25'
        }`}
      >
        Book This Lesson
      </Link>
    </div>
  )
}

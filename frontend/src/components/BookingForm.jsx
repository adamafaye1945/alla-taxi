export default function BookingForm({ values, onChange, errors }) {
  const field = (name, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm text-white/70 mb-1.5">{label}</label>
      <input
        type={type}
        value={values[name] || ''}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-[#2C2C2C] border rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 outline-none transition-colors focus:border-[#F5C842] ${
          errors?.[name] ? 'border-red-500' : 'border-white/10'
        }`}
      />
      {errors?.[name] && (
        <p className="text-red-400 text-xs mt-1">{errors[name]}</p>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {field('name', 'Full Name *', 'text', 'John Doe')}
      {field('email', 'Email *', 'email', 'john@example.com')}
      {field('phone', 'Phone (optional)', 'tel', '718-555-0100')}
      <div>
        <label className="block text-sm text-white/70 mb-1.5">Anything you want me to know?</label>
        <textarea
          value={values.notes || ''}
          onChange={e => onChange('notes', e.target.value)}
          placeholder="e.g. I start at JFK next Monday and need airport basics ASAP"
          rows={3}
          className="w-full bg-[#2C2C2C] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 outline-none focus:border-[#F5C842] transition-colors resize-none"
        />
      </div>
    </div>
  )
}

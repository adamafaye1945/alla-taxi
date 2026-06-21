const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || 'Request failed')
  }
  return res.json()
}

export const api = {
  getLessons: () => request('/api/lessons'),
  getLesson: (slug) => request(`/api/lessons/${slug}`),
  getSlots: (lessonId, date) => request(`/api/slots?lesson_id=${lessonId}&date=${date}`),
  createBooking: (data) => request('/api/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getBooking: (code) => request(`/api/bookings/confirm/${code}`),
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import LessonDetail from './pages/LessonDetail'
import BookingPage from './pages/BookingPage'
import BookingSuccess from './pages/BookingSuccess'
import BookingLookup from './pages/BookingLookup'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:slug" element={<LessonDetail />} />
        <Route path="/book/:slug" element={<BookingPage />} />
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route path="/booking/lookup" element={<BookingLookup />} />
      </Routes>
    </BrowserRouter>
  )
}

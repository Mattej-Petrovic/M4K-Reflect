import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './pages/Hero'
import Journey from './pages/Journey'
import Tech from './pages/Tech'
import BeforeAfter from './pages/BeforeAfter'
import Team from './pages/Team'
import Reflections from './pages/Reflections'
import Data from './pages/Data'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"             element={<Hero />} />
          <Route path="/journey"      element={<Journey />} />
          <Route path="/tech"         element={<Tech />} />
          <Route path="/before-after" element={<BeforeAfter />} />
          <Route path="/team"         element={<Team />} />
          <Route path="/reflections"  element={<Reflections />} />
          <Route path="/data"         element={<Data />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

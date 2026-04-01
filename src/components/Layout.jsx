import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './Navbar'

export default function Layout() {
  const location = useLocation()
  const mainRef = useRef(null)

  // Smooth page-transition: fade in on route change
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(12px)'
    const raf = requestAnimationFrame(() => {
      el.style.transition = 'opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  return (
    <>
      <Navbar />
      <main
        ref={mainRef}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingTop: '96px', /* clears fixed navbar */
          paddingLeft: '16px',
          paddingRight: '16px',
          minHeight: '100dvh',
        }}
      >
        <Outlet />
      </main>
    </>
  )
}

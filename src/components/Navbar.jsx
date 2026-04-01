import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'

const links = [
  { to: '/',             label: 'Hem' },
  { to: '/journey',      label: 'Vår resa' },
  { to: '/tech',         label: 'Teknisk' },
  { to: '/before-after', label: 'Before & After' },
  { to: '/team',         label: 'Team & SRE' },
  { to: '/reflections',  label: 'Reflektioner' },
  { to: '/data',         label: 'Data' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Floating pill nav */}
      <nav
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          /* Outer shell — Double-Bezel */
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '9999px',
          padding: '6px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Inner core */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '9999px',
            padding: '4px 8px',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: '500',
                  letterSpacing: '0.01em',
                  fontFamily: 'var(--font-sans)',
                  color: isActive ? '#050608' : 'rgba(232,234,240,0.7)',
                  background: isActive ? '#34d399' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 300ms cubic-bezier(0.32,0.72,0,1)',
                  whiteSpace: 'nowrap',
                })}
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(v => !v)}
            style={{
              padding: '8px',
              borderRadius: '9999px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text)',
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 300ms cubic-bezier(0.32,0.72,0,1)',
            }}
            aria-label={open ? 'Stäng meny' : 'Öppna meny'}
          >
            {open
              ? <X size={20} weight="light" />
              : <List size={20} weight="light" />
            }
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 40,
          backdropFilter: open ? 'blur(24px)' : 'blur(0px)',
          WebkitBackdropFilter: open ? 'blur(24px)' : 'blur(0px)',
          background: open ? 'rgba(5,6,8,0.92)' : 'rgba(5,6,8,0)',
          pointerEvents: open ? 'all' : 'none',
          transition: 'all 400ms cubic-bezier(0.32,0.72,0,1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        {links.map(({ to, label }, i) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              fontSize: '22px',
              fontWeight: '500',
              fontFamily: 'var(--font-sans)',
              color: isActive ? '#34d399' : 'rgba(232,234,240,0.8)',
              textDecoration: 'none',
              padding: '12px 32px',
              borderRadius: '9999px',
              background: isActive ? 'rgba(52,211,153,0.1)' : 'transparent',
              border: isActive ? '1px solid rgba(52,211,153,0.25)' : '1px solid transparent',
              transition: 'all 300ms cubic-bezier(0.32,0.72,0,1)',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: open ? `${i * 50}ms` : '0ms',
            })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </>
  )
}

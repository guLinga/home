import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArtisticName } from './components/ArtisticName'
import { profile, projects } from './data/profile'
import './App.css'

const avatarSrc = `${import.meta.env.BASE_URL}logos/picture.jpg`
const easeOut = [0.23, 1, 0.32, 1] as const
const themeKey = 'home-theme'

type Theme = 'light' | 'dark'
type ContactKind = 'email' | 'wechat'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(themeKey)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function EmailIcon() {
  return (
    <svg
      className="contact-logo-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4.2 7.2 12 12.4 19.8 7.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WechatIcon() {
  return (
    <svg
      className="contact-logo-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.6 4.8c-3.45 0-6.25 2.2-6.25 4.9 0 1.55.9 2.95 2.3 3.85L5 15.7l2.35-1.2c.7.2 1.45.3 2.25.3.2 0 .4 0 .58-.02A4.4 4.4 0 0 1 9.7 13.2c0-2.65 2.55-4.8 5.7-4.8.14 0 .28 0 .42.02C15.1 6.4 12.6 4.8 9.6 4.8Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M15.55 9.55c-2.75 0-5 1.8-5 4.05s2.25 4.05 5 4.05c.55 0 1.08-.08 1.58-.24L19.2 18.6l-.7-1.7c1.1-.85 1.8-2.05 1.8-3.3 0-2.25-2.25-4.05-4.75-4.05Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <circle cx="7.9" cy="9.55" r="0.85" fill="currentColor" />
      <circle cx="11.35" cy="9.55" r="0.85" fill="currentColor" />
      <circle cx="13.95" cy="13.55" r="0.75" fill="currentColor" />
      <circle cx="17.15" cy="13.55" r="0.75" fill="currentColor" />
    </svg>
  )
}

function App() {
  const [avatarOpen, setAvatarOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [contactOpen, setContactOpen] = useState<ContactKind | null>(null)
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(themeKey, theme)
  }, [theme])

  const overlayOpen = avatarOpen || contactOpen !== null

  useEffect(() => {
    if (!overlayOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setAvatarOpen(false)
      setContactOpen(null)
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [overlayOpen])

  useEffect(() => {
    setCopied(false)
  }, [contactOpen])

  const enter = reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, transform: 'translateY(8px)' }
  const shown = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, transform: 'translateY(0px)' }

  const isDark = theme === 'dark'
  const contactValue =
    contactOpen === 'email'
      ? profile.email
      : contactOpen === 'wechat'
        ? profile.wechat
        : ''

  const copyValue = async () => {
    if (!contactValue) return
    try {
      await navigator.clipboard.writeText(contactValue)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="page">
      <div className="atmosphere" aria-hidden="true" />

      <button
        type="button"
        className="theme-toggle"
        aria-label={isDark ? '切换到白天模式' : '切换到夜晚模式'}
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? (
          <svg
            className="theme-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A8 8 0 0 0 4 12"
            />
          </svg>
        ) : (
          <svg
            className="theme-icon theme-icon--sun"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"
            />
          </svg>
        )}
      </button>

      <main>
        <section className="hero">
          <motion.button
            type="button"
            className="hero-avatar-btn"
            aria-label="查看头像"
            onClick={() => setAvatarOpen(true)}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            <img className="hero-avatar" src={avatarSrc} alt="" />
          </motion.button>

          <motion.div
            initial={enter}
            animate={shown}
            transition={{ duration: 0.35, delay: 0.06, ease: easeOut }}
          >
            <ArtisticName text={profile.name} variant="hero" as="h1" />
          </motion.div>

          <motion.div
            className="contact"
            aria-label="联系方式"
            initial={enter}
            animate={shown}
            transition={{ duration: 0.32, delay: 0.12, ease: easeOut }}
          >
            <div className="contact-rule" aria-hidden="true" />
            <div className="contact-logos">
              <button
                type="button"
                className="contact-logo"
                aria-label="查看邮箱"
                onClick={() => setContactOpen('email')}
              >
                <EmailIcon />
              </button>
              <button
                type="button"
                className="contact-logo"
                aria-label="查看微信"
                onClick={() => setContactOpen('wechat')}
              >
                <WechatIcon />
              </button>
            </div>
          </motion.div>
        </section>

        <section className="projects" aria-label="项目">
          <ul className="project-list">
            {projects.map((project, index) => (
              <motion.li
                key={project.id}
                initial={enter}
                animate={shown}
                transition={{
                  duration: 0.32,
                  delay: 0.18 + index * 0.04,
                  ease: easeOut,
                }}
              >
                <a
                  className="project-item"
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="打开项目"
                >
                  <span className="logo-tile">
                    <img src={project.logo} alt="" />
                  </span>
                  <ArtisticName text={project.name} variant="item" />
                </a>
              </motion.li>
            ))}
          </ul>
        </section>
      </main>

      <AnimatePresence>
        {avatarOpen && (
          <motion.div
            className="avatar-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="头像"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.2, ease: easeOut }}
            onClick={() => setAvatarOpen(false)}
          >
            <motion.img
              className="avatar-lightbox-img"
              src={avatarSrc}
              alt=""
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }
              }
              transition={{
                duration: reduceMotion ? 0.01 : 0.22,
                ease: easeOut,
              }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contactOpen && (
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-label={contactOpen === 'email' ? '邮箱' : '微信'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.22, ease: easeOut }}
            onClick={() => setContactOpen(null)}
          >
            <motion.div
              className="contact-panel"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.98 }
              }
              transition={{
                duration: reduceMotion ? 0.01 : 0.28,
                ease: easeOut,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <ArtisticName
                text={contactOpen === 'email' ? '邮箱' : '微信'}
                variant="label"
              />
              <ArtisticName text={contactValue} variant="contact" />

              <div className="contact-panel-actions">
                <button
                  type="button"
                  className="contact-action contact-action--primary"
                  onClick={copyValue}
                >
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar' 

/* ============================================================================
   HackFusion 4 – Sponsors page (single file, no Tailwind needed).
   Put the images in  public/images/sponsors/  (see README).
   ============================================================================ */

// ---- Edit these -----------------------------------------------------------
const BASE = `${import.meta.env.BASE_URL}images/sponsors/` // folder with the images
const EVENT_NAME = 'HackFusion 4'
const SPONSOR_EMAIL = 'swag@sggs.ac.in'
const BROCHURE_URL = `${BASE}brochure.pdf`                // replace this file with the real brochure
const PAGE_SCROLL_SPEED = 2 / 3                            // 1 = normal, 2/3 = slower
const LAYER_SPEEDS = { back: 0.6, front: 1.3 }             // frame layer + content = 1 (normal)

// Replace each `logo` with the real sponsor logo (transparent PNG/WebP, any size). Keep the file name or change it here.
const TIERS = [
  { id: 'title', label: 'Title Sponsor', frame: 'title-frame.webp', logo: 'title-logo.webp' },
  { id: 'diamond', label: 'Diamond Sponsor', frame: 'diamond-frame.webp', logo: 'diamond-logo.webp' },
  { id: 'gold', label: 'Gold Sponsor', frame: 'gold-frame.webp', logo: 'gold-logo.webp' },
]
// ----------------------------------------------------------------------------

const IMG_RATIO = 1672 / 941 // height / width of the three background layer images

/** Slows the whole page scroll (wheel, trackpad, touch). Active only while this page is mounted. */
function useSlowScroll(factor) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    const max = () => Math.max(0, root.scrollHeight - window.innerHeight)
    const clamp = (v) => Math.min(max(), Math.max(0, v))
    let target = window.scrollY, cur = window.scrollY, raf = 0, ease = 0.14

    const loop = () => {
      cur += (target - cur) * ease
      if (Math.abs(target - cur) < 0.4) cur = target
      window.scrollTo(0, cur)
      raf = cur !== target ? requestAnimationFrame(loop) : 0
    }
    const go = () => { if (!raf) raf = requestAnimationFrame(loop) }
    const onWheel = (e) => {
      if (e.ctrlKey) return
      e.preventDefault()
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1
      ease = 0.14
      target = clamp(target + e.deltaY * unit * factor)
      go()
    }
    const onScroll = () => { if (!raf) { target = cur = window.scrollY } }

    let ty = 0, lastT = 0, vel = 0, touching = false
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) return
      touching = true; ty = e.touches[0].clientY; lastT = e.timeStamp; vel = 0
      if (raf) { cancelAnimationFrame(raf); raf = 0 }
      target = cur = window.scrollY
    }
    const onTouchMove = (e) => {
      if (!touching || e.touches.length !== 1) return
      e.preventDefault()
      const y = e.touches[0].clientY
      const dy = (ty - y) * factor
      const dt = Math.max(1, e.timeStamp - lastT)
      vel = 0.8 * vel + 0.2 * (dy / dt)
      ty = y; lastT = e.timeStamp
      target = clamp(target + dy); cur = target
      window.scrollTo(0, cur)
    }
    const onTouchEnd = () => {
      if (!touching) return
      touching = false
      ease = 0.08
      target = clamp(target + vel * 350)
      go()
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [factor])
}

/** Parallax: back layer slower, front layer faster, frame layer + content at normal speed. */
function useParallax(pageRef, backRef, frontRef) {
  useEffect(() => {
    const page = pageRef.current, back = backRef.current, front = frontRef.current
    if (!page || !back || !front) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const place = () => {
      raf = 0
      if (reduced) return
      const y = window.scrollY
      back.style.transform = `translate3d(0, ${(1 - LAYER_SPEEDS.back) * y}px, 0)`
      front.style.transform = `translate3d(0, ${(1 - LAYER_SPEEDS.front) * y}px, 0)`
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(place) }
    const size = () => {
      const vh = window.innerHeight
      const S = Math.max(0, page.offsetHeight - vh)
      back.style.height = `${vh + LAYER_SPEEDS.back * S}px`
      front.style.height = `${vh + LAYER_SPEEDS.front * S}px`
      schedule()
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(page)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', size)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', size)
    }
  }, [pageRef, backRef, frontRef])
}

export default function Sponsors() {
  const pageRef = useRef(null)
  const backRef = useRef(null)
  const frontRef = useRef(null)
  useParallax(pageRef, backRef, frontRef)

  return (
    <div className="sp-root" ref={pageRef}>
      <style>{CSS}</style>
      <div className="sp-nav"><Navbar /></div>

      {/* Background layers (bottom to top): back scene, stone frame, floating crystals */}
      <div className="sp-layers" aria-hidden="true">
        <div className="sp-ly sp-back" ref={backRef} style={{ backgroundImage: `url(${BASE}layer-back.webp)` }} />
        <div className="sp-frame-layer" style={{ backgroundImage: `url(${BASE}layer-frame.webp)` }} />
        <div className="sp-ly sp-front" ref={frontRef} style={{ backgroundImage: `url(${BASE}layer-front.webp)` }} />
      </div>

      <header className="sp-header">
        <h1>
          <img src={`${BASE}hackfusion-logo.webp`} alt={`${EVENT_NAME} Sponsorship`} width="1568" height="523" />
        </h1>
      </header>

      <main className="sp-main">
        {/* Title on top, Diamond + Gold below it (laptop). Row on tablets, column on phones. */}
        <section className="sp-grid" id="sponsors">
          {TIERS.map((t) => (
            <article className="sp-frame" key={t.id} id={`tier-${t.id}`}>
              <div className="sp-slot">
                <img src={`${BASE}${t.logo}`} alt={t.label} loading="lazy" />
              </div>
              <img className="sp-frame-img" src={`${BASE}${t.frame}`} alt="" aria-hidden="true" draggable="false" />
            </article>
          ))}
        </section>

        {/* Closing board with the two buttons */}
        <section className="sp-cta">
          <div className="sp-board">
            <img src={`${BASE}board.webp`} alt={`Light up ${EVENT_NAME} together with us.`} draggable="false" />
            <div className="sp-btns">
              <a
                href={`mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(EVENT_NAME + ' sponsorship')}`}
                aria-label={`Sponsor us: email ${SPONSOR_EMAIL}`}
              >
                <img src={`${BASE}sponsor-btn.webp`} alt="Sponsor us" draggable="false" />
              </a>
              <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the sponsorship brochure">
                <img src={`${BASE}brochure-btn.webp`} alt="Brochure" draggable="false" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// Scoped styles (everything starts with .sp-, so nothing leaks into the rest of your site)
const CSS = `
.sp-root{position:relative;overflow:hidden;width:100%;background:#050b12;color:#f4f1ea;
  min-height:calc(100vw * ${IMG_RATIO});
  padding:calc(100vw * ${IMG_RATIO} * .11) 15% calc(100vw * ${IMG_RATIO} * .1);box-sizing:border-box}
.sp-root *{box-sizing:border-box}
@media(min-width:768px){.sp-root{padding-left:17%;padding-right:17%}}
@media(min-width:1024px){.sp-root{padding-left:19%;padding-right:19%}}

.sp-layers{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.sp-ly{position:absolute;left:0;top:0;width:100%;height:100vh;background-size:cover;background-position:top center;background-repeat:no-repeat;will-change:transform}
.sp-back{z-index:0}
.sp-frame-layer{position:absolute;inset:0;z-index:1;background-size:100% 100%;background-repeat:no-repeat}
.sp-front{z-index:2}
.sp-header,.sp-main{position:relative;z-index:10}
.sp-nav{position:absolute;top:0;left:0;right:0;z-index:50}

.sp-header{display:flex;justify-content:center;padding-bottom:16px}
.sp-header h1{margin:0}
.sp-header img{display:block;width:100%;max-width:620px;height:auto;filter:drop-shadow(0 6px 18px rgba(0,0,0,.6))}

.sp-grid{display:grid;grid-template-columns:1fr;gap:24px;justify-items:center;max-width:1400px;margin:0 auto;padding-bottom:40px}
@media(min-width:768px){.sp-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:start}}
@media(min-width:1024px){.sp-grid{grid-template-columns:repeat(2,minmax(0,1fr));max-width:860px;column-gap:40px;row-gap:8px}
  .sp-frame:first-child{grid-column:1/-1}}
.sp-frame{position:relative;width:100%;max-width:420px;aspect-ratio:1;animation:sp-pop .7s cubic-bezier(.34,1.56,.64,1) both}
@media(min-width:1024px){.sp-frame{max-width:400px}}
.sp-frame:nth-child(2){animation-delay:.12s}.sp-frame:nth-child(3){animation-delay:.24s}
.sp-slot{position:absolute;inset:13%;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:1}
.sp-slot img{width:100%;height:100%;object-fit:contain;display:block}
.sp-frame-img{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;user-select:none}
@keyframes sp-pop{from{transform:scale(.4);opacity:.2}to{transform:none;opacity:1}}

.sp-cta{max-width:860px;margin:0 auto;padding:24px 0 8px}
.sp-board{position:relative;width:100%}
.sp-board>img{display:block;width:100%;height:auto;filter:drop-shadow(0 10px 24px rgba(0,0,0,.45));user-select:none}
.sp-btns{position:absolute;left:7%;right:7%;top:75%;transform:translateY(-50%);display:flex;justify-content:center;align-items:center;gap:8%}
.sp-btns a{display:block;width:46%;transition:transform .2s}
.sp-btns a img{display:block;width:100%;height:auto}
.sp-btns a:hover{transform:scale(1.05)}
.sp-btns a:active{transform:scale(.96)}
.sp-btns a:focus-visible{outline:3px solid #fff;outline-offset:3px}

@media(prefers-reduced-motion:reduce){.sp-frame{animation:none}}
`

import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ---- Sponsor logos: normal imports from src/assets ---------------------------
import beestackLogo from '../assets/beestacklogo.png'
// import titleLogo from '../assets/titlelogo.png'      // <- add new sponsor logos here
// import diamondLogo from '../assets/diamondlogo.png'
// import goldLogo from '../assets/goldlogo.png'

// ---- Sponsor frames: one per tier, imported from src/assets/sponsors ----------
import techFrame from '../assets/sponsors/tech-frame.webp'
// import titleFrame from '../assets/sponsors/title-frame.webp'      // <- add new frames here
// import diamondFrame from '../assets/sponsors/diamond-frame.webp'
// import goldFrame from '../assets/sponsors/gold-frame.webp'

// ---- Page artwork: all imported from src/assets/sponsors ----------------------
import bgImg from '../assets/sponsors/bg.webp'
import frameTop from '../assets/sponsors/frame-top.webp'
import frameMid from '../assets/sponsors/frame-mid.webp'
import frameBot from '../assets/sponsors/frame-bot.webp'
import hackfusionLogo from '../assets/sponsors/hackfusion-logo.webp'
import floatCube from '../assets/sponsors/float-cube.webp'
import floatChest from '../assets/sponsors/float-chest.webp'
import boardImg from '../assets/sponsors/board.webp'
import sponsorBtn from '../assets/sponsors/sponsor-btn.webp'
import brochureBtn from '../assets/sponsors/brochure-btn.webp'
import brochurePdf from '../assets/sponsors/brochure.pdf'

/* HackFusion 4 – Sponsors page (single file, no Tailwind needed).
   Every image is a normal import from src/assets (logos) or src/assets/sponsors (artwork). */

// ---- Edit these -----------------------------------------------------------
const FLOATS = { cube: floatCube, chest: floatChest }
const EVENT_NAME = 'HackFusion 4'
const SPONSOR_EMAIL = 'swag@sggs.ac.in'
const BROCHURE_URL = brochurePdf
const NAV_H = 'clamp(56px, 11vw, 170px)' // height of your hanging navbar signs
const FLOAT_GAP = 0.5                     // spacing between floating objects along their path, in screen heights (min 240px)
const FLOAT_PX_PER_SEC = 70               // how fast objects travel from the bottom of the page to the top

// ---- SPONSORS ---------------------------------------------------------------
// One object per sponsor. 1 sponsor -> one big centred frame, 2 -> side by side, 3 -> a row, 4 -> 2 x 2.
// Phones / portrait tablets always show one column.
//
//   name  : shown as the image alt text
//   logo  : the imported image (see imports at the top)
//   frame : the imported frame image (see frame imports at the top)
//   slot  : (optional) area inside the frame as CSS inset: 'top left/right bottom'
//   bg    : (optional) fill colour behind the logo
//   pad   : (optional) space around the logo
//
// TEMPLATE - copy, uncomment, fill in, and add the matching import above:
//   {
//     id: 'gold',
//     name: 'Gold Sponsor',
//     logo: goldLogo,
//     frame: goldFrame,
//     slot: '19% 14% 14.5%',
//     bg: '#fff',
//     pad: '3% 6%',
//   },
const SPONSORS = [
  {
    id: 'tech',
    name: 'Beestack - Technology Sponsor',
    logo: beestackLogo,
    frame: techFrame,
    slot: '19% 14% 14.5%',
    bg: '#fff',
    pad: '3% 6%',
  },
]
// ----------------------------------------------------------------------------

// Stone-frame geometry in pixels of the original 1254px-wide frame images. Do not change unless you replace the frame images.
const F = { W: 1254, TOP: 385, MID: 115, BOT: 596, LOGO_TOP: 172, LOGO_W: 560, X: 172, CONTENT_TOP: 318, CONTENT_BOTTOM: 120, MAX: 1600 }
const JIT = [0.1, 0.7, 0.35, 0.9, 0.5, 0.2, 0.8, 0.4]

/** Sizes the background / floater layers to the page and spaces the floating objects along their path. */
function useScene({ rootRef, bgRef, floatRef, footRef, setItems }) {
  useEffect(() => {
    const root = rootRef.current, bg = bgRef.current, fl = floatRef.current, foot = footRef.current
    if (!root || !bg || !fl || !foot) return
    // ---- size the layers to the page and set the floaters' travel distance / lap time ----
    const resizeTrack = () => {
      const vh = window.innerHeight
      const contentH = root.offsetHeight - foot.offsetHeight
      bg.style.height = `${Math.max(vh, contentH)}px`
      if (bg.parentElement) bg.parentElement.style.height = `${contentH}px`
      if (fl.parentElement) fl.parentElement.style.height = `${contentH}px`
      // full travel distance (page height + room to enter/leave) and the time one lap takes
      fl.style.setProperty('--track', `${contentH}px`)
      fl.style.setProperty('--dur', `${(contentH + 380) / FLOAT_PX_PER_SEC}s`)
      return { vh, contentH }
    }

    // ---- floater layout: generated once per "generation", cached in a ref-like closure var ----
    let lastGenWidth = -1
    let lastN = -1
    const countFor = (vh, contentH) => {
      const gap = Math.max(240, vh * FLOAT_GAP)
      return Math.min(14, Math.max(2, Math.round(contentH / gap)))
    }
    // n objects, evenly spaced along the path: item i starts i/n of the way through the loop (ph)
    const layoutFloaters = (n) => {
      lastN = n
      setItems(Array.from({ length: n }, (_, i) => ({
        k: i % 2 ? 'chest' : 'cube',
        side: i % 2 ? 'right' : 'left',
        x: 1 + JIT[i % 8] * 7,
        ph: i / n,
      })))
    }

    // size(): always keeps the layer heights and --track/--dur correct (cheap, safe to call often).
    // The floater list itself is only rebuilt on first run, a real width change, or when the
    // page needs clearly more/fewer objects.
    const size = () => {
      const { vh, contentH } = resizeTrack()
      const widthChanged = Math.abs(lastGenWidth - window.innerWidth) > 2
      const n = countFor(vh, contentH)
      // regenerate on a real width change, or when the page grew/shrank enough (e.g. images loaded)
      // to need clearly more/fewer objects; small height noise (mobile address bar) is ignored
      if (widthChanged || lastN < 0 || Math.abs(n - lastN) >= 2) {
        lastGenWidth = window.innerWidth
        layoutFloaters(n)
      }
    }

    let sizeRaf = 0
    const scheduleSize = () => {
      if (sizeRaf) return
      sizeRaf = requestAnimationFrame(() => { sizeRaf = 0; size() })
    }

    size()

    // Re-measure once images/fonts have finished loading so the page height is accurate.
    const onLoad = () => scheduleSize()
    window.addEventListener('load', onLoad)

    const ro = new ResizeObserver(scheduleSize)
    ro.observe(root)
    ro.observe(foot)
    window.addEventListener('resize', scheduleSize)
    window.addEventListener('orientationchange', scheduleSize)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(sizeRaf)
      window.removeEventListener('load', onLoad)
      window.removeEventListener('resize', scheduleSize)
      window.removeEventListener('orientationchange', scheduleSize)
    }
  }, [rootRef, bgRef, floatRef, footRef, setItems])
}

export default function Sponsors() {
  const rootRef = useRef(null)
  const bgRef = useRef(null)
  const floatRef = useRef(null)
  const footRef = useRef(null)
  const [items, setItems] = useState([])
  useScene({ rootRef, bgRef, floatRef, footRef, setItems })
  useEffect(() => {
    const cards = document.querySelectorAll('.sp-card')
    if (!cards.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        e.target.style.setProperty('--anim-play', e.isIntersecting ? 'running' : 'paused')
      })
    }, { rootMargin: '200px' })
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <div className="sp-root" ref={rootRef}>
      <style>{CSS}</style>

      <div className="sp-nav"><Navbar /></div>

      {/* background scene (slow) */}
      <div className="sp-layers" aria-hidden="true">
        <div className="sp-bg" ref={bgRef} style={{ backgroundImage: `url(${bgImg})` }} />
      </div>

      {/* floating objects: in front of background + frame, behind the logo, cards and board */}
      <div className="sp-layers sp-floaters" aria-hidden="true">
        <div className="sp-fl" ref={floatRef}>
          {items.map((it, i) => (
            <div
              key={i}
              className="sp-float-pos"
              style={{
                [it.side]: `${it.x}%`,
                '--ph': it.ph,
                '--dir': it.side === 'left' ? 1 : -1,
              }}
            >
              <img
                className={`sp-float sp-${it.k}`}
                src={FLOATS[it.k]}
                alt=""
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>


      <div className="sp-page">
        <div className="sp-stage">
          <div className="sp-fr sp-fr-top" style={{ backgroundImage: `url(${frameTop})` }} aria-hidden="true" />
          <div className="sp-fr sp-fr-mid" style={{ backgroundImage: `url(${frameMid})` }} aria-hidden="true" />
          <div className="sp-fr sp-fr-bot" style={{ backgroundImage: `url(${frameBot})` }} aria-hidden="true" />

          <h1 className="sp-logo">
            <img src={hackfusionLogo} alt={`${EVENT_NAME} Sponsorship`} width="1000" height="184" />
          </h1>

          <div className={`sp-grid sp-n${SPONSORS.length}`} id="sponsors">
            {SPONSORS.map((s) => (
              <div
                className="sp-card"
                key={s.id}
                id={`sponsor-${s.id}`}
                style={{ '--frame-mask': `url(${s.frame})` }}
              >
                <div
                  className="sp-slot"
                  style={s.slot ? { inset: s.slot, background: s.bg, padding: s.pad } : undefined}
                >
                  <img src={s.logo} alt={s.name} />
                </div>
                <img src={s.frame} alt="" aria-hidden="true" draggable="false" />
              </div>
            ))}
          </div>


          <div className="sp-board">
            <img src={boardImg} alt={`Light up ${EVENT_NAME} together with us.`} draggable="false" />
            <div className="sp-btns">
              <a href={`mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(EVENT_NAME + ' sponsorship')}`} aria-label={`Sponsor us: email ${SPONSOR_EMAIL}`}>
                <img src={sponsorBtn} alt="Sponsor us" draggable="false" />
              </a>
              <a href={BROCHURE_URL} target="_blank" rel="noopener noreferrer" aria-label="Open the sponsorship brochure">
                <img src={brochureBtn} alt="Brochure" draggable="false" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="sp-foot" ref={footRef}><Footer /></div>
    </div>
  )
}

// Scoped styles (everything starts with .sp-). --u = the length of ONE pixel of the original frame image at the current frame width.
const CSS = `
.sp-root{--edge:clamp(4px,1vw,14px);--u:calc(min(100vw - 2 * var(--edge),${F.MAX}px) / ${F.W});
  --amp:clamp(18px,4vw,52px);       /* how wide the curve swings sideways */
  position:relative;overflow:hidden;width:100%;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;background:#050b12;color:#f4f1ea}

.sp-root *{box-sizing:border-box}
.sp-root .sp-nav{position:absolute;top:0;left:0;right:0;z-index:100}
.sp-root .sp-foot{position:relative;z-index:100}

.sp-root .sp-layers{position:absolute;top:0;left:0;right:0;overflow:hidden;pointer-events:none}
.sp-root .sp-bg{
  position:absolute;left:var(--edge);right:var(--edge);
  top:max(0px,calc(${NAV_H} - ${F.LOGO_TOP} * var(--u) + 6px));
  max-width:${F.MAX}px;margin:0 auto;
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  will-change:transform;
  backface-visibility:hidden
}
.sp-root .sp-floaters{z-index:2}
.sp-root .sp-fl{position:absolute;left:0;top:0;width:100%;height:100%;will-change:transform}

/* each object travels the whole page: it enters below the bottom edge, climbs to above the top edge,
   then restarts at the bottom, forever. --track (page height) and --dur (one lap) are set by JS;
   --ph (0..1) spaces the objects evenly along the path so they never bunch up. */
.sp-root .sp-float-pos{position:absolute;top:0;
  animation:sp-rise var(--dur,16s) linear infinite;
  animation-delay:calc(var(--dur,16s) * var(--ph,0) * -1);
  will-change:transform}
/* the image sways side to side (a separate element from the wrapper, so the two transforms never collide),
   which turns the straight climb into a smooth S-curve */
.sp-root .sp-float{position:relative;display:block;height:auto;user-select:none;
  filter:drop-shadow(0 10px 16px rgba(0,0,0,.55));
  animation:sp-curve 7s ease-in-out infinite;
  animation-delay:calc(var(--ph,0) * -7s);
  will-change:transform}
.sp-root .sp-cube{width:clamp(96px,16vw,260px)}
.sp-root .sp-chest{width:clamp(116px,19vw,310px)}

/* bottom of the page (just off-screen) -> above the top of the page; the layer clips what is outside */
@keyframes sp-rise{
  from{transform:translate3d(0,calc(var(--track,1200px) + 40px),0)}
  to{transform:translate3d(0,-340px,0)}
}
/* one full sine wave per sway, mirrored for right-side objects via --dir */
@keyframes sp-curve{
  0%,50%,100%{transform:translateX(0) rotate(0deg)}
  25%{transform:translateX(calc(var(--amp) * var(--dir,1))) rotate(8deg)}
  75%{transform:translateX(calc(var(--amp) * var(--dir,1) * -1)) rotate(-8deg)}
}

/* the stone frame fills the screen width; the logo sits right under the navbar */
.sp-root .sp-page{position:relative;flex:1 0 auto;display:flex;justify-content:center;
  padding:max(0px,calc(${NAV_H} - ${F.LOGO_TOP} * var(--u) + 6px)) var(--edge) 0}
.sp-root .sp-stage{position:relative;width:100%;max-width:${F.MAX}px;display:flex;flex-direction:column;gap:calc(6 * var(--u));
  padding:calc(${F.CONTENT_TOP} * var(--u)) calc(${F.X} * var(--u)) calc(${F.CONTENT_BOTTOM} * var(--u))}
.sp-root .sp-fr{position:absolute;left:0;width:100%;z-index:1;background-repeat:no-repeat;pointer-events:none}
.sp-root .sp-fr-top{top:0;height:calc(${F.TOP} * var(--u));background-size:100% 100%}
.sp-root .sp-fr-bot{bottom:0;height:calc(${F.BOT} * var(--u));background-size:100% 100%}
.sp-root .sp-fr-mid{top:calc(${F.TOP} * var(--u));bottom:calc(${F.BOT} * var(--u));background-size:100% calc(${F.MID} * var(--u));background-repeat:no-repeat round}

.sp-root .sp-logo{position:absolute;z-index:3;margin:0;padding:0;left:50%;transform:translateX(-50%);top:calc(${F.LOGO_TOP} * var(--u));width:calc(${F.LOGO_W} * var(--u))}
.sp-root .sp-logo img{display:block;width:100%;height:auto;filter:drop-shadow(0 4px 12px rgba(0,0,0,.6))}

/* sponsor frames: a row on tablets/laptops (2 x 2 for four frames), a column on phones */
.sp-root .sp-grid{position:relative;z-index:3;display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));gap:calc(6 * var(--u))}
.sp-root .sp-grid.sp-n1{width:62%;align-self:center}
.sp-root .sp-n1{--cols:1}.sp-root .sp-n2{--cols:2}.sp-root .sp-n3{--cols:3}.sp-root .sp-n4{--cols:2}
.sp-root .sp-card{position:relative;aspect-ratio:1/1;animation:sp-pop .7s cubic-bezier(.34,1.56,.64,1) both;
  transition:transform .18s cubic-bezier(.34,1.56,.64,1), filter .18s ease;transform-origin:center center;
  will-change:transform;
  animation-play-state:var(--anim-play, running);cursor:pointer}
.sp-root .sp-card:nth-child(2){animation-delay:.12s}
.sp-root .sp-card:nth-child(3){animation-delay:.24s}
.sp-root .sp-card:hover,.sp-root .sp-card:focus-within{
  transform:scale(1.15);
  filter:brightness(1.15) drop-shadow(0 0 22px rgb(255, 255, 255));
  z-index:10;
}
.sp-root .sp-card:active{transform:scale(1.08)}

.sp-root .sp-slot{position:absolute;inset:13%;display:flex;align-items:center;justify-content:center;overflow:hidden;z-index:1;
  box-shadow:inset 0 2px 6px rgba(0,0,0,.45), inset 0 -1px 3px rgba(255,255,255,.08), inset 0 0 0 1px rgba(80,200,220,.12)}
.sp-root .sp-slot img{width:100%;height:100%;object-fit:contain;display:block}
.sp-root .sp-card>img{position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none;user-select:none;
  filter:drop-shadow(0 6px 10px rgba(0,0,0,.4)) drop-shadow(0 0 2px rgba(120,220,235,.18));
  transition:filter .25s ease}
.sp-root .sp-card:hover>img{filter:drop-shadow(0 10px 16px rgba(0,0,0,.5)) drop-shadow(0 0 4px rgba(120,220,235,.3))}

/* metallic shimmer inside the logo slot (unchanged behaviour, kept) */
.sp-root .sp-slot::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.5) 44%,rgba(255,255,255,.95) 50%,rgba(255,255,255,.5) 56%,transparent 65%);
  background-size:250% 100%;background-repeat:no-repeat;background-position:150% 0;animation:sp-shimmer 2.8s ease-in-out infinite;
  animation-play-state:var(--anim-play, running)}

/* diagonal shine sweep — clipped to the frame art's own alpha shape, not the full square */
.sp-root .sp-card::before{content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
  background:linear-gradient(115deg,transparent 30%,rgba(210,240,250,.22) 42%,rgba(255,255,255,.55) 50%,rgba(210,240,250,.22) 58%,transparent 70%);
  background-size:300% 100%;background-repeat:no-repeat;background-position:160% 0;
  animation:sp-sweep 5.5s ease-in-out infinite;will-change:background-position;
  animation-play-state:var(--anim-play, running);
  -webkit-mask-image:var(--frame-mask);mask-image:var(--frame-mask);
  -webkit-mask-size:100% 100%;mask-size:100% 100%;
  -webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}
.sp-root .sp-card:nth-child(2)::before{animation-delay:.9s}
.sp-root .sp-card:nth-child(3)::before{animation-delay:1.8s}
.sp-root .sp-card:nth-child(4)::before{animation-delay:2.7s}

@keyframes sp-shimmer{0%{background-position:150% 0}60%,100%{background-position:-50% 0}}
@keyframes sp-sweep{0%,15%{background-position:160% 0}55%{background-position:-60% 0}100%{background-position:-60% 0}}
@keyframes sp-pop{from{transform:scale(.4);opacity:.2}to{transform:none;opacity:1}}

/* closing board, inside the frame */
.sp-root .sp-board{position:relative;z-index:3;width:72%;align-self:center}
.sp-root .sp-board>img{display:block;width:100%;height:auto;filter:drop-shadow(0 8px 18px rgba(0,0,0,.55));user-select:none}
.sp-root .sp-btns{position:absolute;left:7%;right:7%;top:75%;transform:translateY(-50%);display:flex;justify-content:center;align-items:center;gap:8%}
.sp-root .sp-btns a{display:block;width:46%;transition:transform .2s}
.sp-root .sp-btns a img{display:block;width:100%;height:auto}
.sp-root .sp-btns a:hover{transform:scale(1.05)}
.sp-root .sp-btns a:active{transform:scale(.96)}
.sp-root .sp-btns a:focus-visible{outline:3px solid #fff;outline-offset:3px}

@media(max-width:640px),(max-width:1023px) and (orientation:portrait){
  .sp-root .sp-grid,.sp-root .sp-grid.sp-n1{grid-template-columns:minmax(0,1fr);gap:calc(18 * var(--u));width:100%}
  .sp-root .sp-board{width:100%}
}
@media(prefers-reduced-motion:reduce){
  .sp-root .sp-card{animation:none}
  .sp-root .sp-float-pos{animation:none;top:calc(var(--ph,0) * var(--track,1200px))}
  .sp-root .sp-float{animation:none}
  .sp-root .sp-slot::after,.sp-root .sp-card::before{display:none}
  .sp-root .sp-card:hover,.sp-root .sp-card:focus-within{transform:none;filter:none}
}
`
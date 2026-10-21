import { useEffect, useRef } from "react"

// [main, highlight, shadow] per petal, so each block has a little pixel shading
const PALETTES = [
    ["#4f9a3a", "#7bc95e", "#2f6b24"], // fresh green
    ["#5fae45", "#8fd96f", "#3a7a2a"], // light green
    ["#3f8a32", "#68b74f", "#256020"], // deep green
    ["#76b947", "#a5e06f", "#4c8a2c"], // lime
]

const STEP = Math.PI / 4 // petals tumble in 45 degree steps for a chunky look

const rand = (a, b) => a + Math.random() * (b - a)

/* A blocky petal: one rectangle with a light top-left edge and a dark bottom-right edge */
function drawPetal(ctx, p) {
    const w = p.size
    const h = p.size * 0.7
    const e = Math.max(2, Math.round(p.size / 4)) // edge thickness

    ctx.save()
    ctx.translate(Math.round(p.x), Math.round(p.y))
    ctx.rotate(Math.round(p.rot / STEP) * STEP)
    ctx.globalAlpha = p.alpha

    ctx.fillStyle = p.palette[0]
    ctx.fillRect(-w / 2, -h / 2, w, h)

    ctx.fillStyle = p.palette[1]
    ctx.fillRect(-w / 2, -h / 2, w, e) // top edge
    ctx.fillRect(-w / 2, -h / 2, e, h) // left edge

    ctx.fillStyle = p.palette[2]
    ctx.fillRect(-w / 2, h / 2 - e, w, e) // bottom edge
    ctx.fillRect(w / 2 - e, -h / 2, e, h) // right edge

    ctx.restore()
}

/**
 * Wrap a section with <CherryBlossom> to keep its falling petals scoped to
 * that section.
 */
export default function CherryBlossom({ children }) {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const container = containerRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        let w = 0
        let h = 0
        let petals = []
        let raf = null
        let last = 0
        let timer = null
        let active = false

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            w = window.innerWidth
            h = window.innerHeight
            canvas.width = w * dpr
            canvas.height = h * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const frame = (t) => {
            const dt = Math.min((t - last) / 1000, 0.05)
            last = t
            ctx.clearRect(0, 0, w, h)

            petals = petals.filter((p) => {
                if (p.delay > 0) {
                    p.delay -= dt * 1000
                    return true // waiting to enter
                }

                p.age += dt
                // small wobble across the direction of travel
                const wobble = Math.sin(p.age * p.wobbleSpeed + p.phase) * p.wobbleAmp
                p.x += (p.vx + wobble * 0.7) * dt
                p.y += (p.vy + wobble * 0.7) * dt
                p.rot += p.rotSpeed * dt

                drawPetal(ctx, p)

                return p.y < h + 40 && p.x > -60
            })

            if (petals.length > 0) {
                raf = requestAnimationFrame(frame)
            } else {
                raf = null
                ctx.clearRect(0, 0, w, h)
            }
        }

        const startLoop = () => {
            if (raf === null) {
                last = performance.now()
                raf = requestAnimationFrame(frame)
            }
        }

        const burst = () => {
            if (!active) return

            const count = Math.random() < 0.5 ? 5 : 6

            // the whole bunch shares one start point (top right) and one end point (bottom left)
            const startX = rand(0.65 * w, 1.0 * w)
            const endX = rand(0, 0.3 * w)

            for (let i = 0; i < count; i++) {
                const sx = startX + rand(-60, 60)
                const sy = -rand(20, 90)
                const tx = endX + rand(-60, 60)
                const ty = h + 40
                const duration = rand(1.6, 2.4) // seconds to cross the screen, so it's quick

                petals.push({
                    x: sx,
                    y: sy,
                    vx: (tx - sx) / duration,
                    vy: (ty - sy) / duration,
                    size: rand(9, 15),
                    rot: rand(0, Math.PI * 2),
                    rotSpeed: rand(-6, 6),
                    wobbleAmp: rand(15, 40),
                    wobbleSpeed: rand(4, 8),
                    phase: rand(0, Math.PI * 2),
                    age: 0,
                    palette: PALETTES[Math.floor(Math.random() * PALETTES.length)],
                    alpha: rand(0.85, 1),
                    delay: rand(0, 700),
                })
            }

            startLoop()
            timer = setTimeout(burst, rand(5000, 9000)) // quiet gap before the next bunch
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                if (!active) {
                    active = true
                    timer = setTimeout(burst, 1500)
                }
                return
            }

            active = false
            clearTimeout(timer)
            timer = null
            if (raf !== null) cancelAnimationFrame(raf)
            raf = null
            petals = []
            ctx.clearRect(0, 0, w, h)
        })

        resize()
        window.addEventListener("resize", resize)
        observer.observe(container)

        return () => {
            observer.disconnect()
            clearTimeout(timer)
            if (raf !== null) cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <div ref={containerRef}>
            {children}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 z-40"
            />
        </div>
    )
}
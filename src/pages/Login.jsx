import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import { BASE_URL } from "../hooks/api";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import bg from "../assets/login_bg.webp"
import Footer from "../components/Footer"

/* ------------------------------------------------------------------ */
/*  Things to update                                                   */
/* ------------------------------------------------------------------ */
const EVENT_NAME = "HackFusion 4";
const BG_IMAGE = ""; // optional: import bg from "../assets/bg.jpg" and set BG_IMAGE = bg

/* ------------------------------------------------------------------ */
/*  Motion settings                                                    */
/*  Only opacity and transform are animated, so nothing reflows.       */
/* ------------------------------------------------------------------ */
const EASE = [0.22, 1, 0.36, 1];

const formVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};
const btnVariants = {
    rest: { y: 0 },
    hover: { y: -2 },
    tap: { y: 3 },
};

/* Wait for the pixel fonts so text doesn't change size mid-animation */
function useFontsReady() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        let alive = true;
        const go = () => alive && setReady(true);
        const fonts = typeof document !== "undefined" ? document.fonts : null;
        const loading = fonts
            ? Promise.all([fonts.load("1em 'Press Start 2P'"), fonts.load("1em VT323")])
            : Promise.resolve();
        const timeout = new Promise((r) => setTimeout(r, 1200));
        Promise.race([loading, timeout]).then(() => setTimeout(go, 80));
        return () => {
            alive = false;
        };
    }, []);
    return ready;
}

/* ------------------------------------------------------------------ */
/*  Styles (same Minecraft look as the registration page)              */
/* ------------------------------------------------------------------ */
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

.hf4 { --accent:#55c038; font-family:'VT323', ui-monospace, monospace; font-size:22px; color:#e8e8e8; }
.hf4 .px { font-family:'Press Start 2P', ui-monospace, monospace; letter-spacing:0; }
.hf4 *, .hf4 *::before, .hf4 *::after { box-sizing:border-box; }
.hf4 .mc-logo { filter:drop-shadow(0 6px 0 rgba(0,0,0,.5)); }

/* ---------- shell ---------- */
.hf4 .mc-shell {
  background:rgba(28,28,32,.9); border:4px solid #000;
  box-shadow: inset 4px 4px 0 #5e5e5e, inset -4px -4px 0 #1a1a1a, 0 12px 0 rgba(0,0,0,.45);
}
.hf4 .mc-grass { height:20px; border-bottom:4px solid #000;
  background:
    linear-gradient(#7fc944,#7fc944) top / 100% 10px no-repeat,
    repeating-linear-gradient(90deg,#5ea231 0 16px,#4e8d28 16px 32px) 0 10px / 100% 10px no-repeat; }
.hf4 .mc-title { text-shadow:3px 3px 0 #000; }

/* ---------- form controls ---------- */
.hf4 .mc-label { display:block; margin-bottom:6px; color:#f1f1f1; font-size:22px; line-height:1.1; }
.hf4 .mc-input {
  display:block; width:100%; min-height:50px; border-radius:0; outline:none;
  background:#111; color:#fff; font:inherit; font-size:23px; line-height:1.15; padding:9px 12px;
  border:3px solid #000; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050;
  caret-color:var(--accent); transition:box-shadow .12s;
}
.hf4 .mc-input.icon-l { padding-left:46px; }
.hf4 .mc-input.icon-r { padding-right:92px; }
.hf4 .mc-input::placeholder { color:#777; }
.hf4 .mc-input:focus { outline:3px solid var(--accent); outline-offset:2px; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050, 0 0 18px -2px var(--accent); }
.hf4 .mc-field-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#9a9a9a; pointer-events:none; transition:color .12s; }
.hf4 .mc-field:focus-within .mc-field-icon { color:var(--accent); }
.hf4 .mc-mini {
  position:absolute; right:8px; top:50%; transform:translateY(-50%); cursor:pointer;
  font-family:'Press Start 2P', monospace; font-size:9px; color:#fff; padding:8px 8px; background:#7b7b7b; border:3px solid #000;
  text-shadow:2px 2px 0 #3b3b3b; box-shadow: inset 2px 2px 0 #b9b9b9, inset -2px -2px 0 #4a4a4a;
}
.hf4 .mc-mini:hover { background:#6b7bd1; }
.hf4 .mc-mini:focus-visible { outline:3px solid #fff; outline-offset:2px; }

/* pixel checkbox */
.hf4 .mc-box { appearance:none; -webkit-appearance:none; flex:0 0 28px; width:28px; height:28px; cursor:pointer; margin:0;
  background:#111; border:3px solid #000; box-shadow: inset 3px 3px 0 #000, inset -3px -3px 0 #505050; }
.hf4 .mc-box:checked { background:#111 url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' shape-rendering='crispEdges'><path fill='%237dea2b' d='M1 4h1v1H1zM2 5h1v1H2zM3 4h1v1H3zM4 3h1v1H4zM5 2h1v1H5zM6 1h1v1H6z'/></svg>") center / 20px 20px no-repeat; }
.hf4 .mc-box:focus-visible { outline:3px solid var(--accent); outline-offset:2px; }

/* buttons (lift and press are handled by motion) */
.hf4 .mc-btn {
  display:inline-flex; align-items:center; justify-content:center; gap:12px; cursor:pointer; width:100%;
  font-family:'Press Start 2P', monospace; font-size:11px; line-height:1.4; color:#fff; text-align:center;
  padding:18px 22px; min-height:56px; border:3px solid #000; border-radius:0;
  background:#4fa22a; box-shadow: inset 3px 3px 0 #8fe05f, inset -3px -3px 0 #2e6a14; text-shadow:2px 2px 0 #1d4a0a;
  transition:background-color .1s;
}
.hf4 .mc-btn:hover:not(:disabled) { background:#5bb832; box-shadow: inset 3px 3px 0 #a6f07a, inset -3px -3px 0 #2e6a14; }
.hf4 .mc-btn:focus-visible { outline:3px solid #fff; outline-offset:3px; }
.hf4 .mc-btn:disabled { cursor:not-allowed; color:#8a8a8a; text-shadow:none; background:#4a4a4a; box-shadow: inset 3px 3px 0 #5f5f5f, inset -3px -3px 0 #333; }

/* error sign */
.hf4 .mc-alert { background:#2d0d0d; border:3px solid #d23232; color:#ff9a9a; padding:10px 14px; font-size:22px; line-height:1.15; text-align:center; }

.hf4 .mc-link { color:#7fb8ff; text-decoration:underline; text-underline-offset:3px; background:none; border:0; cursor:pointer; font:inherit; padding:0; }
.hf4 .mc-link:hover { color:#fff; }
.hf4 .mc-link:focus-visible { outline:3px solid #fff; outline-offset:3px; }

@media (max-width:640px) { .hf4 { font-size:21px; } }
@media (prefers-reduced-motion: reduce) {
  .hf4 *, .hf4 *::before, .hf4 *::after { transition:none !important; animation:none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Decorative pieces                                                  */
/* ------------------------------------------------------------------ */
const STARS = Array.from({ length: 46 }, (_, i) => ({
    left: (i * 37) % 100 + ((i * 13) % 7) * 0.3,
    top: (i * 53) % 58,
    size: i % 6 === 0 ? 4 : 2,
    delay: ((i * 7) % 30) / 10,
}));
const CLOUDS = [
    { top: "12%", dur: 90, delay: -20 },
    { top: "24%", dur: 120, delay: -70 },
    { top: "7%", dur: 150, delay: -110 },
    { top: "33%", dur: 105, delay: -40 },
];
const ORBS = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 61) % 100,
    size: 6 + (i % 3) * 3,
    dur: 9 + (i % 5) * 2.2,
    delay: -((i * 3.7) % 14),
    dx: (i % 2 ? 1 : -1) * (20 + (i % 4) * 14),
}));

const Scene = ({ bgImage }) => (
    <div className="mc-scene" aria-hidden="true">
        {bgImage ? (
            <>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-black/35" />
            </>
        ) : (
            <>
                <div className="mc-sky" />
                {STARS.map((s, i) => (
                    <span
                        key={i}
                        className="mc-star"
                        style={{
                            left: `${s.left}%`,
                            top: `${s.top}%`,
                            width: s.size,
                            height: s.size,
                            animationDelay: `${s.delay}s`,
                        }}
                    />
                ))}
                <div className="mc-moon" />
                {CLOUDS.map((c, i) => (
                    <div
                        key={i}
                        className="mc-cloud"
                        style={{ top: c.top, "--dur": `${c.dur}s`, "--delay": `${c.delay}s` }}
                    />
                ))}
                <div className="mc-hill far" />
                <div className="mc-hill near" />
            </>
        )}
        {ORBS.map((o, i) => (
            <span
                key={i}
                className="mc-orb"
                style={{
                    left: `${o.left}%`,
                    width: o.size,
                    height: o.size,
                    animationDuration: `${o.dur}s`,
                    animationDelay: `${o.delay}s`,
                    "--dx": `${o.dx}px`,
                }}
            />
        ))}
    </div>
);

const Cube = ({ variant, size = 56, reverse }) => (
    <div className="mc-cube-wrap" style={{ animationDelay: reverse ? "-1.4s" : "0s" }}>
        <div
            className={`mc-cube ${variant} ${reverse ? "rev" : ""}`}
            style={{ "--s": `${size}px` }}
        >
            <i className="face side front" />
            <i className="face side back" />
            <i className="face side right" />
            <i className="face side left" />
            <i className="face top" />
            <i className="face bottom" />
        </div>
    </div>
);

const HEAD = [
    "HHHHHHHH",
    "HHHHHHHH",
    "HSSSSSSH",
    "SSSSSSSS",
    "SWBSSBWS",
    "SSSSSSSS",
    "SSMMMMSS",
    "SSSSSSSS",
];

const PixelHead = ({ hair = "#3a2a1a", skin = "#c68a63", size = 40 }) => {
    const map = { H: hair, S: skin, W: "#ffffff", B: "#3b4bb5", M: "#7a4a30" };
    return (
        <svg
            viewBox="0 0 8 8"
            width={size}
            height={size}
            shapeRendering="crispEdges"
            aria-hidden="true"
        >
            {HEAD.map((row, y) =>
                row
                    .split("")
                    .map((c, x) => (
                        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={map[c]} />
                    ))
            )}
        </svg>
    );
};

const ICON_MAIL =
    "M0 1h8v1H0zM0 6h8v1H0zM0 1h1v6H0zM7 1h1v6H7zM1 2h1v1H1zM2 3h1v1H2zM3 4h2v1H3zM5 3h1v1H5zM6 2h1v1H6z";
const ICON_LOCK = "M2 0h4v1H2zM2 1h1v2H2zM5 1h1v2H5zM1 3h6v5H1zM3 4h2v2H3z";
const ICON_ARROW = "M2 1h1v6H2zM3 2h1v4H3zM4 3h1v2H4z";

const PixelIcon = ({ d, size = 18, className = "" }) => (
    <svg
        viewBox="0 0 8 8"
        width={size}
        height={size}
        fill="currentColor"
        fillRule="evenodd"
        shapeRendering="crispEdges"
        aria-hidden="true"
        className={className}
    >
        <path d={d} />
    </svg>
);

/* ------------------------------------------------------------------ */
/*  Motion building blocks                                             */
/* ------------------------------------------------------------------ */

/* Pixel button: lifts on hover, presses on tap. Children can react to "hover". */
const McButton = ({ className = "", disabled, children, ...rest }) => (
    <motion.button
        variants={btnVariants}
        initial={false}
        whileHover={disabled ? undefined : "hover"}
        whileTap={disabled ? undefined : "tap"}
        disabled={disabled}
        className={`mc-btn ${className}`}
        {...rest}
    >
        {children}
    </motion.button>
);

/* Arrow that nudges right when the parent McButton is hovered */
const ArrowNudge = () => (
    <motion.span
        className="inline-flex"
        variants={{ rest: { x: 0 }, hover: { x: 4 } }}
        transition={{ duration: 0.15 }}
    >
        <PixelIcon d={ICON_ARROW} size={14} />
    </motion.span>
);

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const ready = useFontsReady();

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const formData = new FormData();
            formData.append("email", loginData.email);
            formData.append("password", loginData.password);

            const response = await axios.post(`${BASE_URL}/login.php`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data.success) {
                // Save token & user data in localStorage/session
                localStorage.setItem("user", JSON.stringify(response.data.data));
                localStorage.setItem("authToken", response.data.data.token);

                // alert("Login successful!");
                navigate("/dashboard");
            } else {
                setErrorMsg(response.data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMsg("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="hf4 relative min-h-screen w-full overflow-x-clip overflow-y-hidden">
                <img src={bg} alt="" className="fixed top-0 left-0 -z-10 h-screen w-screen object-cover" />
                <Navbar />

                <style>{styles}</style>
                <Scene bgImage={BG_IMAGE} />

                <main className="relative z-10 mx-auto flex min-h-screen -mt-10 w-full max-w-lg flex-col items-center justify-center px-3 pb-10 pt-24 sm:px-6">
                    {/* Hero */}
                    <header className="flex w-full items-center justify-center gap-5 sm:gap-8">
                        <div className="hidden sm:block">
                            <Cube variant="grass" size={46} />
                        </div>
                        <div className="text-center">
                            <h1 className="sr-only">{EVENT_NAME} Leader Login</h1>
                            {/* outer: drops in once. inner: gentle bob forever */}
                            <motion.div
                                className="mx-auto w-full max-w-[250px] sm:max-w-[360px] -mb-15"
                                initial={{ opacity: 0, y: -30 }}
                                animate={ready ? { opacity: 1, y: 0 } : undefined}
                                transition={{ duration: 0.7, ease: EASE }}
                            >
                                <motion.img
                                    src={logo}
                                    alt={EVENT_NAME}
                                    className="mc-logo block h-auto w-full lg:mt-5 mb-15 lg:mb-10"
                                />
                            </motion.div>
                        </div>
                        <div className="hidden sm:block">
                            <Cube variant="ore" size={46} reverse />
                        </div>
                    </header>

                    {/* Card */}
                    <motion.div
                        className="mc-shell w-full"
                        initial={{ opacity: 0, y: 28 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                    >
                        <div className="mc-grass" />

                        <div className="p-5 sm:p-8">
                            <div className="mb-6 flex items-center justify-center gap-3">
                                <PixelHead size={34} />
                                <h2 className="px mc-title text-sm text-white sm:text-lg">Leader Login</h2>
                            </div>

                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                                variants={formVariants}
                                initial="hidden"
                                animate={ready ? "show" : "hidden"}
                            >
                                <motion.div className="mc-field" variants={itemVariants}>
                                    <label htmlFor="email" className="mc-label">
                                        Leader Email
                                    </label>
                                    <div className="relative">
                                        <PixelIcon d={ICON_MAIL} className="mc-field-icon" />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            autoComplete="email"
                                            maxLength={100}
                                            value={loginData.email}
                                            onChange={handleInputChange}
                                            className="mc-input icon-l"
                                            placeholder="steve@example.com"
                                        />
                                    </div>
                                </motion.div>

                                <motion.div className="mc-field" variants={itemVariants}>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="mc-label">
                                            Password
                                        </label>
                                        <Link to="/reset-password" className="mc-link text-[19px]">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <PixelIcon d={ICON_LOCK} className="mc-field-icon" />
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            autoComplete="current-password"
                                            value={loginData.password}
                                            onChange={handleInputChange}
                                            className="mc-input icon-l icon-r"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            className="mc-mini"
                                            onClick={() => setShowPassword((s) => !s)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            aria-pressed={showPassword}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </motion.div>

                                <motion.div className="flex items-center gap-3" variants={itemVariants}>
                                    {/* <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={loginData.rememberMe}
                                        onChange={handleInputChange}
                                        className="mc-box"
                                    />
                                    <label htmlFor="rememberMe" className="cursor-pointer text-[22px] text-gray-200">
                                        Remember me
                                    </label> */}
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <AnimatePresence>
                                        {errorMsg && (
                                            <motion.p
                                                key="login-error"
                                                role="alert"
                                                className="mc-alert mb-5"
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {errorMsg}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                    <McButton type="submit" disabled={loading}>
                                        {loading ? (
                                            <span className="inline-flex items-center" aria-label="Logging in">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.span
                                                        key={i}
                                                        className="mx-0.5 inline-block h-2 w-2 bg-white"
                                                        animate={{ opacity: [1, 0.2, 1] }}
                                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                    />
                                                ))}
                                            </span>
                                        ) : (
                                            <>
                                                Login to Dashboard
                                                <ArrowNudge />
                                            </>
                                        )}
                                    </McButton>
                                </motion.div>

                                <motion.p className="text-center text-[21px] text-gray-400" variants={itemVariants}>
                                    Not registered yet?{" "}
                                    <a href="/register" className="mc-link" onClick={handleRegister}>
                                        Register for a new team
                                    </a>
                                    {/* <p className="mt-7 text-center text-[20px] text-gray-300" style={{ textShadow: "2px 2px 0 #000" }}>
                                        © 2026 HackFusion. Gotta code &apos;em all!
                                    </p> */}
                                </motion.p>
                            </motion.form>
                        </div>
                    </motion.div>

                </main>
            </div>
            <Footer/>
        </MotionConfig>
    );
}

export default Login;
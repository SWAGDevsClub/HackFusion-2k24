import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import mcmain from "../assets/mcmain.jpg";
import logo from "../assets/logo.png";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tokenParam = searchParams.get("token");
  const emailParam = searchParams.get("email") || "";

  // Mode: if token is present in URL or toggled manually in demo mode
  const [hasToken, setHasToken] = useState(Boolean(tokenParam));
  const activeToken = tokenParam || (hasToken ? "demo-sample-token" : "");

  // Mode A state (Request Reset Link)
  const [emailInput, setEmailInput] = useState(emailParam);
  const [emailError, setEmailError] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isEmailProcessing, setIsEmailProcessing] = useState(false);

  // Mode B state (Set New Password)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: "",
    confirmPassword: "",
    general: "",
  });
  const [isPasswordSubmitted, setIsPasswordSubmitted] = useState(false);
  const [isPasswordProcessing, setIsPasswordProcessing] = useState(false);

  // Mode A: Validation & Submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    const trimmed = emailInput.trim();
    if (!trimmed) {
      setEmailError("Email address is required.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError("Please enter a valid email address (e.g. steve@example.com).");
      return;
    }

    setIsEmailProcessing(true);
    // Simulated instant processing without network calls
    setIsEmailProcessing(false);
    setIsEmailSubmitted(true);
  };

  // Mode B: Validation & Submission
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = { newPassword: "", confirmPassword: "", general: "" };
    let hasError = false;

    if (!newPassword.trim()) {
      errors.newPassword = "New password is required.";
      hasError = true;
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long.";
      hasError = true;
    } else if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      errors.newPassword = "Password must contain at least one letter and one number.";
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    if (hasError) {
      setPasswordErrors(errors);
      return;
    }

    setPasswordErrors({ newPassword: "", confirmPassword: "", general: "" });
    setIsPasswordProcessing(true);
    // Simulated instant processing without network calls
    setIsPasswordProcessing(false);
    setIsPasswordSubmitted(true);
  };

  const resetAllStates = () => {
    setIsEmailSubmitted(false);
    setIsPasswordSubmitted(false);
    setEmailError("");
    setPasswordErrors({ newPassword: "", confirmPassword: "", general: "" });
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip font-['VT323',monospace] text-[#e8e8e8] text-[22px]">
      {/* LAYER 1 & 2: Full-Viewport Minecraft Landscape Background (z-0, above root, below foreground) */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* 4K Daytime Minecraft Overworld Landscape */}
        <img
          src={mcmain}
          alt="Minecraft Overworld Landscape"
          className="h-full w-full object-cover object-center"
        />

        {/* Subtle Atmospheric & Contrast Overlay (Tuned so mountains, forests, and sky are clearly visible) */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Live Animated Flying Minecraft Overworld Mobs */}
        <img
          src="/images/mobs/bee.gif"
          alt=""
          className="bee-orbit-left absolute top-32 left-[12%] w-12 h-12 drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] pointer-events-none motion-reduce:hidden"
        />
        <img
          src="/images/mobs/bee.gif"
          alt=""
          className="bee-orbit-right absolute top-48 right-[14%] w-10 h-10 drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] pointer-events-none motion-reduce:hidden"
        />
      </div>

      {/* LAYER 3 & 4: Foreground Content & Reset Password Card (z-10) */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <Navbar />

        <main className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-3 pt-24 pb-16 sm:px-6">
        {/* Brand Header */}
        <header className="mb-6 flex flex-col items-center text-center">
          <Link to="/" aria-label="HackFusion 4 Home">
            <img
              src={logo}
              alt="HackFusion 4"
              className="block h-auto w-48 sm:w-60 drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
            />
          </Link>
          <h1 className="sr-only">HackFusion 4 Reset Password</h1>
        </header>

        {/* Minecraft Shell Card */}
        <div className="w-full bg-[#1c1c20]/90 border-4 border-black shadow-[inset_4px_4px_0_#5e5e5e,inset_-4px_-4px_0_#1a1a1a,0_12px_0_rgba(0,0,0,0.45)]">
          {/* Top Minecraft Grass Block Border Strip */}
          <div
            className="h-5 w-full border-b-4 border-black overflow-hidden flex flex-col"
            aria-hidden="true"
          >
            <div className="h-2.5 w-full bg-[#7fc944]" />
            <div className="h-2.5 w-full bg-[repeating-linear-gradient(90deg,#5ea231_0px,#5ea231_16px,#4e8d28_16px,#4e8d28_32px)]" />
          </div>

          <div className="p-5 sm:p-8">
            {/* Title with Pixel Head Emblem */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <svg
                viewBox="0 0 8 8"
                className="w-8 h-8 shrink-0"
                shapeRendering="crispEdges"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="8" height="2" fill="#3a2a1a" />
                <rect x="0" y="2" width="1" height="1" fill="#3a2a1a" />
                <rect x="7" y="2" width="1" height="1" fill="#3a2a1a" />
                <rect x="1" y="2" width="6" height="1" fill="#c68a63" />
                <rect x="0" y="3" width="8" height="1" fill="#c68a63" />
                <rect x="0" y="4" width="1" height="1" fill="#c68a63" />
                <rect x="1" y="4" width="1" height="1" fill="#ffffff" />
                <rect x="2" y="4" width="1" height="1" fill="#3b4bb5" />
                <rect x="3" y="4" width="2" height="1" fill="#c68a63" />
                <rect x="5" y="4" width="1" height="1" fill="#3b4bb5" />
                <rect x="6" y="4" width="1" height="1" fill="#ffffff" />
                <rect x="7" y="4" width="1" height="1" fill="#c68a63" />
                <rect x="0" y="5" width="8" height="1" fill="#c68a63" />
                <rect x="0" y="6" width="2" height="1" fill="#c68a63" />
                <rect x="2" y="6" width="4" height="1" fill="#7a4a30" />
                <rect x="6" y="6" width="2" height="1" fill="#c68a63" />
                <rect x="0" y="7" width="8" height="1" fill="#c68a63" />
              </svg>
              <h2 className="font-['Press_Start_2P',monospace] text-sm sm:text-base text-white [text-shadow:3px_3px_0_#000]">
                {hasToken ? "SET NEW PASSWORD" : "FORGOT PASSWORD?"}
              </h2>
            </div>

            {/* Mode A: Request Reset Link */}
            {!hasToken && (
              <div>
                {!isEmailSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-5" noValidate>
                    <p className="text-center text-[20px] text-[#C5C9BE] leading-relaxed">
                      Enter your registered leader email to receive a password recovery link.
                    </p>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                        Leader Email
                      </label>
                      <div className="relative">
                        {/* Mail Icon */}
                        <svg
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] pointer-events-none"
                          viewBox="0 0 8 8"
                          fill="currentColor"
                          fillRule="evenodd"
                          shapeRendering="crispEdges"
                          aria-hidden="true"
                        >
                          <path d="M0 1h8v1H0zM0 6h8v1H0zM0 1h1v6H0zM7 1h1v6H7zM1 2h1v1H1zM2 3h1v1H2zM3 4h2v1H3zM5 3h1v1H5zM6 2h1v1H6z" />
                        </svg>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          maxLength={100}
                          value={emailInput}
                          onChange={(e) => {
                            setEmailInput(e.target.value);
                            if (emailError) setEmailError("");
                          }}
                          placeholder="steve@example.com"
                          className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-3 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                        />
                      </div>
                      {emailError && (
                        <p
                          role="alert"
                          className="mt-2 bg-[#2d0d0d] border-[3px] border-[#d23232] text-[#ff9a9a] p-2 text-center text-[20px] leading-tight"
                        >
                          {emailError}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    <button
                      type="submit"
                      disabled={isEmailProcessing}
                      className="inline-flex items-center justify-center gap-3 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] leading-relaxed text-white text-center py-4 px-5 min-h-[56px] border-[3px] border-black rounded-none bg-[#4fa22a] hover:bg-[#5bb832] active:translate-y-0.5 shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a] disabled:cursor-not-allowed disabled:text-[#8a8a8a] disabled:bg-[#4a4a4a] transition-colors"
                    >
                      {isEmailProcessing ? "PROCESSING..." : "SEND RESET LINK"}
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                        fillRule="evenodd"
                        shapeRendering="crispEdges"
                        aria-hidden="true"
                      >
                        <path d="M2 1h1v6H2zM3 2h1v4H3zM4 3h1v2H4z" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  /* Demonstration Confirmation State */
                  <div className="space-y-5 text-center">
                    <div className="bg-[#0d2d14] border-[3px] border-[#32d246] text-[#9affaf] p-4 text-[21px] leading-relaxed">
                      <p className="font-['Press_Start_2P',monospace] text-[11px] text-[#55c038] mb-2 [text-shadow:1px_1px_0_#000]">
                        DEMONSTRATION CONFIRMATION
                      </p>
                      <p className="mb-2">
                        Simulated reset link sent to:
                      </p>
                      <p className="text-white font-bold underline mb-3">
                        {emailInput}
                      </p>
                      <p className="text-[19px] text-[#C5C9BE]">
                        This is a frontend demonstration prototype. No actual email was dispatched.
                      </p>
                    </div>

                    <div className="bg-[#151a17] border-[3px] border-black p-4 text-[19px] text-[#F2C14E] leading-normal">
                      <p className="font-['Press_Start_2P',monospace] text-[10px] mb-2">
                        FRONTEND DEMO SHORTCUT:
                      </p>
                      <p className="text-[#e8e8e8] mb-3 text-[19px]">
                        You can immediately test the new password creation form by clicking below:
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          resetAllStates();
                          setHasToken(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[10px] py-3 px-4 bg-[#7847AB] hover:bg-[#8e58c9] text-white border-[3px] border-black shadow-[inset_2px_2px_0_#b589e6,inset_-2px_-2px_0_#4c2772] transition-colors"
                      >
                        TEST SET NEW PASSWORD (DEMO)
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsEmailSubmitted(false)}
                      className="text-[#7fb8ff] hover:text-white underline text-[20px] cursor-pointer"
                    >
                      Try another email address
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mode B: Set New Password (Token present or demo activated) */}
            {hasToken && (
              <div>
                {!isPasswordSubmitted ? (
                  <form onSubmit={handlePasswordSubmit} className="space-y-5" noValidate>
                    {/* Demo Token Indicator */}
                    <div className="bg-[#151a17] border-2 border-black p-2.5 text-center text-[18px] text-[#F2C14E]">
                      <span className="font-['Press_Start_2P',monospace] text-[9px] mr-2 text-[#55c038]">
                        [TOKEN DETECTED]
                      </span>
                      <span className="text-[#9a9a9a] truncate max-w-xs inline-block align-bottom">
                        {activeToken}
                      </span>
                      {emailParam && (
                        <p className="text-[#C5C9BE] text-[17px] mt-1">
                          Account: {emailParam}
                        </p>
                      )}
                    </div>

                    <p className="text-center text-[20px] text-[#C5C9BE] leading-relaxed">
                      Enter and confirm your new password below.
                    </p>

                    {/* New Password Field */}
                    <div>
                      <label htmlFor="newPassword" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                        New Password
                      </label>
                      <div className="relative">
                        {/* Lock Icon */}
                        <svg
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] pointer-events-none"
                          viewBox="0 0 8 8"
                          fill="currentColor"
                          fillRule="evenodd"
                          shapeRendering="crispEdges"
                          aria-hidden="true"
                        >
                          <path d="M2 0h4v1H2zM2 1h1v2H2zM5 1h1v2H5zM1 3h6v5H1zM3 4h2v2H3z" />
                        </svg>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            if (passwordErrors.newPassword) {
                              setPasswordErrors((prev) => ({ ...prev, newPassword: "" }));
                            }
                          }}
                          placeholder="••••••••"
                          className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-24 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((v) => !v)}
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                          aria-pressed={showNewPassword}
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer font-['Press_Start_2P',monospace] text-[9px] text-white px-2.5 py-1.5 bg-[#7b7b7b] hover:bg-[#6b7bd1] border-[3px] border-black [text-shadow:2px_2px_0_#3b3b3b] shadow-[inset_2px_2px_0_#b9b9b9,inset_-2px_-2px_0_#4a4a4a] focus:outline-white focus:outline-2 active:translate-y-[calc(-50%+1px)] transition-colors"
                        >
                          {showNewPassword ? "HIDE" : "SHOW"}
                        </button>
                      </div>
                      {passwordErrors.newPassword && (
                        <p
                          role="alert"
                          className="mt-2 bg-[#2d0d0d] border-[3px] border-[#d23232] text-[#ff9a9a] p-2 text-center text-[20px] leading-tight"
                        >
                          {passwordErrors.newPassword}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        {/* Lock Icon */}
                        <svg
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a9a9a] pointer-events-none"
                          viewBox="0 0 8 8"
                          fill="currentColor"
                          fillRule="evenodd"
                          shapeRendering="crispEdges"
                          aria-hidden="true"
                        >
                          <path d="M2 0h4v1H2zM2 1h1v2H2zM5 1h1v2H5zM1 3h6v5H1zM3 4h2v2H3z" />
                        </svg>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (passwordErrors.confirmPassword) {
                              setPasswordErrors((prev) => ({ ...prev, confirmPassword: "" }));
                            }
                          }}
                          placeholder="••••••••"
                          className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-24 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((v) => !v)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                          aria-pressed={showConfirmPassword}
                          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer font-['Press_Start_2P',monospace] text-[9px] text-white px-2.5 py-1.5 bg-[#7b7b7b] hover:bg-[#6b7bd1] border-[3px] border-black [text-shadow:2px_2px_0_#3b3b3b] shadow-[inset_2px_2px_0_#b9b9b9,inset_-2px_-2px_0_#4a4a4a] focus:outline-white focus:outline-2 active:translate-y-[calc(-50%+1px)] transition-colors"
                        >
                          {showConfirmPassword ? "HIDE" : "SHOW"}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p
                          role="alert"
                          className="mt-2 bg-[#2d0d0d] border-[3px] border-[#d23232] text-[#ff9a9a] p-2 text-center text-[20px] leading-tight"
                        >
                          {passwordErrors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Password Requirements Guidance Box */}
                    <div className="bg-[#151a17] border-2 border-black p-3 text-[19px] space-y-1">
                      <p className="font-['Press_Start_2P',monospace] text-[10px] text-[#F2C14E] mb-2 [text-shadow:1px_1px_0_#000]">
                        REQUIREMENTS:
                      </p>
                      <div
                        className={`flex items-center gap-2 ${
                          newPassword.length >= 8 ? "text-[#55c038]" : "text-[#9a9a9a]"
                        }`}
                      >
                        <span>{newPassword.length >= 8 ? "✔" : "■"}</span>
                        <span>At least 8 characters</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          /[A-Za-z]/.test(newPassword) ? "text-[#55c038]" : "text-[#9a9a9a]"
                        }`}
                      >
                        <span>{/[A-Za-z]/.test(newPassword) ? "✔" : "■"}</span>
                        <span>Contains at least one letter</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          /\d/.test(newPassword) ? "text-[#55c038]" : "text-[#9a9a9a]"
                        }`}
                      >
                        <span>{/\d/.test(newPassword) ? "✔" : "■"}</span>
                        <span>Contains at least one number</span>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${
                          confirmPassword && newPassword === confirmPassword
                            ? "text-[#55c038]"
                            : "text-[#9a9a9a]"
                        }`}
                      >
                        <span>
                          {confirmPassword && newPassword === confirmPassword ? "✔" : "■"}
                        </span>
                        <span>Passwords match</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isPasswordProcessing}
                      className="inline-flex items-center justify-center gap-3 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] leading-relaxed text-white text-center py-4 px-5 min-h-[56px] border-[3px] border-black rounded-none bg-[#4fa22a] hover:bg-[#5bb832] active:translate-y-0.5 shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a] disabled:cursor-not-allowed disabled:text-[#8a8a8a] disabled:bg-[#4a4a4a] transition-colors"
                    >
                      {isPasswordProcessing ? "UPDATING..." : "UPDATE PASSWORD"}
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                        fillRule="evenodd"
                        shapeRendering="crispEdges"
                        aria-hidden="true"
                      >
                        <path d="M2 1h1v6H2zM3 2h1v4H3zM4 3h1v2H4z" />
                      </svg>
                    </button>
                  </form>
                ) : (
                  /* Demonstration Success State */
                  <div className="space-y-5 text-center">
                    <div className="bg-[#0d2d14] border-[3px] border-[#32d246] text-[#9affaf] p-5 text-[21px] leading-relaxed">
                      <p className="font-['Press_Start_2P',monospace] text-[12px] text-[#55c038] mb-3 [text-shadow:1px_1px_0_#000]">
                        DEMONSTRATION SUCCESS
                      </p>
                      <p className="text-white text-[22px] font-bold mb-2">
                        Password updated successfully!
                      </p>
                      <p className="text-[19px] text-[#C5C9BE]">
                        This is a simulated frontend demonstration state. In production, your new password would now be saved securely.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="inline-flex items-center justify-center gap-3 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] leading-relaxed text-white text-center py-4 px-5 min-h-[56px] border-[3px] border-black rounded-none bg-[#4fa22a] hover:bg-[#5bb832] active:translate-y-0.5 shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a] transition-colors"
                    >
                      PROCEED TO LOGIN
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                        fillRule="evenodd"
                        shapeRendering="crispEdges"
                        aria-hidden="true"
                      >
                        <path d="M2 1h1v6H2zM3 2h1v4H3zM4 3h1v2H4z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={resetAllStates}
                      className="text-[#7fb8ff] hover:text-white underline text-[19px] cursor-pointer"
                    >
                      Reset demo form
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation and Mode Switching Links */}
            <div className="mt-6 pt-5 border-t border-[#333] text-center space-y-2 text-[20px] text-[#9a9a9a]">
              {hasToken ? (
                <p>
                  Need to request a new link?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      resetAllStates();
                      setHasToken(false);
                    }}
                    className="text-[#7fb8ff] hover:text-white underline cursor-pointer"
                  >
                    Request reset link
                  </button>
                </p>
              ) : (
                <p>
                  Already have a reset token?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      resetAllStates();
                      setHasToken(true);
                    }}
                    className="text-[#7fb8ff] hover:text-white underline cursor-pointer"
                  >
                    Set password directly
                  </button>
                </p>
              )}

              <p>
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-[#7fb8ff] hover:text-white underline cursor-pointer"
                >
                  Back to Member Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </div>
  );
}

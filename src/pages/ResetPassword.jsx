import { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import mcmain from "../assets/mcmain.jpg";
import logo from "../assets/logo.png";
import { BASE_URL, getApiErrorMessage } from "../hooks/api";

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

export default function ResetPassword() {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryToken =
    searchParams.get("token") ||
    searchParams.get("t") ||
    searchParams.get("reset_token") ||
    "";
  const initialToken = (routeToken || queryToken || "").trim();
  const emailParam = (searchParams.get("email") || "").trim();

  // Mode: "reset" (set new password) or "forgot" (request fresh reset email)
  const [viewMode, setViewMode] = useState(initialToken ? "reset" : "reset");

  // Reset Password State
  const [token, setToken] = useState(initialToken);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Request Reset Link State (if token missing or expired)
  const [requestEmail, setRequestEmail] = useState(emailParam);
  const [isRequestingLink, setIsRequestingLink] = useState(false);
  const [requestLinkError, setRequestLinkError] = useState("");
  const [requestLinkSuccess, setRequestLinkSuccess] = useState(false);
  const [requestSuccessMessage, setRequestSuccessMessage] = useState("");

  // Sync token if URL parameter arrives/changes
  useEffect(() => {
    if (initialToken) {
      setToken(initialToken);
      setViewMode("reset");
    }
  }, [initialToken]);

  // Countdown timer for automatic redirect on success
  useEffect(() => {
    if (!isSuccess) return;
    const interval = setInterval(() => {
      setRedirectCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSuccess, navigate]);

  // Handle setting new password (POST /auth/reset-password)
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedToken = token.trim();
    if (!trimmedToken) {
      setErrorMsg("Reset token is required. Please check the link from your email.");
      return;
    }

    if (trimmedToken.length < 32) {
      setErrorMsg("Invalid reset token. Token must be at least 32 characters.");
      return;
    }

    if (!newPassword) {
      setErrorMsg("New password is required.");
      return;
    }

    if (newPassword.length < 12) {
      setErrorMsg("Password must be at least 12 characters long.");
      return;
    }

    if (newPassword.length > 256) {
      setErrorMsg("Password cannot exceed 256 characters.");
      return;
    }

    if (!confirmPassword) {
      setErrorMsg("Please confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/reset-password`,
        {
          token: trimmedToken,
          new_password: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const msg =
        response.data?.message ||
        "Password updated successfully. You can now log in with your new password.";
      setSuccessMessage(msg);
      setIsSuccess(true);
      setErrorMsg("");
    } catch (err) {
      console.error("Reset password error:", err);
      setErrorMsg(
        getApiErrorMessage(
          err,
          "Failed to reset password. The reset link may be invalid or expired. Please request a new link."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle requesting a new reset link (POST /auth/forgot-password)
  const handleRequestLinkSubmit = async (e) => {
    e.preventDefault();
    setRequestLinkError("");

    const trimmedEmail = requestEmail.trim();
    if (!trimmedEmail) {
      setRequestLinkError("Email address is required.");
      return;
    }

    if (!EMAIL_RE.test(trimmedEmail)) {
      setRequestLinkError("Please enter a valid email address (e.g. lead@hackfusion.in).");
      return;
    }

    setIsRequestingLink(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/forgot-password`,
        {
          email: trimmedEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const msg =
        response.data?.message ||
        "Password reset instructions have been sent to your email if an eligible account exists.";
      setRequestSuccessMessage(msg);
      setRequestLinkSuccess(true);
    } catch (err) {
      console.error("Forgot password request error:", err);
      setRequestLinkError(
        getApiErrorMessage(err, "Failed to send reset email. Please try again.")
      );
    } finally {
      setIsRequestingLink(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip font-['VT323',monospace] text-[#e8e8e8] text-[22px]">
      {/* Background Minecraft Scene */}
      <div
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* <img
          src={mcmain}
          alt="Minecraft Overworld Landscape"
          className="h-full w-full object-cover object-center"
        /> */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        <Navbar />

        <main className="relative mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-3 pt-24 pb-16 sm:px-6">
          {/* Brand Logo */}
          <header className="mb-6 flex flex-col items-center text-center">
            <Link to="/" aria-label="HackFusion Home">
              <img
                src={logo}
                alt="HackFusion"
                className="block h-auto w-48 sm:w-60 drop-shadow-[0_6px_0_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
              />
            </Link>
            <h1 className="sr-only">HackFusion Reset Password</h1>
          </header>

          {/* Minecraft Shell Card */}
          <div className="w-full bg-[#1c1c20]/95 border-4 border-black shadow-[inset_4px_4px_0_#5e5e5e,inset_-4px_-4px_0_#1a1a1a,0_12px_0_rgba(0,0,0,0.45)]">
            {/* Top Minecraft Grass Block Border Strip */}
            <div
              className="h-5 w-full border-b-4 border-black overflow-hidden flex flex-col"
              aria-hidden="true"
            >
              <div className="h-2.5 w-full bg-[#7fc944]" />
              <div className="h-2.5 w-full bg-[repeating-linear-gradient(90deg,#5ea231_0px,#5ea231_16px,#4e8d28_16px,#4e8d28_32px)]" />
            </div>

            <div className="p-5 sm:p-8">
              {/* Card Header Emblem */}
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
                  {isSuccess
                    ? "PASSWORD RESET"
                    : viewMode === "forgot"
                    ? "REQUEST RESET LINK"
                    : "SET NEW PASSWORD"}
                </h2>
              </div>

              {/* SUCCESS VIEW */}
              {isSuccess ? (
                <div className="space-y-5 text-center">
                  <div className="bg-[#0d2d14] border-[3px] border-[#32d246] text-[#9affaf] p-5 text-[21px] leading-relaxed shadow-[inset_2px_2px_0_#4fe265,inset_-2px_-2px_0_#1a5c28]">
                    <p className="font-['Press_Start_2P',monospace] text-[12px] text-[#55c038] mb-3 [text-shadow:1px_1px_0_#000]">
                      SUCCESS!
                    </p>
                    <p className="text-white text-[23px] font-bold mb-2">
                      {successMessage || "Password updated successfully!"}
                    </p>
                    <p className="text-[19px] text-[#C5C9BE]">
                      Your account password has been updated. You can now sign in with your new credentials.
                    </p>
                    <p className="mt-3 text-[18px] text-[#ffd56b] font-['Press_Start_2P',monospace] text-[10px]">
                      Redirecting to login in {redirectCountdown}s...
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
                </div>
              ) : viewMode === "forgot" ? (
                /* FORGOT PASSWORD (REQUEST NEW LINK) VIEW */
                <div>
                  {!requestLinkSuccess ? (
                    <form onSubmit={handleRequestLinkSubmit} className="space-y-5" noValidate>
                      <p className="text-center text-[20px] text-[#C5C9BE] leading-relaxed">
                        Enter your registered account email to receive a password reset link.
                      </p>

                      <div>
                        <label htmlFor="requestEmail" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                          Account Email
                        </label>
                        <div className="relative">
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
                            id="requestEmail"
                            name="requestEmail"
                            type="email"
                            autoComplete="email"
                            value={requestEmail}
                            onChange={(e) => {
                              setRequestEmail(e.target.value);
                              if (requestLinkError) setRequestLinkError("");
                            }}
                            placeholder="user@example.com"
                            className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-3 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                          />
                        </div>
                        {requestLinkError && (
                          <p
                            role="alert"
                            className="mt-2 bg-[#2d0d0d] border-[3px] border-[#d23232] text-[#ff9a9a] p-2 text-center text-[20px] leading-tight"
                          >
                            {requestLinkError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isRequestingLink}
                        className="inline-flex items-center justify-center gap-3 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] leading-relaxed text-white text-center py-4 px-5 min-h-[56px] border-[3px] border-black rounded-none bg-[#4fa22a] hover:bg-[#5bb832] active:translate-y-0.5 shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a] disabled:cursor-not-allowed disabled:text-[#8a8a8a] disabled:bg-[#4a4a4a] transition-colors"
                      >
                        {isRequestingLink ? "SENDING EMAIL..." : "SEND RESET LINK"}
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

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => setViewMode("reset")}
                          className="text-[#7fb8ff] hover:text-white underline text-[20px] cursor-pointer"
                        >
                          Already have a reset token? Enter it here
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-5 text-center">
                      <div className="bg-[#0d2d14] border-[3px] border-[#32d246] text-[#9affaf] p-5 text-[21px] leading-relaxed">
                        <p className="font-['Press_Start_2P',monospace] text-[11px] text-[#55c038] mb-2 [text-shadow:1px_1px_0_#000]">
                          INSTRUCTIONS DISPATCHED
                        </p>
                        <p className="mb-2 text-white">
                          {requestSuccessMessage}
                        </p>
                        <p className="text-[19px] text-[#C5C9BE]">
                          Check your email inbox (and spam folder) for the password reset link.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setRequestLinkSuccess(false);
                          setViewMode("reset");
                        }}
                        className="inline-flex items-center justify-center gap-2 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] py-4 px-4 bg-[#7847AB] hover:bg-[#8e58c9] text-white border-[3px] border-black shadow-[inset_2px_2px_0_#b589e6,inset_-2px_-2px_0_#4c2772] transition-colors"
                      >
                        ENTER RESET TOKEN
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* SET NEW PASSWORD (RESET PASSWORD) VIEW */
                <form onSubmit={handleResetPasswordSubmit} className="space-y-5" noValidate>
                  {/* Token Status / Field */}
                  {initialToken ? (
                    <div className="bg-[#151a17] border-2 border-black p-3 text-center text-[19px] text-[#F2C14E] shadow-[inset_2px_2px_0_#000]">
                      <span className="font-['Press_Start_2P',monospace] text-[9px] mr-2 text-[#55c038]">
                        [TOKEN DETECTED]
                      </span>
                      <span className="text-[#9a9a9a] truncate max-w-xs inline-block align-bottom font-mono text-[16px]">
                        {token.slice(0, 10)}...{token.slice(-8)}
                      </span>
                      {emailParam && (
                        <p className="text-[#C5C9BE] text-[18px] mt-1">
                          Account: <span className="text-white underline">{emailParam}</span>
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="token" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                        Reset Token *
                      </label>
                      <input
                        id="token"
                        name="token"
                        type="text"
                        value={token}
                        onChange={(e) => {
                          setToken(e.target.value);
                          if (errorMsg) setErrorMsg("");
                        }}
                        placeholder="Paste reset token from email"
                        className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-mono text-[16px] leading-snug py-2 px-3 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                      />
                      <p className="text-[#9a9a9a] text-[18px] mt-1">
                        Found in the password recovery email link.
                      </p>
                    </div>
                  )}

                  {/* New Password Field */}
                  <div>
                    <label htmlFor="newPassword" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                      New Password *
                    </label>
                    <div className="relative">
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
                          if (errorMsg) setErrorMsg("");
                        }}
                        placeholder="••••••••••••"
                        className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-24 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer font-['Press_Start_2P',monospace] text-[9px] text-white px-2.5 py-1.5 bg-[#7b7b7b] hover:bg-[#6b7bd1] border-[3px] border-black [text-shadow:2px_2px_0_#3b3b3b] shadow-[inset_2px_2px_0_#b9b9b9,inset_-2px_-2px_0_#4a4a4a] focus:outline-white focus:outline-2 active:translate-y-[calc(-50%+1px)] transition-colors"
                      >
                        {showNewPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-1.5 text-[#f1f1f1] text-[22px]">
                      Confirm New Password *
                    </label>
                    <div className="relative">
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
                          if (errorMsg) setErrorMsg("");
                        }}
                        placeholder="••••••••••••"
                        className="block w-full min-h-[50px] rounded-none bg-[#111] text-white font-['VT323',monospace] text-[23px] leading-snug py-2 pl-11 pr-24 border-[3px] border-black shadow-[inset_3px_3px_0_#000,inset_-3px_-3px_0_#505050] caret-[#55c038] placeholder-[#777] focus:outline-none focus:ring-2 focus:ring-[#55c038] transition-shadow"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer font-['Press_Start_2P',monospace] text-[9px] text-white px-2.5 py-1.5 bg-[#7b7b7b] hover:bg-[#6b7bd1] border-[3px] border-black [text-shadow:2px_2px_0_#3b3b3b] shadow-[inset_2px_2px_0_#b9b9b9,inset_-2px_-2px_0_#4a4a4a] focus:outline-white focus:outline-2 active:translate-y-[calc(-50%+1px)] transition-colors"
                      >
                        {showConfirmPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements Guidance Box */}
                  <div className="bg-[#151a17] border-2 border-black p-3 text-[19px] space-y-1 shadow-[inset_2px_2px_0_#000]">
                    <p className="font-['Press_Start_2P',monospace] text-[10px] text-[#F2C14E] mb-2 [text-shadow:1px_1px_0_#000]">
                      PASSWORD REQUIREMENTS:
                    </p>
                    <div
                      className={`flex items-center gap-2 ${
                        newPassword.length >= 12 ? "text-[#55c038]" : "text-[#9a9a9a]"
                      }`}
                    >
                      <span>{newPassword.length >= 12 ? "✔" : "■"}</span>
                      <span>At least 12 characters (required by server)</span>
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
                        /[\d\W_]/.test(newPassword) ? "text-[#55c038]" : "text-[#9a9a9a]"
                      }`}
                    >
                      <span>{/[\d\W_]/.test(newPassword) ? "✔" : "■"}</span>
                      <span>Contains numbers or special characters</span>
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

                  {/* Error Alert Box */}
                  {errorMsg && (
                    <div
                      role="alert"
                      className="bg-[#2d0d0d] border-[3px] border-[#d23232] text-[#ff9a9a] p-3 text-center text-[20px] leading-tight shadow-[inset_2px_2px_0_#501a1a]"
                    >
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-3 w-full cursor-pointer font-['Press_Start_2P',monospace] text-[11px] leading-relaxed text-white text-center py-4 px-5 min-h-[56px] border-[3px] border-black rounded-none bg-[#4fa22a] hover:bg-[#5bb832] active:translate-y-0.5 shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a] disabled:cursor-not-allowed disabled:text-[#8a8a8a] disabled:bg-[#4a4a4a] transition-colors"
                  >
                    {isSubmitting ? "UPDATING PASSWORD..." : "UPDATE PASSWORD"}
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
              )}

              {/* Navigation and Mode Switching Links */}
              <div className="mt-6 pt-5 border-t border-[#333] text-center space-y-2 text-[20px] text-[#9a9a9a]">
                {viewMode === "reset" ? (
                  <p>
                    Reset link expired or invalid?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMsg("");
                        setViewMode("forgot");
                      }}
                      className="text-[#7fb8ff] hover:text-white underline cursor-pointer"
                    >
                      Request a new link
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have a token?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setRequestLinkError("");
                        setViewMode("reset");
                      }}
                      className="text-[#7fb8ff] hover:text-white underline cursor-pointer"
                    >
                      Enter token & reset password
                    </button>
                  </p>
                )}

                <p>
                  Remember your credentials?{" "}
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

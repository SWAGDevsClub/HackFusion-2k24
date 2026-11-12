import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * A Minecraft-themed popup modal replacing browser alert() and confirm() dialogs.
 * 
 * Props:
 * - isOpen: boolean
 * - title: string (e.g. "SUCCESS", "NOTICE", "ERROR")
 * - message: string or ReactNode
 * - type: "success" | "error" | "warning" | "info"
 * - confirmText: string (default "OK")
 * - cancelText: string | null (optional, shows Cancel button if provided)
 * - onConfirm: () => void
 * - onCancel: () => void
 * - onClose: () => void
 */
export default function MinecraftModal({
  isOpen,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = null,
  onConfirm,
  onCancel,
  onClose,
}) {
  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (onCancel) onCancel();
        else if (onClose) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel, onClose]);

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    if (onClose) onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    if (onClose) onClose();
  };

  const getTheme = () => {
    switch (type) {
      case "success":
        return {
          bannerBg: "bg-[#4fa22a]",
          stripeBg: "bg-[repeating-linear-gradient(90deg,#5ea231_0px,#5ea231_16px,#4e8d28_16px,#4e8d28_32px)]",
          btnColor: "green",
          titleColor: "text-[#7dea2b]",
          badgeBg: "bg-[#0d2d14] border-[#32d246] text-[#9affaf]",
          icon: "✔",
        };
      case "error":
        return {
          bannerBg: "bg-[#c0392b]",
          stripeBg: "bg-[repeating-linear-gradient(90deg,#d63031_0px,#d63031_16px,#b71540_16px,#b71540_32px)]",
          btnColor: "red",
          titleColor: "text-[#ff6b6b]",
          badgeBg: "bg-[#2d0d0d] border-[#d23232] text-[#ff9a9a]",
          icon: "✖",
        };
      case "warning":
        return {
          bannerBg: "bg-[#c79a0a]",
          stripeBg: "bg-[repeating-linear-gradient(90deg,#f39c12_0px,#f39c12_16px,#d35400_16px,#d35400_32px)]",
          btnColor: "gold",
          titleColor: "text-[#f5cd47]",
          badgeBg: "bg-[#2b2307] border-[#f0b90b] text-[#ffe27a]",
          icon: "!",
        };
      default: // info
        return {
          bannerBg: "bg-[#2980b9]",
          stripeBg: "bg-[repeating-linear-gradient(90deg,#3498db_0px,#3498db_16px,#1f618d_16px,#1f618d_32px)]",
          btnColor: "green",
          titleColor: "text-[#5dade2]",
          badgeBg: "bg-[#0c2438] border-[#2980b9] text-[#aed6f1]",
          icon: "ℹ",
        };
    }
  };

  const theme = getTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 p-4 font-['VT323',monospace] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
        >
          <motion.div
            className="relative w-full max-w-lg bg-[#1c1c20] border-4 border-black shadow-[inset_4px_4px_0_#5e5e5e,inset_-4px_-4px_0_#1a1a1a,0_16px_0_rgba(0,0,0,0.6)] overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
          >
            {/* Top Minecraft Block Strip */}
            <div className="h-4 w-full border-b-4 border-black overflow-hidden flex flex-col" aria-hidden="true">
              <div className={`h-2 w-full ${theme.bannerBg}`} />
              <div className={`h-2 w-full ${theme.stripeBg}`} />
            </div>

            <div className="p-5 sm:p-6">
              {/* Header */}
              <div className="mb-4 flex items-center gap-3 border-b-2 border-black/60 pb-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-[#111] font-['Press_Start_2P',monospace] text-xs text-white shadow-[inset_2px_2px_0_#333]"
                  style={{ textShadow: "1px 1px 0 #000" }}
                  aria-hidden="true"
                >
                  {theme.icon}
                </span>
                <h3
                  className={`font-['Press_Start_2P',monospace] text-xs sm:text-sm tracking-wide ${theme.titleColor}`}
                  style={{ textShadow: "2px 2px 0 #000" }}
                >
                  {title || "ALERT"}
                </h3>
              </div>

              {/* Message Content */}
              <div className="mb-6 max-h-[60vh] overflow-y-auto pr-1">
                <p className="text-[22px] sm:text-[24px] leading-relaxed text-[#e8e8e8] whitespace-pre-wrap">
                  {message}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t-2 border-black/40">
                {cancelText && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="font-['Press_Start_2P',monospace] text-[10px] sm:text-[11px] leading-none text-white py-3.5 px-5 bg-[#4a4a4a] hover:bg-[#5a5a5a] active:translate-y-0.5 border-3 border-black shadow-[inset_2px_2px_0_#7a7a7a,inset_-2px_-2px_0_#222] transition-colors cursor-pointer"
                    style={{ textShadow: "1px 1px 0 #000" }}
                  >
                    {cancelText}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleConfirm}
                  autoFocus
                  className={`font-['Press_Start_2P',monospace] text-[10px] sm:text-[11px] leading-none text-white py-3.5 px-6 active:translate-y-0.5 border-3 border-black transition-colors cursor-pointer ${
                    theme.btnColor === "green"
                      ? "bg-[#4fa22a] hover:bg-[#5bb832] shadow-[inset_3px_3px_0_#8fe05f,inset_-3px_-3px_0_#2e6a14] [text-shadow:2px_2px_0_#1d4a0a]"
                      : theme.btnColor === "red"
                      ? "bg-[#c0392b] hover:bg-[#d63031] shadow-[inset_3px_3px_0_#e74c3c,inset_-3px_-3px_0_#782117] [text-shadow:2px_2px_0_#3a0d08]"
                      : "bg-[#c79a0a] hover:bg-[#f39c12] shadow-[inset_3px_3px_0_#f5cd47,inset_-3px_-3px_0_#6e5405] [text-shadow:2px_2px_0_#3a2b02]"
                  }`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

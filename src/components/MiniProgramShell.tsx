"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, X, Share2, Star, Flag } from "lucide-react";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  appName: string;
  appEmoji: string;
  accentColor?: string;
}

export default function MiniProgramShell({ children, appName, appEmoji, accentColor = "#1E3932" }: Props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col" style={{ minHeight: "100svh", background: "#F2F0EB" }}>

      {/* ── WeChat-style mini program chrome ── */}
      <div style={{ background: accentColor }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 pt-12 pb-2">
          <button onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}>
            <ChevronLeft size={17} className="text-white" />
          </button>

          {/* App identity */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm leading-none">{appEmoji}</span>
            <span className="text-white text-sm font-bold">{appName}</span>
          </div>

          {/* Capsule [···|×] — WeChat's signature element */}
          <div className="flex items-center rounded-full overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }}>
            <button onClick={() => setShowMenu(true)}
              className="flex items-center justify-center w-9 h-7 border-r"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              <MoreHorizontal size={14} className="text-white" />
            </button>
            <button onClick={() => router.push("/")}
              className="flex items-center justify-center w-8 h-7">
              <X size={13} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mini program label strip */}
        <div className="flex items-center justify-center gap-1.5 pb-1.5">
          <div className="w-3 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
          <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Mini Program
          </span>
          <div className="w-3 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Menu bottom sheet */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowMenu(false)}>
          <div className="w-full max-w-sm mx-auto rounded-t-3xl overflow-hidden slide-up"
            style={{ background: "#1A0D35" }}
            onClick={e => e.stopPropagation()}>
            <div className="w-8 h-1 rounded-full mx-auto mt-3 mb-4" style={{ background: "rgba(255,255,255,0.15)" }} />

            {/* App info */}
            <div className="flex items-center gap-3 px-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: accentColor }}>
                {appEmoji}
              </div>
              <div>
                <p className="text-white font-bold">{appName}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Mini Program</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 px-5 py-5">
              {[
                { icon: <Share2 size={20} className="text-white" />, label: "แชร์" },
                { icon: <Star size={20} className="text-white" />, label: "บันทึก" },
                { icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="white" strokeWidth="1.5"/><path d="M10 6v4l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>, label: "ล่าสุด" },
                { icon: <Flag size={20} className="text-white" />, label: "รายงาน" },
              ].map((a, i) => (
                <button key={i} className="flex flex-col items-center gap-2" onClick={() => setShowMenu(false)}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.07)" }}>
                    {a.icon}
                  </div>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{a.label}</span>
                </button>
              ))}
            </div>

            <div className="px-5 pb-8">
              <button onClick={() => { setShowMenu(false); router.push("/"); }}
                className="w-full py-3.5 rounded-2xl text-sm font-bold"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>
                ออกจาก Mini Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

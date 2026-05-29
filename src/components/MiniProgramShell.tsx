"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, X, Share2 } from "lucide-react";
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
    <div className="flex flex-col min-h-screen">
      {/* ── WeChat-style mini program top bar ── */}
      <div className="relative flex items-center justify-between px-4 pt-12 pb-2"
        style={{ background: accentColor, zIndex: 50 }}>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center rounded-full"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <ChevronLeft size={18} className="text-white" />
        </button>

        {/* App identity */}
        <div className="flex items-center gap-1.5">
          <span className="text-base leading-none">{appEmoji}</span>
          <span className="text-white text-sm font-semibold">{appName}</span>
          <span className="text-white/40 text-xs ml-0.5">小程序</span>
        </div>

        {/* WeChat capsule button [···|×] */}
        <div className="flex items-center rounded-full overflow-hidden border"
          style={{ borderColor: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.1)" }}>
          <button
            onClick={() => setShowMenu(true)}
            className="flex items-center justify-center px-2.5 py-1.5 border-r"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}>
            <MoreHorizontal size={15} className="text-white" />
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center px-2.5 py-1.5">
            <X size={15} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mini program badge strip */}
      <div className="flex items-center justify-center gap-1 py-1"
        style={{ background: accentColor, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-1 h-1 rounded-full bg-white/40" />
        <span className="text-white/40 text-xs tracking-wide">Mini Program</span>
        <div className="w-1 h-1 rounded-full bg-white/40" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Menu sheet */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowMenu(false)}>
          <div className="w-full max-w-sm mx-auto rounded-t-3xl bg-white p-5 slide-up"
            onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-5" />
            <div className="grid grid-cols-4 gap-4 mb-5">
              {[
                { icon: <Share2 size={20} />, label: "แชร์" },
                { icon: "⭐", label: "Favourite" },
                { icon: "🔍", label: "ค้นหา" },
                { icon: "💬", label: "แจ้งปัญหา" },
              ].map((a, i) => (
                <button key={i} className="flex flex-col items-center gap-2" onClick={() => setShowMenu(false)}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "#F2F0EB", color: accentColor }}>
                    {typeof a.icon === "string" ? a.icon : a.icon}
                  </div>
                  <span className="text-xs text-gray-500">{a.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowMenu(false)}
              className="w-full py-3 rounded-2xl text-sm font-bold text-gray-500"
              style={{ background: "#F2F0EB" }}>
              ยกเลิก
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

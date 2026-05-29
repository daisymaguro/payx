"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Home, RefreshCw } from "lucide-react";
import MiniProgramShell from "@/components/MiniProgramShell";

export default function SuccessPage() {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const [show, setShow] = useState(false);
  const [estimatedTime] = useState(Math.floor(Math.random() * 5) + 5);
  const orderId = state.orderId || "SB" + Date.now().toString().slice(-6);
  const starsEarned = 28;

  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  const steps = [
    { icon: "✅", label: "รับออเดอร์แล้ว", done: true, time: "เมื่อกี้" },
    { icon: "👨‍🍳", label: "กำลังเตรียมเครื่องดื่ม", done: true, time: "กำลังทำ" },
    { icon: "🔔", label: "เรียกรับที่เคาน์เตอร์", done: false, time: `~${estimatedTime} นาที` },
  ];

  return (
    <MiniProgramShell appName="Starbucks" appEmoji="☕" accentColor="#1E3932">
      <div style={{ background: "#F2F0EB", minHeight: "100%" }}>

        {/* Green hero */}
        <div className="relative overflow-hidden px-5 pt-6 pb-24"
          style={{ background: "linear-gradient(155deg, #1E3932 0%, #006241 55%, #00704A 100%)" }}>
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #CBA258, transparent)" }} />
          <div className="flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-700 ${show ? "pop-in" : "scale-0 opacity-0"}`}
              style={{ background: "linear-gradient(135deg, #CBA258, #F1D592)", boxShadow: "0 0 32px rgba(203,162,88,0.4)" }}>
              <svg width="38" height="38" viewBox="0 0 44 44" fill="none">
                <path d="M10 22L18 30L34 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="text-white text-xl font-black">ชำระเงินสำเร็จ!</h1>
            <p className="text-white/50 text-sm mt-1">ออเดอร์ได้รับการยืนยันแล้ว</p>
          </div>
        </div>

        <div className="px-4 -mt-12 relative z-10 space-y-3 pb-28">

          {/* Order card */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 4px 20px rgba(30,57,50,0.12)" }}>
            <div className="flex items-center justify-between mb-4 pb-4"
              style={{ borderBottom: "2px dashed #D4E9E2" }}>
              <div>
                <p className="text-xs font-medium" style={{ color: "#006241" }}>ORDER ID</p>
                <p className="font-black text-2xl tracking-widest" style={{ color: "#1E3932" }}>{orderId}</p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: "#DCFCE7", color: "#16A34A" }}>✓ Confirmed</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "☕", label: "ร้าน", value: "Starbucks" },
                { emoji: "📍", label: "สาขา", value: "สยาม พารากอน" },
                { emoji: "⏱️", label: "รอรับ", value: `~${estimatedTime} นาที` },
              ].map((info, i) => (
                <div key={i} className="rounded-xl p-3 text-center"
                  style={{ background: i === 0 ? "#D4E9E2" : i === 1 ? "#F2F0EB" : "#FFF7E6" }}>
                  <p className="text-xl mb-1">{info.emoji}</p>
                  <p className="text-xs text-gray-400">{info.label}</p>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
            <p className="font-bold text-xs uppercase tracking-wide mb-4" style={{ color: "#006241" }}>สถานะออเดอร์</p>
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: step.done ? "#D4E9E2" : "#F9F9F7" }}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${step.done ? "text-gray-800" : "text-gray-400"}`}>{step.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: step.done ? "#006241" : "#9CA3AF" }}>{step.time}</p>
                  </div>
                  {step.done && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#00704A" }}>
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PointX Stars earned */}
          <div className={`bg-white rounded-2xl p-4 ${show ? "stars-pop" : "opacity-0"}`}
            style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⭐</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm">คุณได้รับ PointX Stars!</p>
                <p className="text-gray-400 text-xs mt-0.5">บันทึกลง PayX Rewards แล้ว</p>
              </div>
              <span className="font-black text-2xl" style={{ color: "#CBA258" }}>+{starsEarned}</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F2F0EB" }}>
              <div className="h-full rounded-full"
                style={{ width: "92%", background: "linear-gradient(90deg, #CBA258, #F1D592)" }} />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">368 / 400 Stars → รับเครื่องดื่มฟรี</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white px-4 py-5"
          style={{ borderTop: "1px solid #D4E9E2" }}>
          <div className="flex gap-3">
            <button onClick={() => { dispatch({ type: "CLEAR_CART" }); router.push("/"); }}
              className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 text-white rounded-2xl py-4 font-bold"
              style={{ background: "linear-gradient(135deg, #1E3932, #006241)", boxShadow: "0 6px 20px rgba(30,57,50,0.3)" }}>
              <div className="shimmer absolute inset-0 rounded-2xl" />
              <Home size={17} className="relative" />
              <span className="relative">กลับ PayX</span>
            </button>
            <button onClick={() => { dispatch({ type: "CLEAR_CART" }); router.push("/scan"); }}
              className="flex items-center justify-center gap-2 rounded-2xl py-4 px-5 font-bold text-sm"
              style={{ background: "#D4E9E2", color: "#006241" }}>
              <RefreshCw size={17} />
              สั่งอีก
            </button>
          </div>
        </div>

        {show && (
          <div className="fixed top-0 left-0 right-0 pointer-events-none flex justify-around px-6">
            {["⭐","✨","☕","🌟","🎉","💚"].map((e, i) => (
              <span key={i} className="text-xl"
                style={{ animation: `confettiDrop ${1.2 + i * 0.25}s ease-out ${i * 0.15}s both` }}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>
    </MiniProgramShell>
  );
}

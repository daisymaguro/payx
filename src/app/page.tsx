"use client";

import Link from "next/link";
import { QrCode, Bell, Send, CreditCard, ChevronRight, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const recentTx = [
    { emoji: "☕", name: "Starbucks", amount: -185, time: "เมื่อวาน", cat: "Mini Program" },
    { emoji: "🍜", name: "MK Restaurants", amount: -420, time: "2 วันก่อน", cat: "Mini Program" },
    { emoji: "💜", name: "เติมเงิน PayX", amount: +1000, time: "3 วันก่อน", cat: "Top Up" },
  ];

  const miniPrograms = [
    { emoji: "☕", name: "Starbucks", href: "/scan", color: "#1E3932", active: true },
    { emoji: "🍜", name: "MK", href: "#", color: "#C41E3A", active: false },
    { emoji: "🍕", name: "Pizza Hut", href: "#", color: "#D32F2F", active: false },
    { emoji: "🛒", name: "Lotus's", href: "#", color: "#1976D2", active: false },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ background: "#f4f2f8" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(155deg, #1E0A52 0%, #4B1FA8 55%, #6D3EC7 100%)" }}
        className="relative overflow-hidden px-5 pt-14 pb-24">
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent)" }} />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #A78BFA, transparent)" }} />

        <div className="relative flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#C9A84C" }}>
              <span className="font-black text-white text-sm">P</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight">
              Pay<span style={{ color: "#C9A84C" }}>X</span>
            </span>
          </div>
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <Bell size={20} className="text-white/80" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#C9A84C" }} />
          </button>
        </div>

        <p className="relative text-purple-200 text-sm mb-0.5">สวัสดี, คุณเจมส์</p>
        <p className="relative text-white/50 text-xs mb-4">
          {new Date().toLocaleDateString("th-TH", { weekday: "long", day: "numeric", month: "long" })}
        </p>

        <div className="relative">
          <p className="text-purple-300 text-xs uppercase tracking-widest mb-1 font-medium">PayX Balance</p>
          <div className="flex items-end gap-2">
            <span className="text-white text-4xl font-black tracking-tight">2,500</span>
            <span className="text-purple-300 text-lg font-semibold mb-0.5">THB</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp size={12} style={{ color: "#C9A84C" }} />
            <span className="text-xs" style={{ color: "#C9A84C" }}>+฿500 จากเดือนที่แล้ว</span>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 grid grid-cols-4 gap-2"
          style={{ boxShadow: "0 8px 32px rgba(75,31,168,0.15)" }}>
          {[
            { icon: <QrCode size={20} />, label: "สแกน QR", href: "/scan", primary: true },
            { icon: <Send size={20} />, label: "โอนเงิน", href: "#" },
            { icon: <CreditCard size={20} />, label: "เติมเงิน", href: "#" },
            { icon: <span className="text-lg font-bold">⋯</span>, label: "เพิ่มเติม", href: "#" },
          ].map((a, i) => (
            <Link key={i} href={a.href}
              className="flex flex-col items-center gap-2 py-2 active:scale-95 transition-transform">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: a.primary ? "#4B1FA8" : "#EDE8F9", color: a.primary ? "white" : "#4B1FA8" }}>
                {a.icon}
              </div>
              <span className="text-xs font-medium text-gray-600">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mini Programs ── */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">Mini Programs</h3>
          <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#4B1FA8" }}>
            ทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="bg-white rounded-2xl p-4 grid grid-cols-4 gap-3"
          style={{ boxShadow: "0 2px 12px rgba(75,31,168,0.06)" }}>
          {miniPrograms.map((mp) => (
            <Link key={mp.name} href={mp.href}
              className="flex flex-col items-center gap-1.5 active:scale-95 transition-transform">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl relative"
                style={{ background: mp.active ? mp.color : "#F3F4F6" }}>
                <span className={mp.active ? "" : "opacity-40"}>{mp.emoji}</span>
                {!mp.active && (
                  <div className="absolute inset-0 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.04)" }} />
                )}
              </div>
              <span className="text-xs text-gray-500 font-medium text-center leading-tight">{mp.name}</span>
            </Link>
          ))}
        </div>
        {/* Starbucks hint */}
        <Link href="/scan">
          <div className="mt-3 rounded-xl px-4 py-3 flex items-center gap-3 active:scale-98 transition-transform"
            style={{ background: "linear-gradient(125deg, #1E3932, #00704A)" }}>
            <span className="text-2xl">☕</span>
            <div className="flex-1">
              <p className="text-white font-bold text-sm">Starbucks Mini Program</p>
              <p className="text-white/60 text-xs">สแกน QR ที่ร้านเพื่อสั่งและจ่าย</p>
            </div>
            <div className="flex items-center gap-1" style={{ color: "#CBA258" }}>
              <QrCode size={14} />
              <span className="text-xs font-semibold">สแกน</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="px-4 mt-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-sm">รายการล่าสุด</h3>
          <button className="flex items-center gap-1 text-xs font-medium" style={{ color: "#4B1FA8" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(75,31,168,0.06)" }}>
          {recentTx.map((tx, i) => (
            <div key={i}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < recentTx.length - 1 ? "border-b border-gray-50" : ""}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "#EDE8F9" }}>
                {tx.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{tx.name}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={9} /> {tx.cat} · {tx.time}
                </p>
              </div>
              <span className={`text-sm font-bold ${tx.amount > 0 ? "" : "text-gray-700"}`}
                style={tx.amount > 0 ? { color: "#C9A84C" } : {}}>
                {tx.amount > 0 ? "+" : ""}฿{Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-2 py-2 flex justify-around z-30">
        {[
          { icon: "🏠", label: "หน้าหลัก", active: true },
          { icon: "💳", label: "บัตร", active: false },
          { icon: "📊", label: "รายงาน", active: false },
          { icon: "👤", label: "โปรไฟล์", active: false },
        ].map((n) => (
          <button key={n.label} className="flex flex-col items-center gap-0.5 px-3 py-1">
            <span className="text-xl">{n.icon}</span>
            <span className="text-xs font-medium"
              style={{ color: n.active ? "#4B1FA8" : "#9CA3AF" }}>
              {n.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

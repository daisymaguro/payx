"use client";

import Link from "next/link";
import { ChevronRight, Bell, Scan, ArrowUpRight, ArrowDownLeft, Plus, Clock } from "lucide-react";

function IconWallet() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="7" width="22" height="15" rx="3" fill="#7C3AED"/>
      <rect x="2" y="7" width="22" height="5" rx="1" fill="#9333EA"/>
      <circle cx="18" cy="16.5" r="2.5" fill="#C084FC"/>
      <rect x="2" y="4" width="13" height="4" rx="2" fill="#6D28D9"/>
    </svg>
  );
}
function IconQR() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#7C3AED"/>
      <rect x="3.5" y="3.5" width="4" height="4" rx="0.5" fill="white"/>
      <rect x="13" y="2" width="7" height="7" rx="1.5" fill="#7C3AED"/>
      <rect x="14.5" y="3.5" width="4" height="4" rx="0.5" fill="white"/>
      <rect x="2" y="13" width="7" height="7" rx="1.5" fill="#7C3AED"/>
      <rect x="3.5" y="14.5" width="4" height="4" rx="0.5" fill="white"/>
      <rect x="13" y="13" width="3" height="3" rx="0.5" fill="#A855F7"/>
      <rect x="17" y="13" width="3" height="3" rx="0.5" fill="#A855F7"/>
      <rect x="13" y="17" width="3" height="3" rx="0.5" fill="#A855F7"/>
      <rect x="17" y="17" width="3" height="3" rx="0.5" fill="#A855F7"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" fill="#EDE9FE"/>
      <path d="M7 11h8M13 8l3 3-3 3" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTopup() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="9" fill="#EDE9FE"/>
      <rect x="10" y="6" width="2" height="7" rx="1" fill="#7C3AED"/>
      <path d="M8 10l3-4 3 4" fill="#7C3AED"/>
      <rect x="6" y="15" width="10" height="1.5" rx="0.75" fill="#A855F7"/>
    </svg>
  );
}

const miniPrograms = [
  { emoji: "☕", name: "Starbucks", href: "/scan", color: "#00704A", bg: "#DCFCE7", active: true  },
  { emoji: "🍜", name: "MK",        href: "#",     color: "#C41E3A", bg: "#FEE2E2", active: false },
  { emoji: "🍕", name: "Pizza Hut", href: "#",     color: "#C8181A", bg: "#FEE2E2", active: false },
  { emoji: "✈️", name: "Thai Air",  href: "#",     color: "#4B0082", bg: "#EDE9FE", active: false },
];

const recentTx = [
  { emoji: "☕", name: "Starbucks",    amount: -185,  time: "เมื่อวาน",   cat: "Mini Program", color: "#00704A", bg: "#DCFCE7" },
  { emoji: "🍜", name: "MK",           amount: -420,  time: "2 วันก่อน", cat: "Mini Program", color: "#C41E3A", bg: "#FEE2E2" },
  { emoji: "💜", name: "เติมเงิน PayX", amount: +1000, time: "4 วันก่อน", cat: "Top Up",       color: "#7C3AED", bg: "#EDE9FE" },
];

export default function Home() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col pb-24" style={{ background: "#F5F0FF", minHeight: "100svh" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-5">
        <div>
          <p className="text-xs font-medium" style={{ color: "#9CA3AF" }}>{greeting}</p>
          <h1 className="font-black text-2xl tracking-tight" style={{ color: "#1A0A3D" }}>คุณเจมส์</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "white", boxShadow: "0 2px 8px rgba(124,58,237,0.12)" }}>
            <Bell size={18} style={{ color: "#7C3AED" }} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "#A855F7" }} />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
            เจ
          </div>
        </div>
      </div>

      {/* ── Balance Card ── */}
      <div className="mx-4 rounded-3xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #9333EA 100%)", boxShadow: "0 12px 40px rgba(124,58,237,0.35)" }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #C084FC, transparent)" }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white, transparent)" }} />

        <div className="relative flex items-start justify-between mb-4">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">PayX Wallet</p>
            <p className="text-white text-4xl font-black tracking-tight mt-1">฿2,500</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
              <span className="text-white/50 text-xs">**** **** 9204</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}>
            <IconWallet />
          </div>
        </div>

        <div className="relative flex gap-2">
          {[
            { icon: <Scan size={14} />, label: "สแกนจ่าย", href: "/scan" },
            { icon: <ArrowUpRight size={14} />, label: "โอน", href: "#" },
            { icon: <Plus size={14} />, label: "เติม", href: "#" },
          ].map((a, i) => (
            <Link key={i} href={a.href} className="flex-1">
              <div className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-xs text-white"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                {a.icon}{a.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Pill chips ── */}
      <div className="flex gap-2 px-4 mt-5 overflow-x-auto pb-1">
        {[
          { icon: <IconQR />, label: "สแกน QR", href: "/scan", active: true },
          { icon: <IconSend />, label: "โอนเงิน", href: "#" },
          { icon: <IconTopup />, label: "เติมเงิน", href: "#" },
          { label: "HistoryX", href: "#" },
          { label: "PointX",   href: "#" },
        ].map((a, i) => (
          <Link key={i} href={a.href}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm transition-all active:scale-95"
            style={a.active
              ? { background: "#7C3AED", color: "white", boxShadow: "0 4px 12px rgba(124,58,237,0.3)" }
              : { background: "white", color: "#6B7280", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            {a.icon && a.icon}
            {a.label}
          </Link>
        ))}
      </div>

      {/* ── Mini Programs ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-lg" style={{ color: "#1A0A3D" }}>Mini Programs</h2>
          <button className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: "#7C3AED" }}>
            ทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {miniPrograms.map((mp) => (
            <Link key={mp.name} href={mp.href}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl active:scale-95 transition-transform"
              style={{
                background: mp.active ? mp.bg : "white",
                boxShadow: mp.active
                  ? `0 4px 16px ${mp.color}20`
                  : "0 1px 4px rgba(0,0,0,0.05)",
                border: mp.active ? `1.5px solid ${mp.color}30` : "1.5px solid transparent",
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: mp.active ? mp.color + "20" : "#F5F0FF" }}>
                {mp.emoji}
              </div>
              <span className="font-bold text-sm" style={{ color: mp.active ? "#1A0A3D" : "#9CA3AF" }}>
                {mp.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Featured Banner ── */}
      <div className="px-4 mt-5">
        <Link href="/scan">
          <div className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: "linear-gradient(125deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.15)", boxShadow: "0 4px 16px rgba(124,58,237,0.08)" }}>
            <div className="absolute top-0 right-0 w-28 h-28 opacity-30"
              style={{ background: "radial-gradient(circle at top right, #A855F7, transparent)" }} />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-2"
                  style={{ background: "rgba(124,58,237,0.12)", color: "#7C3AED" }}>
                  ✦ แนะนำสำหรับคุณ
                </span>
                <p className="font-black text-lg" style={{ color: "#1A0A3D" }}>Starbucks</p>
                <p className="text-sm mt-0.5" style={{ color: "#9CA3AF" }}>สยาม พารากอน · โต๊ะ 12</p>
                <div className="mt-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "#7C3AED" }}>
                    <Scan size={12} className="text-white" />
                    <span className="text-white text-xs font-bold">เปิด Mini Program</span>
                  </div>
                </div>
              </div>
              <span className="text-6xl">☕</span>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-lg" style={{ color: "#1A0A3D" }}>รายการล่าสุด</h2>
          <button className="flex items-center gap-0.5 text-xs font-semibold" style={{ color: "#7C3AED" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 2px 12px rgba(124,58,237,0.06)" }}>
          {recentTx.map((tx, i) => (
            <div key={i}
              className={`flex items-center gap-3 px-4 py-3.5 ${i < recentTx.length - 1 ? "border-b" : ""}`}
              style={{ borderColor: "#F5F0FF" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: tx.bg }}>
                {tx.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: "#1A0A3D" }}>{tx.name}</p>
                <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: "#9CA3AF" }}>
                  <Clock size={9} /> {tx.cat} · {tx.time}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm font-black"
                  style={{ color: tx.amount > 0 ? "#7C3AED" : "#1A0A3D" }}>
                  {tx.amount > 0 ? "+" : ""}฿{Math.abs(tx.amount).toLocaleString()}
                </span>
                {tx.amount > 0
                  ? <ArrowDownLeft size={11} style={{ color: "#A855F7" }} />
                  : <ArrowUpRight size={11} style={{ color: "#D1D5DB" }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm z-30"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(124,58,237,0.08)" }}>
        <div className="flex justify-around px-2 py-3">
          {[
            { svg: <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H14v-5H8v5H4a1 1 0 01-1-1V9.5z" fill="currentColor"/>, label: "Home",    active: true  },
            { svg: <><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M15.5 15.5L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, label: "ค้นหา",  active: false },
            { svg: <><rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 9h8M7 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, label: "คลัง",   active: false },
            { svg: <><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 19c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>, label: "โปรไฟล์", active: false },
          ].map((n) => (
            <button key={n.label} className="flex flex-col items-center gap-1 px-3 py-1">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                style={{ color: n.active ? "#7C3AED" : "#D1D5DB" }}>
                {n.svg}
              </svg>
              <span className="text-xs font-semibold"
                style={{ color: n.active ? "#7C3AED" : "#9CA3AF" }}>
                {n.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

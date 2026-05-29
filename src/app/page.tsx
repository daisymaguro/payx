"use client";

import Link from "next/link";
import { ChevronRight, Bell, Scan, ArrowUpRight, ArrowDownLeft, Plus, Clock } from "lucide-react";

/* ── Flaticon-style SVG icon components ── */
function IconWallet() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2" y="7" width="22" height="15" rx="3" fill="#7C3AED"/>
      <rect x="2" y="7" width="22" height="4" rx="1" fill="#A855F7"/>
      <circle cx="18" cy="16" r="2.5" fill="#C084FC"/>
      <rect x="2" y="4" width="14" height="4" rx="2" fill="#6D28D9"/>
    </svg>
  );
}
function IconQR() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#A855F7"/>
      <rect x="5" y="5" width="4" height="4" rx="0.5" fill="#0D0520"/>
      <rect x="15" y="3" width="8" height="8" rx="1.5" fill="#A855F7"/>
      <rect x="17" y="5" width="4" height="4" rx="0.5" fill="#0D0520"/>
      <rect x="3" y="15" width="8" height="8" rx="1.5" fill="#A855F7"/>
      <rect x="5" y="17" width="4" height="4" rx="0.5" fill="#0D0520"/>
      <rect x="15" y="15" width="3" height="3" rx="0.5" fill="#7C3AED"/>
      <rect x="20" y="15" width="3" height="3" rx="0.5" fill="#7C3AED"/>
      <rect x="15" y="20" width="3" height="3" rx="0.5" fill="#7C3AED"/>
      <rect x="20" y="20" width="3" height="3" rx="0.5" fill="#7C3AED"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11" fill="#6D28D9"/>
      <path d="M8 13h10M14 9l4 4-4 4" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconTopup() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="11" fill="#4C1D95"/>
      <rect x="12" y="7" width="2" height="8" rx="1" fill="#C084FC"/>
      <path d="M9 12l4-5 4 5" fill="#C084FC"/>
      <rect x="7" y="17" width="12" height="2" rx="1" fill="#A855F7"/>
    </svg>
  );
}

const miniPrograms = [
  { emoji: "☕", name: "Starbucks", href: "/scan",  color: "#00704A", bg: "#0D2B1E", active: true  },
  { emoji: "🍜", name: "MK",        href: "#",       color: "#C41E3A", bg: "#2B0D0D", active: false },
  { emoji: "🛒", name: "Lotus's",   href: "#",       color: "#1976D2", bg: "#0D1B2B", active: false },
  { emoji: "🍕", name: "Pizza Hut", href: "#",       color: "#C8181A", bg: "#2B0D0E", active: false },
  { emoji: "✈️", name: "Thai Air",  href: "#",       color: "#4B0082", bg: "#1A0D2B", active: false },
  { emoji: "🏪", name: "7-Eleven",  href: "#",       color: "#E8611A", bg: "#2B1A0D", active: false },
];

const recentTx = [
  { emoji: "☕", name: "Starbucks",    amount: -185, time: "เมื่อวาน",    cat: "Mini Program",  color: "#00704A" },
  { emoji: "🍜", name: "MK",           amount: -420, time: "2 วันก่อน",  cat: "Mini Program",  color: "#C41E3A" },
  { emoji: "💜", name: "เติมเงิน PayX", amount: +1000, time: "4 วันก่อน", cat: "Top Up",        color: "#7C3AED" },
];

export default function Home() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col pb-24" style={{ background: "#0D0520", minHeight: "100svh" }}>

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <div>
          <p className="text-white/50 text-xs font-medium">{greeting}</p>
          <h1 className="text-white font-black text-2xl tracking-tight">คุณเจมส์</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(168,85,247,0.12)" }}>
            <Bell size={18} className="text-white/70" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#A855F7" }} />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
            style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}>
            เจ
          </div>
        </div>
      </div>

      {/* ── Balance Card ── */}
      <div className="mx-4 rounded-3xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #3B0764 0%, #6D28D9 50%, #7C3AED 100%)" }}>
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #C084FC, transparent)" }} />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #4C1D95, transparent)" }} />

        <div className="relative flex items-start justify-between mb-4">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest font-semibold">PayX Wallet</p>
            <p className="text-white text-4xl font-black tracking-tight mt-1">฿2,500</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/60">**** **** 9204</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.12)" }}>
            <IconWallet />
          </div>
        </div>

        <div className="relative flex gap-2">
          <Link href="/scan" className="flex-1">
            <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white"
              style={{ background: "rgba(255,255,255,0.15)" }}>
              <Scan size={15} />
              สแกนจ่าย
            </div>
          </Link>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowUpRight size={15} />
            โอนเงิน
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <Plus size={15} />
            เติมเงิน
          </button>
        </div>
      </div>

      {/* ── Quick Actions (Spotify pill row) ── */}
      <div className="flex gap-2 px-4 mt-5 overflow-x-auto pb-1">
        {[
          { icon: <IconQR />, label: "สแกน QR", href: "/scan", active: true },
          { icon: <IconSend />, label: "โอนเงิน", href: "#" },
          { icon: <IconTopup />, label: "เติมเงิน", href: "#" },
          { label: "HistoryX", href: "#", plain: true },
          { label: "PointX", href: "#", plain: true },
        ].map((a, i) => (
          <Link key={i} href={a.href}
            className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all active:scale-95"
            style={a.active
              ? { background: "#7C3AED", color: "white" }
              : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
            {!a.plain && a.icon}
            {a.label}
          </Link>
        ))}
      </div>

      {/* ── Mini Programs (Spotify 2-col grid) ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-black text-lg">Mini Programs</h2>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#A855F7" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {miniPrograms.map((mp) => (
            <Link key={mp.name} href={mp.href}
              className="flex items-center gap-3 px-3 py-3 rounded-2xl active:scale-95 transition-transform"
              style={{ background: mp.active ? mp.bg : "rgba(255,255,255,0.05)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: mp.active ? mp.color + "30" : "rgba(255,255,255,0.06)" }}>
                {mp.emoji}
              </div>
              <span className="font-bold text-sm" style={{ color: mp.active ? "white" : "rgba(255,255,255,0.45)" }}>
                {mp.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Featured Banner (Spotify-style large card) ── */}
      <div className="px-4 mt-6">
        <Link href="/scan">
          <div className="relative overflow-hidden rounded-2xl p-5"
            style={{ background: "linear-gradient(125deg, #1A0D35 0%, #3B0764 100%)", border: "1px solid rgba(168,85,247,0.2)" }}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20"
              style={{ background: "radial-gradient(circle at top right, #A855F7, transparent)" }} />
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3 inline-block"
                  style={{ background: "rgba(168,85,247,0.2)", color: "#C084FC" }}>
                  ✦ แนะนำสำหรับคุณ
                </span>
                <p className="text-white font-black text-lg mt-1">Starbucks</p>
                <p className="text-white/50 text-sm">สยาม พารากอน · โต๊ะ 12</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ background: "#7C3AED" }}>
                    <Scan size={13} className="text-white" />
                    <span className="text-white text-xs font-bold">เปิด Mini Program</span>
                  </div>
                </div>
              </div>
              <div className="text-6xl opacity-80">☕</div>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-black text-lg">รายการล่าสุด</h2>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#A855F7" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-1.5">
          {recentTx.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.04)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                style={{ background: tx.color + "25" }}>
                {tx.emoji}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{tx.name}</p>
                <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                  <Clock size={9} /> {tx.cat} · {tx.time}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className={`text-sm font-black ${tx.amount > 0 ? "" : "text-white"}`}
                  style={tx.amount > 0 ? { color: "#A855F7" } : {}}>
                  {tx.amount > 0 ? "+" : ""}฿{Math.abs(tx.amount).toLocaleString()}
                </span>
                {tx.amount > 0
                  ? <ArrowDownLeft size={11} style={{ color: "#A855F7" }} />
                  : <ArrowUpRight size={11} className="text-white/30" />
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Nav (Spotify style) ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm z-30"
        style={{ background: "rgba(13,5,32,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex justify-around px-2 py-3">
          {[
            { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H14v-5H8v5H4a1 1 0 01-1-1V9.5z" fill="currentColor"/></svg>, label: "Home",    active: true  },
            { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/><path d="M15.5 15.5L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: "ค้นหา",  active: false },
            { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M7 9h8M7 13h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: "คลัง",   active: false },
            { icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 19c0-3.866 3.134-7 7-7h2c3.866 0 7 3.134 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>, label: "โปรไฟล์", active: false },
          ].map((n) => (
            <button key={n.label} className="flex flex-col items-center gap-1 px-3 py-1">
              <span style={{ color: n.active ? "#A855F7" : "rgba(255,255,255,0.4)" }}>{n.icon}</span>
              <span className="text-xs font-semibold"
                style={{ color: n.active ? "#A855F7" : "rgba(255,255,255,0.4)" }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

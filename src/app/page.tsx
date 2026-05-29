"use client";

import Link from "next/link";
import { QrCode, Bell, MapPin, ChevronRight, Gift, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const stars = 340;
  const nextReward = 400;
  const progress = Math.round((stars / nextReward) * 100);

  const recent = [
    { emoji: "🧋", name: "Java Chip Frappuccino®", size: "Grande", time: "เมื่อวาน", stars: 12 },
    { emoji: "☕", name: "Iced Caffè Latte", size: "Tall", time: "2 วันก่อน", stars: 8 },
    { emoji: "🥐", name: "Butter Croissant", size: "1 ชิ้น", time: "3 วันก่อน", stars: 4 },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20" style={{ background: "#F2F0EB" }}>

      {/* ── Header ── */}
      <div style={{ background: "linear-gradient(160deg, #1E3932 0%, #006241 100%)" }}
        className="relative overflow-hidden px-5 pt-14 pb-20">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #CBA258, transparent)" }} />

        <div className="relative flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#00704A", border: "2px solid rgba(255,255,255,0.2)" }}>
              <span className="text-white font-black text-base">S</span>
            </div>
            <div>
              <p className="text-white/50 text-xs">สั่งที่</p>
              <div className="flex items-center gap-1">
                <MapPin size={10} className="text-white/80" />
                <span className="text-white font-bold text-sm">สยาม พารากอน G</span>
              </div>
            </div>
          </div>
          <button className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <Bell size={18} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400" />
          </button>
        </div>

        <p className="relative text-white/60 text-sm">สวัสดีตอนเช้า,</p>
        <p className="relative text-white font-black text-2xl mb-5">คุณเจมส์ ☀️</p>
      </div>

      {/* ── Stars Card (floats over header) ── */}
      <div className="px-4 -mt-14 relative z-10">
        <div className="bg-white rounded-3xl p-5 shadow-xl" style={{ boxShadow: "0 8px 32px rgba(30,57,50,0.18)" }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Starbucks Rewards</p>
              <div className="flex items-end gap-1.5 mt-1">
                <span className="text-4xl font-black" style={{ color: "#1E3932" }}>{stars}</span>
                <span className="text-base font-bold mb-0.5" style={{ color: "#CBA258" }}>★ Stars</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #1E3932, #00704A)" }}>
              <span className="text-3xl">☕</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>{stars} Stars</span>
              <span style={{ color: "#CBA258" }}>★ {nextReward} → รับเครื่องดื่มฟรี</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#F2F0EB" }}>
              <div className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, background: "linear-gradient(90deg, #CBA258, #F1D592)" }} />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">อีก {nextReward - stars} Stars ก็ได้รางวัลฟรีแล้ว!</p>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        <Link href="/scan">
          <div className="relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #1E3932, #006241)" }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              <QrCode size={22} className="text-white" />
            </div>
            <div className="relative">
              <p className="text-white font-bold text-sm">สแกน & จ่าย</p>
              <p className="text-white/60 text-xs">ที่ร้าน</p>
            </div>
          </div>
        </Link>
        <Link href="/menu">
          <div className="relative overflow-hidden rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform"
            style={{ background: "linear-gradient(135deg, #00704A, #009A65)" }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)" }}>
              <span className="text-2xl">📱</span>
            </div>
            <div className="relative">
              <p className="text-white font-bold text-sm">Mobile Order</p>
              <p className="text-white/60 text-xs">สั่งล่วงหน้า</p>
            </div>
          </div>
        </Link>
      </div>

      {/* ── Seasonal Banner ── */}
      <div className="px-4 mt-4">
        <div className="relative overflow-hidden rounded-2xl p-5"
          style={{ background: "linear-gradient(125deg, #1E3932 0%, #00704A 100%)" }}>
          <div className="absolute right-0 top-0 bottom-0 w-28 flex items-center justify-center text-6xl opacity-20">🌿</div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #CBA258, transparent)" }} />
          <span className="relative inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-2"
            style={{ background: "rgba(203,162,88,0.25)", color: "#F1D592" }}>
            🌟 ซีซั่นนัล
          </span>
          <p className="relative text-white font-black text-base">Summer Refreshers</p>
          <p className="relative text-white/70 text-xs mt-0.5 mb-3">เมนูฤดูร้อนใหม่ รสชาติสดชื่น</p>
          <Link href="/menu">
            <span className="relative inline-flex items-center gap-1 text-sm font-bold"
              style={{ color: "#CBA258" }}>
              ดูเมนู <ChevronRight size={14} />
            </span>
          </Link>
        </div>
      </div>

      {/* ── Offers ── */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">ออฟเฟอร์สำหรับคุณ</h3>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#00704A" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
          {[
            { bg: "#1E3932", icon: "☕", title: "ซื้อ 1 แถม 1", sub: "ทุกวันอังคาร", tag: "วันนี้เท่านั้น" },
            { bg: "#006241", icon: "⭐", title: "+2x Stars", sub: "Frappuccino® ทุกชนิด", tag: "ถึง 31 พ.ค." },
            { bg: "#00704A", icon: "🎁", title: "Happy Hour", sub: "ลด 30% 14:00–17:00", tag: "ทุกวัน" },
          ].map((o, i) => (
            <div key={i} className="shrink-0 w-44 rounded-2xl p-3.5 relative overflow-hidden"
              style={{ background: o.bg }}>
              <div className="absolute -bottom-4 -right-4 text-5xl opacity-15">{o.icon}</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full mb-2 inline-block"
                style={{ background: "rgba(203,162,88,0.25)", color: "#F1D592" }}>
                {o.tag}
              </span>
              <p className="text-white font-bold text-sm">{o.title}</p>
              <p className="text-white/60 text-xs mt-0.5">{o.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Orders ── */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">สั่งซ้ำอีกครั้ง</h3>
          <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#00704A" }}>
            ดูทั้งหมด <ChevronRight size={13} />
          </button>
        </div>
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.08)" }}>
          {recent.map((r, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i < recent.length - 1 ? "border-b border-gray-50" : ""}`}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: "#D4E9E2" }}>
                {r.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{r.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{r.size}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-xs text-gray-400 flex items-center gap-0.5">
                    <Clock size={10} />
                    {r.time}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold" style={{ color: "#CBA258" }}>+{r.stars}★</span>
                <button className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: "#D4E9E2", color: "#00704A" }}>
                  สั่งอีก
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Nav ── */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-100 px-2 py-2 flex justify-around z-30">
        {[
          { icon: "🏠", label: "Home", active: true, href: "/" },
          { icon: "📋", label: "Menu", active: false, href: "/menu" },
          { icon: "💳", label: "Pay", active: false, href: "/payment" },
          { icon: "🎁", label: "Rewards", active: false, href: "#" },
          { icon: "👤", label: "Me", active: false, href: "#" },
        ].map((n) => (
          <Link key={n.label} href={n.href}
            className="flex flex-col items-center gap-0.5 px-2 py-1">
            <span className="text-xl">{n.icon}</span>
            <span className="text-xs font-semibold"
              style={{ color: n.active ? "#00704A" : "#9CA3AF" }}>
              {n.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

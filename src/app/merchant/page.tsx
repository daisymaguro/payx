"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, ChevronRight, Check, Star, Zap, Users, BarChart3, CreditCard } from "lucide-react";

type Tab = "dashboard" | "credit" | "apply";
type BizType = "restaurant" | "taxi" | null;

const weekData = [18500, 22300, 19800, 25600, 21000, 28900, 31200];
const weekLabels = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
const maxVal = Math.max(...weekData);

export default function MerchantPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [bizType, setBizType] = useState<BizType>(null);
  const [loanAmount, setLoanAmount] = useState("50000");
  const [applyStep, setApplyStep] = useState<"form" | "processing" | "approved">("form");

  const handleApply = () => {
    setApplyStep("processing");
    setTimeout(() => setApplyStep("approved"), 2500);
  };

  const creditScore = 82;
  const monthRevenue = 167300;
  const txCount = 1284;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F5F0FF" }}>

      {/* Header */}
      <div className="relative overflow-hidden px-5 pt-14 pb-6"
        style={{ background: "linear-gradient(135deg, #1A0A3D 0%, #4C1D95 55%, #7C3AED 100%)" }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #C084FC, transparent)" }} />
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)" }}>
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex-1">
            <p className="text-white/60 text-xs">แดชบอร์ดธุรกิจ</p>
            <h1 className="text-white font-black text-lg">PayX for Business</h1>
          </div>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "rgba(255,255,255,0.1)" }}>🏪</div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "รายรับเดือนนี้", value: `฿${(monthRevenue/1000).toFixed(0)}K`, icon: <TrendingUp size={13} /> },
            { label: "จำนวนรายการ", value: txCount.toLocaleString(), icon: <Users size={13} /> },
            { label: "PayX Credit Score", value: `${creditScore}/100`, icon: <Star size={13} /> },
          ].map((k) => (
            <div key={k.label} className="rounded-2xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="flex items-center justify-center gap-1 text-white/60 mb-1">
                {k.icon}<span className="text-xs">{k.label}</span>
              </div>
              <p className="text-white font-black text-sm">{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white px-4 pt-3 pb-0 gap-1" style={{ boxShadow: "0 1px 0 rgba(124,58,237,0.08)" }}>
        {([
          { id: "dashboard", icon: <BarChart3 size={14} />, label: "ภาพรวม" },
          { id: "credit",    icon: <CreditCard size={14} />, label: "เครดิต" },
          { id: "apply",     icon: <Zap size={14} />,        label: "ขอสินเชื่อ" },
        ] as { id: Tab; icon: React.ReactNode; label: string }[]).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 flex items-center justify-center gap-1.5 pb-3 font-bold text-xs border-b-2 transition-all"
            style={tab === t.id
              ? { borderColor: "#7C3AED", color: "#7C3AED" }
              : { borderColor: "transparent", color: "#9CA3AF" }}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 py-5 space-y-4 pb-10">

        {/* ── Dashboard ── */}
        {tab === "dashboard" && (
          <>
            {/* Revenue chart */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-sm" style={{ color: "#1A0A3D" }}>รายรับรายวัน (สัปดาห์นี้)</p>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "#D1FAE5", color: "#065F46" }}>
                  +12% ↑
                </span>
              </div>
              <div className="flex items-end gap-2 h-28">
                {weekData.map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-lg transition-all"
                      style={{
                        height: `${(v / maxVal) * 96}px`,
                        background: i === 6
                          ? "linear-gradient(to top, #6D28D9, #A855F7)"
                          : "linear-gradient(to top, #EDE9FE, #C4B5FD)",
                      }} />
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>{weekLabels[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment breakdown */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#1A0A3D" }}>แหล่งรายรับ</p>
              {[
                { label: "PayX Mini Program", pct: 48, color: "#7C3AED", amount: "฿80,304" },
                { label: "PayX Taxi / Walk-in", pct: 31, color: "#A855F7", amount: "฿51,863" },
                { label: "เงินสด", pct: 14, color: "#D1D5DB", amount: "฿23,422" },
                { label: "อื่นๆ (QR/บัตร)", pct: 7, color: "#E9D5FF", amount: "฿11,711" },
              ].map((s) => (
                <div key={s.label} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold" style={{ color: "#1A0A3D" }}>{s.label}</span>
                    <span style={{ color: "#9CA3AF" }}>{s.pct}% · {s.amount}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#F5F0FF" }}>
                    <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent transactions */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-black text-sm" style={{ color: "#1A0A3D" }}>รายการล่าสุด</p>
                <button className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#7C3AED" }}>
                  ทั้งหมด <ChevronRight size={12} />
                </button>
              </div>
              {[
                { type: "💜", name: "PayX Mini Program", amount: "+฿185", time: "14:32", src: "Starbucks Order" },
                { type: "🚕", name: "PayX Taxi", amount: "+฿120", time: "14:18", src: "สมชาย กข 1234" },
                { type: "💜", name: "PayX Mini Program", amount: "+฿340", time: "13:55", src: "ออเดอร์โต๊ะ 7" },
                { type: "💵", name: "เงินสด", amount: "+฿95", time: "13:30", src: "Walk-in" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5" style={{ borderBottom: i < 3 ? "1px solid #F5F0FF" : "none" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: "#EDE9FE" }}>
                    {tx.type}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#1A0A3D" }}>{tx.name}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{tx.src} · {tx.time}</p>
                  </div>
                  <span className="text-sm font-black" style={{ color: "#10B981" }}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Credit Score ── */}
        {tab === "credit" && (
          <>
            {/* Score card */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-4" style={{ color: "#1A0A3D" }}>PayX Credit Score</p>
              <div className="flex items-center gap-5">
                <div className="relative w-24 h-24 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#EDE9FE" strokeWidth="3.8"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7C3AED" strokeWidth="3.8"
                      strokeDasharray={`${creditScore} 100`} strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-black text-xl" style={{ color: "#1A0A3D" }}>{creditScore}</span>
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>/100</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-2"
                    style={{ background: "#D1FAE5" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">ดีมาก</span>
                  </div>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    คะแนนเครดิตของคุณอยู่ในเกณฑ์ดีมาก พร้อมขอสินเชื่อได้ทันที
                  </p>
                </div>
              </div>
            </div>

            {/* Score factors */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#1A0A3D" }}>ปัจจัยที่ส่งผลต่อคะแนน</p>
              {[
                { label: "ประวัติรายรับ PayX (8 เดือน)", score: 95, weight: "35%" },
                { label: "ความสม่ำเสมอ (ทุกวัน)", score: 88, weight: "25%" },
                { label: "จำนวนธุรกรรม", score: 82, weight: "20%" },
                { label: "อัตราการเติบโต", score: 72, weight: "20%" },
              ].map((f) => (
                <div key={f.label} className="mb-3.5 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium" style={{ color: "#1A0A3D" }}>{f.label}</span>
                    <span style={{ color: "#7C3AED" }}>{f.score}/100 · น้ำหนัก {f.weight}</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "#F5F0FF" }}>
                    <div className="h-full rounded-full" style={{ width: `${f.score}%`, background: "linear-gradient(90deg, #7C3AED, #A855F7)" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Loan eligibility */}
            <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.2)" }}>
              <p className="font-black text-sm mb-2" style={{ color: "#4C1D95" }}>วงเงินสินเชื่อที่ได้รับ</p>
              <p className="text-3xl font-black" style={{ color: "#7C3AED" }}>฿500,000</p>
              <p className="text-xs mt-1 mb-3" style={{ color: "#6D28D9" }}>อัตราดอกเบี้ย 0.89% ต่อเดือน</p>
              <button onClick={() => setTab("apply")}
                className="w-full py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
                ขอสินเชื่อเลย →
              </button>
            </div>
          </>
        )}

        {/* ── Apply ── */}
        {tab === "apply" && (
          <>
            {applyStep === "form" && (
              <div className="space-y-4">
                <p className="text-sm font-medium" style={{ color: "#9CA3AF" }}>กรอกข้อมูลขอสินเชื่อ PayX Business</p>

                {/* Business type */}
                <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#7C3AED" }}>ประเภทธุรกิจ</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "restaurant", label: "🍽️ ร้านอาหาร", desc: "ร้านค้า / ร้านกาแฟ" },
                      { id: "taxi",       label: "🚕 คนขับแท็กซี่", desc: "แท็กซี่ / Grab / Bolt" },
                    ].map((b) => (
                      <button key={b.id} onClick={() => setBizType(b.id as BizType)}
                        className="p-3 rounded-xl text-left border-2 transition-all"
                        style={{
                          border: `2px solid ${bizType === b.id ? "#7C3AED" : "#EDE9FE"}`,
                          background: bizType === b.id ? "#EDE9FE" : "white",
                        }}>
                        <p className="font-bold text-sm" style={{ color: "#1A0A3D" }}>{b.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan amount */}
                <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#7C3AED" }}>วงเงินที่ต้องการ (บาท)</p>
                  <input value={loanAmount} onChange={(e) => setLoanAmount(e.target.value.replace(/\D/, ""))}
                    className="text-3xl font-black outline-none w-full" style={{ color: "#1A0A3D" }} />
                  <div className="flex gap-2 mt-3">
                    {["50000", "100000", "200000", "500000"].map((a) => (
                      <button key={a} onClick={() => setLoanAmount(a)}
                        className="flex-1 py-1.5 rounded-xl text-xs font-bold"
                        style={{ background: loanAmount === a ? "#7C3AED" : "#EDE9FE", color: loanAmount === a ? "white" : "#7C3AED" }}>
                        {parseInt(a) >= 100000 ? `${parseInt(a)/1000}k` : `${parseInt(a)/1000}k`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan summary */}
                <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
                  {[
                    { label: "วงเงินขอ", value: `฿${parseInt(loanAmount || "0").toLocaleString()}` },
                    { label: "อัตราดอกเบี้ย", value: "0.89% / เดือน" },
                    { label: "ผ่อน 12 เดือน", value: `฿${Math.ceil(parseInt(loanAmount || "0") * 1.0868 / 12).toLocaleString()} / เดือน` },
                    { label: "อนุมัติภายใน", value: "5 นาที ⚡" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid #F5F0FF" }}>
                      <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                      <span className="text-sm font-bold" style={{ color: "#1A0A3D" }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleApply} disabled={!bizType || !loanAmount}
                  className="w-full py-4 rounded-2xl font-bold text-white text-base disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
                  ยื่นขอสินเชื่อ
                </button>
              </div>
            )}

            {applyStep === "processing" && (
              <div className="flex flex-col items-center justify-center min-h-64 gap-5 fade-up">
                <div className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #EDE9FE, #DDD6FE)" }}>
                  <div className="w-10 h-10 border-4 rounded-full animate-spin"
                    style={{ borderColor: "#EDE9FE", borderTopColor: "#7C3AED" }} />
                </div>
                <div className="text-center">
                  <p className="font-black text-lg" style={{ color: "#1A0A3D" }}>กำลังประเมินเครดิต</p>
                  <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>ระบบ AI กำลังวิเคราะห์ข้อมูล PayX ของคุณ</p>
                </div>
                {["ตรวจสอบประวัติการชำระเงิน ✓", "วิเคราะห์รายรับ PayX 8 เดือน ✓", "ประเมิน Credit Score ✓"].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 fade-up" style={{ animationDelay: `${i * 0.4}s` }}>
                    <Check size={14} style={{ color: "#10B981" }} />
                    <p className="text-sm font-medium" style={{ color: "#6B7280" }}>{s}</p>
                  </div>
                ))}
              </div>
            )}

            {applyStep === "approved" && (
              <div className="flex flex-col items-center gap-5 fade-up">
                <div className="w-24 h-24 rounded-full flex items-center justify-center pop-in"
                  style={{ background: "linear-gradient(135deg, #10B981, #34D399)", boxShadow: "0 0 32px rgba(16,185,129,0.35)" }}>
                  <Check size={44} className="text-white" strokeWidth={3} />
                </div>
                <div className="text-center">
                  <h2 className="font-black text-2xl" style={{ color: "#1A0A3D" }}>อนุมัติแล้ว! ⚡</h2>
                  <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>สินเชื่อ PayX Business</p>
                </div>
                <div className="w-full bg-white rounded-2xl p-5" style={{ boxShadow: "0 4px 20px rgba(16,185,129,0.12)" }}>
                  <div className="text-center pb-4 mb-4" style={{ borderBottom: "2px dashed #D1FAE5" }}>
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>วงเงินที่อนุมัติ</p>
                    <p className="text-4xl font-black mt-1" style={{ color: "#10B981" }}>
                      ฿{parseInt(loanAmount || "0").toLocaleString()}
                    </p>
                  </div>
                  {[
                    { label: "อัตราดอกเบี้ย", value: "0.89% / เดือน" },
                    { label: "ผ่อนชำระ", value: "12 งวด" },
                    { label: "โอนเงินภายใน", value: "24 ชั่วโมง" },
                    { label: "เลขที่อนุมัติ", value: `LOAN-${Date.now().toString().slice(-6)}` },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid #F0FDF4" }}>
                      <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                      <span className="text-sm font-bold" style={{ color: "#1A0A3D" }}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => router.push("/")}
                  className="w-full py-4 rounded-2xl font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #059669, #10B981)" }}>
                  เสร็จสิ้น
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

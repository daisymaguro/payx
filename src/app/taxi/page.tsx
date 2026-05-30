"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Star, TrendingUp, Shield } from "lucide-react";

type Step = "home" | "driver" | "fare" | "confirm" | "success";

export default function TaxiPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("home");
  const [plateNo, setPlateNo] = useState("");
  const [fare, setFare] = useState("");
  const [processing, setProcessing] = useState(false);

  const driver = { name: "สมชาย ใจดี", plate: plateNo || "กข 1234", rating: 4.8, trips: 1842, payxId: "DRV-2847" };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep("success"); }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F5F0FF" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(124,58,237,0.08)" }}>
        <button onClick={() => step === "home" ? router.back() : setStep("home")}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5F0FF" }}>
          <ArrowLeft size={18} style={{ color: "#7C3AED" }} />
        </button>
        <div className="flex-1">
          <h1 className="font-black text-base" style={{ color: "#1A0A3D" }}>PayX Taxi</h1>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>จ่ายค่าแท็กซี่ไม่ต้องสแกน QR</p>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#EDE9FE" }}>
          <span className="text-base">🚕</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">

        {/* ── Home ── */}
        {step === "home" && (
          <div className="space-y-4">
            {/* How it works */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#1A0A3D" }}>วิธีจ่ายค่าแท็กซี่ผ่าน PayX</p>
              {[
                { step: "1", icon: "🚕", title: "กรอกทะเบียนรถ", desc: "หรือให้คนขับแสดง PayX ID" },
                { step: "2", icon: "💰", title: "กรอกค่าโดยสาร", desc: "ตามมิเตอร์หรือตกลงราคา" },
                { step: "3", icon: "✅", title: "ยืนยันและจ่าย", desc: "จ่ายด้วย PayX Wallet ทันที" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 mt-0.5"
                    style={{ background: "#7C3AED" }}>{s.step}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#1A0A3D" }}>{s.icon} {s.title}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Why PayX Taxi */}
            <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.15)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#4C1D95" }}>ทำไมต้องใช้ PayX Taxi?</p>
              {[
                { icon: <Shield size={14} style={{ color: "#7C3AED" }} />, text: "ปลอดภัยกว่า PromptPay QR — ไม่เสี่ยงโอนผิด" },
                { icon: <TrendingUp size={14} style={{ color: "#7C3AED" }} />, text: "คนขับสะสมประวัติรายได้ → ขอสินเชื่อได้" },
                { icon: <Star size={14} style={{ color: "#7C3AED" }} />, text: "ได้ PointX Stars ทุกการชำระ" },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
                  <span className="mt-0.5">{b.icon}</span>
                  <p className="text-xs font-medium" style={{ color: "#6D28D9" }}>{b.text}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("driver")}
              className="w-full py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
              🚕 เริ่มจ่ายค่าแท็กซี่
            </button>
          </div>
        )}

        {/* ── Driver Lookup ── */}
        {step === "driver" && (
          <div className="space-y-4">
            <p className="text-sm font-medium" style={{ color: "#9CA3AF" }}>กรอกทะเบียนรถหรือ PayX ID ของคนขับ</p>
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#7C3AED" }}>ทะเบียนรถแท็กซี่</p>
              <input value={plateNo} onChange={(e) => setPlateNo(e.target.value.toUpperCase())}
                placeholder="เช่น กข 1234"
                className="w-full text-xl font-black outline-none tracking-widest"
                style={{ color: "#1A0A3D" }} autoFocus />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ background: "#EDE9FE" }} />
              <span className="text-xs font-medium" style={{ color: "#9CA3AF" }}>หรือ</span>
              <div className="h-px flex-1" style={{ background: "#EDE9FE" }} />
            </div>
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#7C3AED" }}>PayX Driver ID</p>
              <input placeholder="เช่น DRV-2847"
                className="w-full text-xl font-black outline-none tracking-widest"
                style={{ color: "#1A0A3D" }} />
            </div>
            <button onClick={() => setStep("fare")} disabled={plateNo.length < 2}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              ค้นหาคนขับ
            </button>
          </div>
        )}

        {/* ── Fare ── */}
        {step === "fare" && (
          <div className="space-y-4">
            {/* Driver card */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3"
              style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: "#EDE9FE" }}>🧑‍✈️</div>
              <div className="flex-1">
                <p className="font-black" style={{ color: "#1A0A3D" }}>{driver.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>ทะเบียน {driver.plate} · ID {driver.payxId}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "#F59E0B" }}>
                    <Star size={11} fill="currentColor" /> {driver.rating}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{driver.trips.toLocaleString()} เที่ยว</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "#D1FAE5", color: "#065F46" }}>✓ ยืนยันแล้ว</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#7C3AED" }}>ค่าโดยสาร (บาท)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black" style={{ color: "#9CA3AF" }}>฿</span>
                <input value={fare} onChange={(e) => setFare(e.target.value.replace(/\D/, ""))}
                  placeholder="0" type="number"
                  className="text-4xl font-black outline-none w-full"
                  style={{ color: "#1A0A3D" }} autoFocus />
              </div>
              {/* Quick amounts */}
              <div className="flex gap-2 mt-3">
                {["50", "80", "100", "150", "200"].map((a) => (
                  <button key={a} onClick={() => setFare(a)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-bold"
                    style={{ background: fare === a ? "#7C3AED" : "#EDE9FE", color: fare === a ? "white" : "#7C3AED" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep("confirm")} disabled={!fare || parseInt(fare) < 10}
              className="w-full py-4 rounded-2xl font-bold text-white disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              ถัดไป
            </button>
          </div>
        )}

        {/* ── Confirm ── */}
        {step === "confirm" && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-center text-xs font-semibold mb-1" style={{ color: "#9CA3AF" }}>ค่าโดยสาร</p>
              <p className="text-center text-5xl font-black mb-4" style={{ color: "#1A0A3D" }}>฿{parseInt(fare).toLocaleString()}</p>
              <div className="space-y-2.5 pt-4" style={{ borderTop: "1.5px dashed #EDE9FE" }}>
                {[
                  { label: "คนขับ", value: driver.name },
                  { label: "ทะเบียน", value: driver.plate },
                  { label: "PayX Driver ID", value: driver.payxId },
                  { label: "ชำระด้วย", value: "💜 PayX Wallet (฿2,500)" },
                  { label: "PointX Stars", value: "+2 Stars" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#1A0A3D" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handlePay} disabled={processing}
              className="relative overflow-hidden w-full py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
              <div className="shimmer absolute inset-0 rounded-2xl" />
              {processing
                ? <span className="relative flex items-center justify-center gap-2"><div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} /> กำลังจ่าย...</span>
                : <span className="relative">จ่าย ฿{parseInt(fare).toLocaleString()}</span>}
            </button>
          </div>
        )}

        {/* ── Success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center pt-8 gap-5 fade-up">
            <div className="w-24 h-24 rounded-full flex items-center justify-center pop-in"
              style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", boxShadow: "0 0 32px rgba(124,58,237,0.35)" }}>
              <Check size={44} className="text-white" strokeWidth={3} />
            </div>
            <div className="text-center">
              <h2 className="font-black text-2xl" style={{ color: "#1A0A3D" }}>จ่ายสำเร็จ!</h2>
              <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>คนขับได้รับเงินทันที</p>
            </div>

            <div className="w-full bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.08)" }}>
              {[
                { label: "ค่าโดยสาร", value: `฿${parseInt(fare).toLocaleString()}`, bold: true },
                { label: "คนขับ", value: driver.name },
                { label: "ทะเบียน", value: driver.plate },
                { label: "เวลา", value: "30 พ.ค. 2569, 14:45" },
                { label: "เลขอ้างอิง", value: `TX${Date.now().toString().slice(-8)}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid #F5F0FF" }}>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                  <span className={`text-sm ${r.bold ? "font-black" : "font-semibold"}`}
                    style={{ color: r.bold ? "#7C3AED" : "#1A0A3D" }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Credit hint */}
            <div className="w-full rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "linear-gradient(135deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.15)" }}>
              <TrendingUp size={18} style={{ color: "#7C3AED" }} className="shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold" style={{ color: "#4C1D95" }}>สะสมประวัติรายได้</p>
                <p className="text-xs mt-0.5" style={{ color: "#7C3AED" }}>
                  คนขับที่ใช้ PayX Taxi สามารถขอสินเชื่อได้ผ่าน PayX for Business
                </p>
              </div>
            </div>

            <button onClick={() => router.push("/")}
              className="w-full py-4 rounded-2xl font-bold text-white"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)" }}>
              กลับหน้าหลัก
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

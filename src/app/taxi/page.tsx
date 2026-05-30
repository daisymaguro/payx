"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Star, TrendingUp, Shield, Zap, QrCode } from "lucide-react";

type Step = "home" | "scan" | "scanning" | "fare" | "confirm" | "success";

export default function TaxiPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("home");
  const [fare, setFare] = useState("");
  const [processing, setProcessing] = useState(false);

  // Mock driver data — ดึงมาจาก QR scan ของคนขับ (ผูกกับ PayX account ไม่ใช่ทะเบียน)
  const driver = { name: "สมชาย ใจดี", payxId: "DRV-2847", phone: "081-234-5678", rating: 4.8, trips: 1842 };

  const handleScan = () => {
    setStep("scanning");
    setTimeout(() => setStep("fare"), 2000);
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep("success"); }, 1800);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F5F0FF" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(124,58,237,0.08)" }}>
        <button
          onClick={() => {
            if (step === "home") router.back();
            else if (["scan", "scanning"].includes(step)) setStep("home");
            else if (step === "fare") setStep("home");
            else if (step === "confirm") setStep("fare");
            else setStep("home");
          }}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5F0FF" }}>
          <ArrowLeft size={18} style={{ color: "#7C3AED" }} />
        </button>
        <div className="flex-1">
          <h1 className="font-black text-base" style={{ color: "#1A0A3D" }}>PayX Taxi</h1>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>สแกน QR คนขับ · จ่ายทันที</p>
        </div>
        <span className="text-2xl">🚕</span>
      </div>

      <div className="flex-1 px-4 py-5">

        {/* ── Home ── */}
        {step === "home" && (
          <div className="space-y-4">

            {/* Key insight */}
            <div className="rounded-2xl p-4"
              style={{ background: "linear-gradient(135deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.15)" }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "#7C3AED" }}>
                  <QrCode size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: "#1A0A3D" }}>QR ผูกกับคนขับ ไม่ใช่รถ</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6D28D9" }}>
                    คนขับเช่ารถเปลี่ยนได้ตลอด — PayX QR ผูกกับ <strong>PayX Account ของคนขับ</strong> เหมือน PromptPay ผูกกับเบอร์โทร ใช้ได้ทุกคัน
                  </p>
                </div>
              </div>
            </div>

            {/* Flow comparison */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#1A0A3D" }}>เทียบกับ PromptPay QR เดิม</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: "#FEF2F2", border: "1px solid #FECACA" }}>
                  <p className="text-xs font-bold text-red-600 mb-2">❌ PromptPay QR เดิม</p>
                  {["คนขับโชว์ QR", "ผู้โดยสารสแกน", "กรอกจำนวนเอง", "โอนเข้าธนาคาร", "ไม่มีประวัติรายได้"].map((t) => (
                    <p key={t} className="text-xs text-red-400 py-0.5">• {t}</p>
                  ))}
                </div>
                <div className="rounded-xl p-3" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                  <p className="text-xs font-bold text-emerald-700 mb-2">✅ PayX QR ใหม่</p>
                  {["คนขับโชว์ PayX QR", "ผู้โดยสารสแกน", "กรอกค่าโดยสาร", "เข้า PayX wallet", "สร้างประวัติ → สินเชื่อ"].map((t) => (
                    <p key={t} className="text-xs text-emerald-600 py-0.5">• {t}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Why PayX */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="font-black text-sm mb-3" style={{ color: "#1A0A3D" }}>ประโยชน์สำหรับคนขับ</p>
              {[
                { icon: <Shield size={15} style={{ color: "#7C3AED" }} />, title: "QR ส่วนตัว ใช้ได้ทุกคัน", desc: "ผูกกับ PayX Driver ID ไม่ใช่ทะเบียน" },
                { icon: <TrendingUp size={15} style={{ color: "#7C3AED" }} />, title: "สะสมประวัติรายได้อัตโนมัติ", desc: "ทุกการจ่ายผ่าน PayX บันทึกเป็น Credit Score" },
                { icon: <Zap size={15} style={{ color: "#7C3AED" }} />, title: "ขอสินเชื่อได้จาก PayX", desc: "ใช้ประวัติรายรับขอสินเชื่อฉุกเฉิน / ซ่อมรถ" },
              ].map((b) => (
                <div key={b.title} className="flex items-start gap-3 mb-3 last:mb-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "#EDE9FE" }}>{b.icon}</div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#1A0A3D" }}>{b.title}</p>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("scan")}
              className="relative overflow-hidden w-full py-4 rounded-2xl font-bold text-white text-base"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
              <div className="shimmer absolute inset-0 rounded-2xl" />
              <span className="relative flex items-center justify-center gap-2">
                <QrCode size={18} />สแกน PayX QR คนขับ
              </span>
            </button>
          </div>
        )}

        {/* ── Scan / Scanning ── */}
        {(step === "scan" || step === "scanning") && (
          <div className="flex flex-col items-center gap-7 pt-4">
            <p className="text-sm text-center" style={{ color: "#9CA3AF" }}>
              ให้คนขับเปิดหน้า <strong style={{ color: "#7C3AED" }}>PayX → รับเงิน</strong><br />
              แล้วสแกน QR ด้านล่าง
            </p>

            {/* Viewfinder */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-3xl opacity-30"
                style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2), transparent)", filter: "blur(16px)" }} />

              {[
                "top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-2xl",
                "top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-2xl",
                "bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl",
                "bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-12 h-12 ${cls}`}
                  style={{ borderColor: i < 2 ? "#7C3AED" : "#A855F7" }} />
              ))}

              <div className="absolute inset-3 rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "white", boxShadow: "inset 0 2px 12px rgba(124,58,237,0.06)" }}>

                {step === "scan" && (
                  <div className="text-center px-4">
                    <QrCode size={48} className="mx-auto mb-3" style={{ color: "#DDD6FE" }} />
                    <p className="text-xs" style={{ color: "#D1D5DB" }}>กดปุ่มด้านล่างเพื่อสแกน</p>
                  </div>
                )}

                {step === "scanning" && (
                  <div className="w-36 h-36 relative">
                    <div className="absolute inset-0 grid grid-cols-7 gap-0.5 p-1 opacity-70">
                      {Array.from({ length: 49 }).map((_, i) => {
                        const filled = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,11,24,37].includes(i);
                        return <div key={i} className="rounded-sm" style={{ background: filled ? "#7C3AED" : "transparent" }} />;
                      })}
                    </div>
                    <div className="scan-line">
                      <div className="h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, #7C3AED, transparent)", boxShadow: "0 0 8px #A855F7" }} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {step === "scan" ? (
              <button onClick={handleScan}
                className="relative overflow-hidden flex items-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-base text-white active:scale-95 transition-transform"
                style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
                <div className="shimmer absolute inset-0 rounded-2xl" />
                <Zap size={18} className="relative" fill="white" />
                <span className="relative">สแกน QR</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#7C3AED" }}>
                <div className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: "rgba(124,58,237,0.2)", borderTopColor: "#7C3AED" }} />
                กำลังอ่าน PayX QR...
              </div>
            )}

            <div className="rounded-2xl px-4 py-3 max-w-xs text-center"
              style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.12)" }}>
              <p className="text-xs font-medium" style={{ color: "#A855F7" }}>
                💡 Demo — กดสแกนเพื่อจำลองการอ่าน PayX QR ของคนขับ
              </p>
            </div>
          </div>
        )}

        {/* ── Fare entry ── */}
        {step === "fare" && (
          <div className="space-y-4 fade-up">
            {/* Driver confirmed */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-3"
              style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)", border: "1.5px solid #D1FAE5" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: "#EDE9FE" }}>🧑‍✈️</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-black text-sm" style={{ color: "#1A0A3D" }}>{driver.name}</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#D1FAE5", color: "#065F46" }}>✓ ยืนยัน</span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>PayX ID: {driver.payxId}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold flex items-center gap-0.5" style={{ color: "#F59E0B" }}>
                    <Star size={10} fill="currentColor" /> {driver.rating}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{driver.trips.toLocaleString()} เที่ยว</span>
                </div>
              </div>
              <Check size={20} style={{ color: "#10B981" }} />
            </div>

            {/* Fare input */}
            <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-2" style={{ color: "#7C3AED" }}>ค่าโดยสาร (ตามมิเตอร์)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black" style={{ color: "#D1D5DB" }}>฿</span>
                <input value={fare} onChange={(e) => setFare(e.target.value.replace(/\D/, ""))}
                  placeholder="0" type="number"
                  className="text-5xl font-black outline-none flex-1"
                  style={{ color: "#1A0A3D" }} autoFocus />
              </div>
              <div className="flex gap-2 mt-4">
                {["50", "80", "100", "150", "200"].map((a) => (
                  <button key={a} onClick={() => setFare(a)}
                    className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all"
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
              <p className="text-center text-5xl font-black mb-4" style={{ color: "#1A0A3D" }}>
                ฿{parseInt(fare).toLocaleString()}
              </p>
              <div className="space-y-2.5 pt-4" style={{ borderTop: "1.5px dashed #EDE9FE" }}>
                {[
                  { label: "คนขับ", value: driver.name },
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
                ? <span className="relative flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} />
                    กำลังจ่าย...
                  </span>
                : <span className="relative">จ่าย ฿{parseInt(fare).toLocaleString()}</span>}
            </button>
          </div>
        )}

        {/* ── Success ── */}
        {step === "success" && (
          <div className="flex flex-col items-center gap-5 pt-8 fade-up">
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
                { label: "ค่าโดยสาร", value: `฿${parseInt(fare).toLocaleString()}`, highlight: true },
                { label: "คนขับ", value: driver.name },
                { label: "PayX Driver ID", value: driver.payxId },
                { label: "เวลา", value: new Date().toLocaleString("th-TH", { hour: "2-digit", minute: "2-digit" }) },
                { label: "เลขอ้างอิง", value: `TX${Date.now().toString().slice(-8)}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-2.5" style={{ borderBottom: "1px solid #F5F0FF" }}>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                  <span className={`text-sm ${r.highlight ? "font-black" : "font-semibold"}`}
                    style={{ color: r.highlight ? "#7C3AED" : "#1A0A3D" }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div className="w-full rounded-2xl p-4 flex items-start gap-3"
              style={{ background: "linear-gradient(135deg, #EDE9FE, #F5F3FF)", border: "1.5px solid rgba(124,58,237,0.15)" }}>
              <TrendingUp size={16} style={{ color: "#7C3AED" }} className="mt-0.5 shrink-0" />
              <p className="text-xs" style={{ color: "#6D28D9" }}>
                การจ่ายนี้บันทึกเข้า <strong>PayX Credit Score</strong> ของคนขับ — ใช้ขอสินเชื่อฉุกเฉิน / ซ่อมรถผ่าน PayX for Business ได้
              </p>
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

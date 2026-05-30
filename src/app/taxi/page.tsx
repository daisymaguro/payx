"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Star, Zap } from "lucide-react";

type Step = "scan" | "scanning" | "fare" | "confirm" | "success";

export default function TaxiPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("scan");
  const [fare, setFare] = useState("");
  const [processing, setProcessing] = useState(false);

  const driver = { name: "สมชาย ใจดี", payxId: "DRV-2847", rating: 4.8, trips: 1842 };

  const handleScan = () => {
    setStep("scanning");
    setTimeout(() => setStep("fare"), 2000);
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); setStep("success"); }, 1800);
  };

  const back = () => {
    if (step === "scan") router.back();
    else if (step === "fare") setStep("scan");
    else if (step === "confirm") setStep("fare");
    else router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F5F0FF" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white"
        style={{ boxShadow: "0 1px 0 rgba(124,58,237,0.08)" }}>
        <button onClick={back}
          className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F5F0FF" }}>
          <ArrowLeft size={18} style={{ color: "#7C3AED" }} />
        </button>
        <h1 className="font-black text-base flex-1" style={{ color: "#1A0A3D" }}>
          {step === "fare" ? "ค่าโดยสาร" : step === "confirm" ? "ยืนยันการชำระ" : step === "success" ? "ชำระสำเร็จ" : "PayX Taxi"}
        </h1>
        <span className="text-2xl">🚕</span>
      </div>

      <div className="flex-1 px-4 py-5">

        {/* ── Scan ── */}
        {(step === "scan" || step === "scanning") && (
          <div className="flex flex-col items-center gap-6 pt-4">
            <p className="text-sm font-medium text-center" style={{ color: "#9CA3AF" }}>
              สแกน PayX QR ของคนขับ
            </p>

            {/* Viewfinder */}
            <div className="relative w-68 h-68" style={{ width: 270, height: 270 }}>
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
                style={{ background: "white" }}>
                {step === "scan" ? (
                  <div className="text-center">
                    <svg width="56" height="56" viewBox="0 0 52 52" className="mx-auto mb-2 opacity-15" fill="none">
                      <rect x="4" y="4" width="16" height="16" rx="3" stroke="#7C3AED" strokeWidth="2"/>
                      <rect x="8" y="8" width="8" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>
                      <rect x="32" y="4" width="16" height="16" rx="3" stroke="#7C3AED" strokeWidth="2"/>
                      <rect x="36" y="8" width="8" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>
                      <rect x="4" y="32" width="16" height="16" rx="3" stroke="#7C3AED" strokeWidth="2"/>
                      <rect x="8" y="36" width="8" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>
                      <rect x="32" y="32" width="6" height="6" rx="1" fill="#A855F7" opacity="0.4"/>
                      <rect x="40" y="32" width="6" height="6" rx="1" fill="#A855F7" opacity="0.4"/>
                      <rect x="32" y="40" width="6" height="6" rx="1" fill="#A855F7" opacity="0.4"/>
                      <rect x="40" y="40" width="6" height="6" rx="1" fill="#A855F7" opacity="0.4"/>
                    </svg>
                    <p className="text-xs" style={{ color: "#D1D5DB" }}>กดปุ่มด้านล่างเพื่อสแกน</p>
                  </div>
                ) : (
                  <div className="w-36 h-36 relative">
                    <div className="absolute inset-0 grid grid-cols-7 gap-0.5 p-1 opacity-70">
                      {Array.from({ length: 49 }).map((_, i) => {
                        const f = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,11,24,37].includes(i);
                        return <div key={i} className="rounded-sm" style={{ background: f ? "#7C3AED" : "transparent" }} />;
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
                className="relative overflow-hidden flex items-center gap-2.5 px-12 py-4 rounded-2xl font-bold text-base text-white"
                style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
                <div className="shimmer absolute inset-0 rounded-2xl" />
                <Zap size={18} className="relative" fill="white" />
                <span className="relative">สแกน QR</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#7C3AED" }}>
                <div className="w-4 h-4 border-2 rounded-full animate-spin"
                  style={{ borderColor: "rgba(124,58,237,0.2)", borderTopColor: "#7C3AED" }} />
                กำลังอ่าน...
              </div>
            )}
          </div>
        )}

        {/* ── Fare ── */}
        {step === "fare" && (
          <div className="space-y-4 fade-up">
            {/* Driver card */}
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
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold flex items-center gap-0.5" style={{ color: "#F59E0B" }}>
                    <Star size={10} fill="currentColor" />{driver.rating}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{driver.trips.toLocaleString()} เที่ยว</span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>· {driver.payxId}</span>
                </div>
              </div>
              <Check size={20} style={{ color: "#10B981" }} />
            </div>

            {/* Amount */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#9CA3AF" }}>ค่าโดยสาร (บาท)</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black" style={{ color: "#D1D5DB" }}>฿</span>
                <input value={fare} onChange={(e) => setFare(e.target.value.replace(/\D/, ""))}
                  placeholder="0" type="number"
                  className="text-5xl font-black outline-none flex-1"
                  style={{ color: "#1A0A3D" }} autoFocus />
              </div>
              <div className="flex gap-2">
                {["50", "80", "100", "150", "200"].map((a) => (
                  <button key={a} onClick={() => setFare(a)}
                    className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                    style={{ background: fare === a ? "#7C3AED" : "#EDE9FE", color: fare === a ? "white" : "#7C3AED" }}>
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep("confirm")} disabled={!fare || parseInt(fare) < 10}
              className="w-full py-4 rounded-2xl font-bold text-white text-base disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #6D28D9, #7C3AED)", boxShadow: "0 8px 24px rgba(124,58,237,0.25)" }}>
              ถัดไป
            </button>
          </div>
        )}

        {/* ── Confirm ── */}
        {step === "confirm" && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 8px rgba(124,58,237,0.06)" }}>
              <p className="text-center text-xs mb-1" style={{ color: "#9CA3AF" }}>ค่าโดยสาร</p>
              <p className="text-center text-5xl font-black mb-5" style={{ color: "#1A0A3D" }}>
                ฿{parseInt(fare).toLocaleString()}
              </p>
              <div className="space-y-3 pt-4" style={{ borderTop: "1.5px dashed #EDE9FE" }}>
                {[
                  { label: "คนขับ", value: driver.name },
                  { label: "PayX ID", value: driver.payxId },
                  { label: "ชำระจาก", value: "💜 PayX Wallet" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between">
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                    <span className="text-sm font-semibold" style={{ color: "#1A0A3D" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={handlePay} disabled={processing}
              className="relative overflow-hidden w-full py-4 rounded-2xl font-bold text-white text-base disabled:opacity-70"
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
                { label: "เลขอ้างอิง", value: `TX${Date.now().toString().slice(-8)}` },
              ].map((r) => (
                <div key={r.label} className="flex justify-between py-3" style={{ borderBottom: "1px solid #F5F0FF" }}>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>{r.label}</span>
                  <span className={`text-sm ${r.highlight ? "font-black" : "font-semibold"}`}
                    style={{ color: r.highlight ? "#7C3AED" : "#1A0A3D" }}>{r.value}</span>
                </div>
              ))}
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

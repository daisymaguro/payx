"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, QrCode } from "lucide-react";
import { useStore } from "@/lib/store";

export default function ScanPage() {
  const router = useRouter();
  const { dispatch } = useStore();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanned(true);
      dispatch({ type: "SCAN_QR", tableNumber: "12" });
      setTimeout(() => router.push("/menu"), 1200);
    }, 2200);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#1E3932" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.1)" }}>
          <ArrowLeft size={18} className="text-white" />
        </button>
        <h1 className="text-white font-bold text-base flex-1">สแกน QR Code</h1>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1"
          style={{ background: "rgba(203,162,88,0.15)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#CBA258" }} />
          <span className="text-xs font-medium" style={{ color: "#CBA258" }}>พร้อมสแกน</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8">
        <p className="text-white/50 text-sm text-center leading-relaxed">
          นำกล้องเล็งไปที่ QR Code ที่เคาน์เตอร์<br />
          <span style={{ color: "#CBA258" }}>หรือกดสแกนเพื่อ Mobile Order</span>
        </p>

        {/* QR Frame */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 rounded-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #00704A, transparent)", filter: "blur(24px)" }} />

          {[
            "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
            "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
            "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
            "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
          ].map((cls, i) => (
            <div key={i} className={`absolute w-10 h-10 ${cls}`}
              style={{ borderColor: i < 2 ? "#CBA258" : "#00704A" }} />
          ))}

          <div className="absolute inset-3 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)" }}>

            {!scanning && !scanned && (
              <div className="text-center">
                <QrCode size={52} className="mx-auto mb-3 opacity-30 text-white" />
                <p className="text-white/40 text-xs">กดปุ่มด้านล่างเพื่อสแกน</p>
              </div>
            )}

            {scanning && !scanned && (
              <div className="w-36 h-36 relative">
                <div className="absolute inset-0 grid grid-cols-7 gap-0.5 p-1 opacity-60">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const filled = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,41,42,43,44,45,46,47,48,11,24,37].includes(i);
                    return (
                      <div key={i} className="rounded-sm"
                        style={{ background: filled ? "#CBA258" : "transparent" }} />
                    );
                  })}
                </div>
                <div className="absolute left-0 right-0 scan-line">
                  <div className="h-0.5 rounded-full"
                    style={{ background: "linear-gradient(90deg, transparent, #00704A, transparent)", boxShadow: "0 0 8px #00704A" }} />
                </div>
              </div>
            )}

            {scanned && (
              <div className="flex flex-col items-center gap-2 fade-up">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #00704A, #CBA258)" }}>
                  <span className="text-white text-2xl">✓</span>
                </div>
                <p className="text-sm font-bold" style={{ color: "#CBA258" }}>สแกนสำเร็จ!</p>
              </div>
            )}
          </div>
        </div>

        {scanned ? (
          <div className="flex items-center gap-2 text-sm" style={{ color: "#CBA258" }}>
            <div className="w-4 h-4 border-2 rounded-full animate-spin"
              style={{ borderColor: "rgba(203,162,88,0.3)", borderTopColor: "#CBA258" }} />
            กำลังโหลดเมนู...
          </div>
        ) : (
          <button onClick={handleScan} disabled={scanning}
            className="relative overflow-hidden flex items-center gap-2.5 px-10 py-4 rounded-2xl font-bold text-base active:scale-95 transition-transform disabled:opacity-70"
            style={{ background: "linear-gradient(135deg, #00704A, #009A65)", color: "white" }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            {scanning ? (
              <>
                <div className="relative w-5 h-5 border-2 rounded-full animate-spin"
                  style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} />
                <span className="relative">กำลังสแกน...</span>
              </>
            ) : (
              <>
                <Zap size={18} className="relative" fill="white" />
                <span className="relative">สแกน QR Code</span>
              </>
            )}
          </button>
        )}

        <div className="rounded-2xl px-4 py-3 max-w-xs text-center"
          style={{ background: "rgba(0,112,74,0.2)", border: "1px solid rgba(0,112,74,0.3)" }}>
          <p className="text-xs" style={{ color: "#D4E9E2" }}>
            ☕ Demo — กดสแกนเพื่อจำลอง QR ที่ Starbucks สยาม พารากอน
          </p>
        </div>
      </div>
    </div>
  );
}

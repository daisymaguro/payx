"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Shield, ChevronRight, X } from "lucide-react";
import { useStore, useCartTotal } from "@/lib/store";
import { paymentMethods } from "@/lib/data";
import MiniProgramShell from "@/components/MiniProgramShell";

function WeChatPayModal({ amount, onClose, onSuccess }: { amount: number; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<"qr" | "processing" | "done">("qr");

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => { setStep("done"); setTimeout(onSuccess, 900); }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.7)" }}>
      <div className="w-full max-w-sm mx-auto rounded-t-3xl overflow-hidden slide-up"
        style={{ background: "#1AAD19" }}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
              <span className="font-black text-xs" style={{ color: "#1AAD19" }}>W</span>
            </div>
            <span className="text-white font-bold text-base">WeChat Pay</span>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="bg-white rounded-t-3xl px-6 pt-6 pb-8">
          {step === "qr" && (
            <>
              <p className="text-center text-gray-400 text-xs mb-1">ยอดชำระ</p>
              <p className="text-center font-black text-4xl mb-5" style={{ color: "#1E3932" }}>
                ฿{amount.toLocaleString()}
              </p>
              <div className="flex justify-center mb-5">
                <div className="w-44 h-44 rounded-2xl p-3 relative"
                  style={{ background: "#F9F9F9", border: "2px solid #E5E5E5" }}>
                  <div className="w-full h-full grid grid-cols-9 gap-0.5">
                    {Array.from({ length: 81 }).map((_, i) => {
                      const r = Math.floor(i / 9), c = i % 9;
                      const corner = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
                      const filled = corner || (r === 4 && c === 4) || (Math.sin(i * 2.3) > 0.2);
                      return <div key={i} className="rounded-sm" style={{ background: filled ? "#1AAD19" : "transparent" }} />;
                    })}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow">
                      <span className="text-lg">💚</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mb-5">
                เปิด WeChat แสกน QR หรือกดปุ่มด้านล่าง (Demo)
              </p>
              <button onClick={handlePay}
                className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
                style={{ background: "#1AAD19" }}>
                ยืนยันชำระ ฿{amount.toLocaleString()}
              </button>
            </>
          )}
          {step === "processing" && (
            <div className="flex flex-col items-center py-10 gap-4">
              <div className="w-14 h-14 border-4 rounded-full animate-spin"
                style={{ borderColor: "#D4E9E2", borderTopColor: "#1AAD19" }} />
              <p className="font-bold text-gray-700">กำลังประมวลผล...</p>
            </div>
          )}
          {step === "done" && (
            <div className="flex flex-col items-center py-10 gap-3 fade-up">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "#1AAD19" }}>
                <Check size={32} className="text-white" />
              </div>
              <p className="font-black text-gray-800 text-lg">ชำระสำเร็จ!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const allPaymentMethods = [
  ...paymentMethods,
  { id: "wechat_pay", name: "WeChat Pay", emoji: "💚", balance: null },
];

export default function PaymentPage() {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const subtotal = useCartTotal(state.cart);
  const serviceCharge = Math.round(subtotal * 0.07);
  const grandTotal = subtotal + serviceCharge;
  const starsEarned = Math.floor(grandTotal / 25);

  const [processing, setProcessing] = useState(false);
  const [pinStep, setPinStep] = useState(false);
  const [pin, setPin] = useState("");
  const [showWechat, setShowWechat] = useState(false);

  const selectedMethod = allPaymentMethods.find((m) => m.id === state.selectedPayment);

  const handlePay = () => {
    if (state.selectedPayment === "wechat_pay") { setShowWechat(true); return; }
    if (!pinStep) { setPinStep(true); return; }
    if (pin.length < 4) return;
    setProcessing(true);
    setTimeout(() => { dispatch({ type: "PLACE_ORDER" }); router.push("/success"); }, 1800);
  };

  return (
    <MiniProgramShell appName="Starbucks" appEmoji="☕" accentColor="#1E3932">
      <div style={{ background: "#F2F0EB", minHeight: "100%" }}>

        <div className="flex items-center gap-3 px-5 py-4 bg-white"
          style={{ boxShadow: "0 1px 0 #D4E9E2" }}>
          <h1 className="font-bold text-gray-800 text-base flex-1">
            {pinStep ? "ยืนยันตัวตน" : "ชำระเงิน"}
          </h1>
          <div className="flex items-center gap-1 text-xs font-medium text-green-600">
            <Shield size={13} /> ปลอดภัย
          </div>
        </div>

        <div className="pb-36">
          {!pinStep ? (
            <div className="px-4 py-4 space-y-3">
              {/* Amount */}
              <div className="relative overflow-hidden rounded-2xl px-5 py-6 text-center"
                style={{ background: "linear-gradient(155deg, #1E3932 0%, #006241 60%, #00704A 100%)" }}>
                <div className="shimmer absolute inset-0 rounded-2xl" />
                <p className="relative text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">ยอดชำระ</p>
                <p className="relative text-white text-5xl font-black">฿{grandTotal.toLocaleString()}</p>
                <p className="relative text-white/40 text-xs mt-2">
                  Starbucks · สยาม พารากอน · โต๊ะ {state.tableNumber}
                </p>
                <div className="relative mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(203,162,88,0.2)" }}>
                  <span style={{ color: "#CBA258" }}>★</span>
                  <span className="text-xs font-bold" style={{ color: "#F1D592" }}>+{starsEarned} PointX Stars</span>
                </div>
              </div>

              {/* Order list */}
              <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
                <p className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: "#006241" }}>รายการ</p>
                {state.cart.map((c) => (
                  <div key={c.item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span>{c.item.emoji}</span>
                      <span className="text-sm text-gray-700">{c.item.name} <span className="text-gray-400">×{c.quantity}</span></span>
                    </div>
                    <span className="text-sm font-semibold">฿{(c.item.price * c.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs text-gray-400 pt-2">
                  <span>ค่าบริการ 7%</span><span>฿{serviceCharge}</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
                <p className="font-bold text-xs uppercase tracking-wide mb-3" style={{ color: "#006241" }}>วิธีชำระ</p>
                <div className="space-y-2">
                  {allPaymentMethods.map((method) => {
                    const active = state.selectedPayment === method.id;
                    const isWechat = method.id === "wechat_pay";
                    return (
                      <button key={method.id}
                        onClick={() => dispatch({ type: "SET_PAYMENT", method: method.id })}
                        className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
                        style={{
                          background: active ? (isWechat ? "#E8F8E8" : "#D4E9E2") : "#F9F9F7",
                          border: `2px solid ${active ? (isWechat ? "#1AAD19" : "#00704A") : "transparent"}`,
                        }}>
                        <span className="text-2xl">{method.emoji}</span>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-bold text-gray-800">{method.name}</p>
                          {method.balance !== null
                            ? <p className="text-xs text-gray-400">ยอดคงเหลือ ฿{method.balance?.toLocaleString()}</p>
                            : isWechat
                            ? <p className="text-xs" style={{ color: "#1AAD19" }}>เปิด WeChat Pay ในแอป</p>
                            : null}
                        </div>
                        {isWechat && !active && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: "#E8F8E8", color: "#1AAD19" }}>NEW</span>
                        )}
                        {active && (
                          <div className="w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: isWechat ? "#1AAD19" : "#00704A" }}>
                            <Check size={11} className="text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 pt-10 gap-7">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: "linear-gradient(135deg, #1E3932, #00704A)" }}>
                  <span className="text-3xl">🔐</span>
                </div>
                <p className="font-black text-gray-800 text-lg">ใส่รหัส PIN</p>
                <p className="text-gray-400 text-sm mt-1">ยืนยันผ่าน {selectedMethod?.emoji} {selectedMethod?.name}</p>
              </div>
              <div className="flex gap-3.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-full transition-all"
                    style={{ background: i < pin.length ? "#00704A" : "#D4E9E2", transform: i < pin.length ? "scale(1.15)" : "scale(1)" }} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
                {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d, i) => (
                  <button key={i} disabled={d === "" || processing}
                    onClick={() => { if (d === "⌫") setPin(p => p.slice(0,-1)); else if (d) setPin(p => p.length < 6 ? p+d : p); }}
                    className={`h-14 rounded-2xl text-xl font-bold transition-all active:scale-90 ${d === "" ? "pointer-events-none" : ""}`}
                    style={d === "" ? {} : d === "⌫"
                      ? { background: "#D4E9E2", color: "#00704A" }
                      : { background: "white", color: "#1E3932", boxShadow: "0 2px 8px rgba(30,57,50,0.08)" }}>
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-xs" style={{ color: "#006241" }}>ใช้รหัสใดก็ได้ (Demo)</p>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white px-4 py-5"
          style={{ borderTop: "1px solid #D4E9E2" }}>
          <button onClick={handlePay}
            disabled={processing || (pinStep && pin.length < 4)}
            className="relative overflow-hidden w-full text-white rounded-2xl py-4 flex items-center justify-center gap-2.5 font-bold text-base active:scale-98 disabled:opacity-50"
            style={{
              background: state.selectedPayment === "wechat_pay" ? "#1AAD19" : "linear-gradient(135deg, #1E3932, #006241)",
              boxShadow: "0 8px 24px rgba(30,57,50,0.3)"
            }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            {processing
              ? <><div className="relative w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "white" }} /><span className="relative">กำลังดำเนินการ...</span></>
              : state.selectedPayment === "wechat_pay"
              ? <><span className="relative text-xl">💚</span><span className="relative">เปิด WeChat Pay</span></>
              : pinStep
              ? <span className="relative">ยืนยัน ฿{grandTotal.toLocaleString()}</span>
              : <><span className="relative">ชำระ ฿{grandTotal.toLocaleString()}</span><ChevronRight size={18} className="relative" /></>
            }
          </button>
        </div>

        {showWechat && (
          <WeChatPayModal amount={grandTotal} onClose={() => setShowWechat(false)}
            onSuccess={() => { setShowWechat(false); dispatch({ type: "PLACE_ORDER" }); router.push("/success"); }} />
        )}
      </div>
    </MiniProgramShell>
  );
}

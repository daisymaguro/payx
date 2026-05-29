"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ChevronRight, Pencil } from "lucide-react";
import { useStore, useCartTotal } from "@/lib/store";
import MiniProgramShell from "@/components/MiniProgramShell";

export default function CartPage() {
  const router = useRouter();
  const { state, dispatch } = useStore();
  const total = useCartTotal(state.cart);
  const [editNote, setEditNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const serviceCharge = Math.round(total * 0.07);
  const grandTotal = total + serviceCharge;
  const starsEarned = Math.floor(grandTotal / 25);

  if (state.cart.length === 0) {
    return (
      <MiniProgramShell appName="Starbucks" appEmoji="☕" accentColor="#1E3932">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8 py-20"
          style={{ background: "#F2F0EB", minHeight: "80vh" }}>
          <div className="text-7xl">☕</div>
          <h2 className="font-bold text-gray-700 text-lg">ตะกร้าว่างเปล่า</h2>
          <p className="text-gray-400 text-sm text-center">เลือกเครื่องดื่มที่ชอบก่อนนะครับ</p>
          <button onClick={() => router.push("/menu")}
            className="mt-2 px-8 py-3.5 rounded-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #1E3932, #006241)" }}>
            ดูเมนู
          </button>
        </div>
      </MiniProgramShell>
    );
  }

  return (
    <MiniProgramShell appName="Starbucks" appEmoji="☕" accentColor="#1E3932">
      <div style={{ background: "#F2F0EB", minHeight: "100%" }}>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-white"
          style={{ boxShadow: "0 1px 0 #D4E9E2" }}>
          <h1 className="font-bold text-gray-800 text-base flex-1">ตะกร้า</h1>
          <span className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: "#D4E9E2", color: "#006241" }}>
            ☕ โต๊ะ {state.tableNumber || "12"}
          </span>
        </div>

        <div className="pb-36 px-4 py-4 space-y-3">
          {state.cart.map((cartItem) => (
            <div key={cartItem.item.id} className="bg-white rounded-2xl p-4"
              style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "#D4E9E2" }}>
                  {cartItem.item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 text-sm">{cartItem.item.name}</h3>
                  <p className="font-semibold text-sm mt-0.5" style={{ color: "#00704A" }}>
                    ฿{cartItem.item.price}
                  </p>
                </div>
                <button onClick={() => dispatch({ type: "REMOVE_ITEM", id: cartItem.item.id })}
                  className="p-1.5 rounded-lg" style={{ background: "#FEF2F2" }}>
                  <Trash2 size={14} className="text-red-400" />
                </button>
              </div>

              {editNote === cartItem.item.id ? (
                <div className="mt-2.5 flex gap-2">
                  <input autoFocus value={noteText} onChange={(e) => setNoteText(e.target.value)}
                    placeholder="เช่น ไม่ใส่น้ำตาล, นมโอ๊ต"
                    className="flex-1 text-xs rounded-xl px-3 py-2 outline-none"
                    style={{ background: "#F2F0EB", color: "#374151" }} />
                  <button onClick={() => { dispatch({ type: "SET_NOTE", id: cartItem.item.id, note: noteText }); setEditNote(null); }}
                    className="text-xs font-bold px-3 py-2 rounded-xl text-white"
                    style={{ background: "#00704A" }}>
                    บันทึก
                  </button>
                </div>
              ) : (
                <button onClick={() => { setEditNote(cartItem.item.id); setNoteText(cartItem.note); }}
                  className="mt-2 flex items-center gap-1 text-xs"
                  style={{ color: cartItem.note ? "#00704A" : "#9CA3AF" }}>
                  <Pencil size={11} />
                  {cartItem.note || "เพิ่มหมายเหตุ (เช่น ไม่ใส่น้ำตาล)"}
                </button>
              )}

              <div className="flex items-center justify-between mt-3 pt-3"
                style={{ borderTop: "1px solid #F2F0EB" }}>
                <span className="text-xs font-semibold" style={{ color: "#006241" }}>
                  ฿{(cartItem.item.price * cartItem.quantity).toLocaleString()}
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={() => dispatch({ type: "UPDATE_QTY", id: cartItem.item.id, qty: cartItem.quantity - 1 })}
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "#D4E9E2" }}>
                    <Minus size={14} style={{ color: "#00704A" }} />
                  </button>
                  <span className="font-black text-sm w-5 text-center" style={{ color: "#1E3932" }}>
                    {cartItem.quantity}
                  </span>
                  <button onClick={() => dispatch({ type: "ADD_ITEM", item: cartItem.item })}
                    className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: "#00704A" }}>
                    <Plus size={14} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={() => router.push("/menu")}
            className="w-full rounded-2xl py-4 text-sm font-semibold flex items-center justify-center gap-2"
            style={{ border: "2px dashed #A7C4B5", color: "#00704A" }}>
            + เพิ่มรายการ
          </button>

          <div className="bg-white rounded-2xl p-4" style={{ boxShadow: "0 2px 12px rgba(30,57,50,0.06)" }}>
            <h3 className="font-bold text-gray-800 text-sm mb-3">สรุปรายการ</h3>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>ราคา</span><span>฿{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>ค่าบริการ 7%</span><span>฿{serviceCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-black text-base pt-2"
                style={{ borderTop: "2px solid #D4E9E2", color: "#1E3932" }}>
                <span>รวม</span>
                <span style={{ color: "#00704A" }}>฿{grandTotal.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "#D4E9E2" }}>
              <span style={{ color: "#CBA258" }}>★</span>
              <p className="text-xs font-semibold" style={{ color: "#1E3932" }}>
                จะได้รับ <span style={{ color: "#CBA258" }}>+{starsEarned} PointX Stars</span>
              </p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white px-4 py-5"
          style={{ borderTop: "1px solid #D4E9E2" }}>
          <button onClick={() => router.push("/payment")}
            className="relative overflow-hidden w-full text-white rounded-2xl py-4 flex items-center justify-between px-5"
            style={{ background: "linear-gradient(135deg, #1E3932, #006241)", boxShadow: "0 8px 24px rgba(30,57,50,0.3)" }}>
            <div className="shimmer absolute inset-0 rounded-2xl" />
            <span className="relative font-bold">ชำระผ่าน PayX</span>
            <div className="relative flex items-center gap-1.5">
              <span className="font-black">฿{grandTotal.toLocaleString()}</span>
              <ChevronRight size={17} />
            </div>
          </button>
        </div>
      </div>
    </MiniProgramShell>
  );
}

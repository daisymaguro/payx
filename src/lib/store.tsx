"use client";

import React, { createContext, useContext, useReducer } from "react";
import { MenuItem } from "./data";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  note: string;
}

interface State {
  cart: CartItem[];
  tableNumber: string;
  restaurantScanned: boolean;
  selectedPayment: string;
  orderPlaced: boolean;
  orderId: string;
}

type Action =
  | { type: "ADD_ITEM"; item: MenuItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "SET_NOTE"; id: string; note: string }
  | { type: "SCAN_QR"; tableNumber: string }
  | { type: "SET_PAYMENT"; method: string }
  | { type: "PLACE_ORDER" }
  | { type: "CLEAR_CART" };

const initialState: State = {
  cart: [],
  tableNumber: "",
  restaurantScanned: false,
  selectedPayment: "payx_wallet",
  orderPlaced: false,
  orderId: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cart.find((c) => c.item.id === action.item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.item.id === action.item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return { ...state, cart: [...state.cart, { item: action.item, quantity: 1, note: "" }] };
    }
    case "REMOVE_ITEM":
      return { ...state, cart: state.cart.filter((c) => c.item.id !== action.id) };
    case "UPDATE_QTY":
      if (action.qty <= 0) {
        return { ...state, cart: state.cart.filter((c) => c.item.id !== action.id) };
      }
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.item.id === action.id ? { ...c, quantity: action.qty } : c
        ),
      };
    case "SET_NOTE":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.item.id === action.id ? { ...c, note: action.note } : c
        ),
      };
    case "SCAN_QR":
      return { ...state, restaurantScanned: true, tableNumber: action.tableNumber };
    case "SET_PAYMENT":
      return { ...state, selectedPayment: action.method };
    case "PLACE_ORDER":
      return {
        ...state,
        orderPlaced: true,
        orderId: `PX${Date.now().toString().slice(-6)}`,
        cart: [],
      };
    case "CLEAR_CART":
      return { ...initialState };
    default:
      return state;
  }
}

const StoreContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function useCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
}

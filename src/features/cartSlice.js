import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIdx = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIdx >= 0) {
        state.cartItems[itemIdx].itemQuantity++;
        toast.info(`Increased ${state.cartItems[itemIdx].name} quantity`, {
          position: "bottom-left",
        });
      } else {
        const productTemp = { ...action.payload, itemQuantity: 1 };
        state.cartItems.push(productTemp);
        toast.success(`${action.payload.name} Add to cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} Remove from cart`, {
        position: "bottom-left",
      });
    },
    increaseQuantity: (state, action) => {
      const itemIdx = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartItems[itemIdx].itemQuantity++;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info(`Increased ${state.cartItems[itemIdx].name} quantity`, {
        position: "bottom-left",
      });
    },
    decreaseQuantity: (state, action) => {
      const itemIdx = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIdx].itemQuantity > 1) {
        state.cartItems[itemIdx].itemQuantity--;
        toast.info(`Decreased ${state.cartItems[itemIdx].name} quantity`, {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIdx].itemQuantity === 1) {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== action.payload.id
        );
        toast.error(`${action.payload.name} Remove from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, ) => {
      state.cartItems = []
      toast.error(`Clear cart`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotal: (state, action) => {
      const {total, quantity} = state.cartItems.reduce((cartTotal,cartItem)=> {
        const {price, itemQuantity} = cartItem
        const itemTotal = price * itemQuantity

        cartTotal.total += itemTotal
        cartTotal.quantity += itemQuantity
        return cartTotal
      }, {
        total: 0,
        quantity: 0
      })

      state.cartTotalAmount = total
      state.cartTotalQuantity = quantity
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  getTotal
} = cartSlice.actions;
export default cartSlice.reducer;

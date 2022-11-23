import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import orderSlice from "./order-slice";
import policySlice from "./policy-slice";
import productSlice from "./product-slice";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    policy: policySlice.reducer,
    user: userSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import getProductFlashSealsSlice from "./sliceProduct";
import getProductDetilasSlice from "./sliceDetialsProduct";
import cartSlice from "./sliceCart";
import wishlistSlice from "./sliceWishlist";
import sliceAdress from "./sliceAdress";
import sliceOrder from "./sliceOrder";
export const store = configureStore({
  reducer: {
    getProductFlashSealsSlice,
    getProductDetilasSlice,
    cart: cartSlice, // استخدام اسم موحد للسلة
    wishlist: wishlistSlice, // استخدام اسم موحد للسلة
    address: sliceAdress,
    order: sliceOrder,
  },
});

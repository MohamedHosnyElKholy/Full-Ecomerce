import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لجلب المنتجات
export const addWishList = createAsyncThunk(
  "addWishList/fetchProducts",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId: `${id}` },
      { 
        headers:{
            token
        }
       }
    );
    return response; // إرجاع قائمة المنتجات
  }
);


export const deleteWishList = createAsyncThunk(
  "deleteWishList/fetchProducts",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
            token
        }
    });
    return response;
  }
);


export const getWishLits = createAsyncThunk(
  "getWishLits/fetchProducts",
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers:{
            token
        }
    });
    return response;
  }
);


// إنشاء شريحة Redux
const WishListSlice = createSlice({
  name: "addWishList",
  initialState: {
    products: [], // حالة ابتدائية ككائن يحتوي على قائمة المنتجات
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWishList.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(deleteWishList.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(deleteWishList.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(deleteWishList.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(getWishLits.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(getWishLits.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(getWishLits.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
  },
});

export const {} = WishListSlice.actions;
export default WishListSlice.reducer;

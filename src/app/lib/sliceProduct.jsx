import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لجلب المنتجات
export const getProductFlashSeals = createAsyncThunk(
  "productSlice/fetchProducts",
  async () => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    return response.data.data; // إرجاع قائمة المنتجات
  }
);

// إنشاء شريحة Redux
const getProductFlashSealsSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [], // حالة ابتدائية ككائن يحتوي على قائمة المنتجات
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductFlashSeals.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(getProductFlashSeals.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(getProductFlashSeals.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});

export const {} = getProductFlashSealsSlice.actions;
export default getProductFlashSealsSlice.reducer;

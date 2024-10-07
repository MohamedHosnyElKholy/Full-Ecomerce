import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لجلب المنتجات
export const allOrder = createAsyncThunk(
  "allOrder/fetchProducts",
  async () => {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/`);
    return response; // إرجاع قائمة المنتجات
  }
);



// إنشاء شريحة Redux
const allOrderSlice = createSlice({
  name: "order",
  initialState: {
    products: [], // حالة ابتدائية ككائن يحتوي على قائمة المنتجات
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allOrder.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(allOrder.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(allOrder.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
  },
});

export const {} = allOrderSlice.actions;
export default allOrderSlice.reducer;

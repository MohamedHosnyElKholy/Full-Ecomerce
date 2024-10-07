import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لجلب تفاصيل المنتج
export const getProductDetilas = createAsyncThunk(
  "productSlice/fetchProduct",
  async (id) => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return response.data.data; // إرجاع تفاصيل المنتج
  }
);

// إنشاء شريحة Redux
const getProductDetilasSlice = createSlice({
  name: "productSlice",
  initialState: {
    product: null, // حالة ابتدائية ككائن أو null
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetilas.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(getProductDetilas.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.product = action.payload; // حفظ تفاصيل المنتج في الحالة
      })
      .addCase(getProductDetilas.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});

export const {} = getProductDetilasSlice.actions;
export default getProductDetilasSlice.reducer;

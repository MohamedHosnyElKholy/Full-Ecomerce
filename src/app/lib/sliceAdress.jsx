import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لإضافة عنوان
export const addAddress = createAsyncThunk(
  "address/add",
  async ({ name, details, phone, city }) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/addresses`,
      {
        name,
        details,
        phone,
        city,
      },
      {
        headers: {
          token,
        },
      }
    );

    return response.data; // إرجاع البيانات
  }
);

// استرجاع عناوين المستخدم
export const getUserAdress = createAsyncThunk(
  "getUserAdress/fetchProduct",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      headers: {
        token,
      },
    });
    return response.data; // إرجاع البيانات
  }
);

// حذف عنوان
export const deleteUserAdress = createAsyncThunk(
  "deleteUserAdress/fetchProduct",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
      headers: {
        token,
      },
    });
    return id; // إرجاع ID المحذوف
  }
);

// إنشاء شريحة Redux
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [], // قائمة العناوين
    loading: false, // حالة التحميل
    error: null, // تخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAdress.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(getUserAdress.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.addresses = action.payload.data; // حفظ بيانات العناوين
      })
      .addCase(getUserAdress.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(deleteUserAdress.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(deleteUserAdress.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.addresses = state.addresses.filter(address => address._id !== action.payload); // إزالة العنوان المحذوف
      })
      .addCase(deleteUserAdress.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      });
  },
});

export default addressSlice.reducer;

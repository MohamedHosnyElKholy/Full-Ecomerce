import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء thunk لجلب المنتجات
export const addCart = createAsyncThunk(
  "addWishList/fetchProducts",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: `${id}`,
      },
      {
        headers: {
          token,
        },
      }
    );
    return response;
  }
);

export const getuserCart = createAsyncThunk(
  "getWishLits/fetchProducts",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token,
        },
      }
    );
    return response;
  }
);

export const updateCart = createAsyncThunk(
  "updateCart/fetchProducts",
  async ({ id, count }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: count,
      },
      {
        headers: {
          token,
        },
      }
    );
    return response; // إرجاع البيانات
  }
);

export const removeProductFlashSeals = createAsyncThunk(
  "removeproductSlice/fetchProducts",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token,
        },
      }
    );
    return response;
  }
);

export const clearCart = createAsyncThunk(
  "clearCart/fetchProducts",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: {
          token,
        },
      }
    );
    return response;
  }
);






export const cheakOut = createAsyncThunk(
  "cheakOut/fetchProducts",
  async ({cartId,formdData}) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {
        shippingAddress: formdData
      },
      {
        headers:{
          token
        }
      }
    );
    return response;
  }
);














// إنشاء شريحة Redux
const cartSlice = createSlice({
  name: "addWishList",
  initialState: {
    products: [], // حالة ابتدائية ككائن يحتوي على قائمة المنتجات
    loading: false, // حالة التحميل
    error: null, // لتخزين الأخطاء
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(addCart.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(getuserCart.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(getuserCart.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(getuserCart.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(removeProductFlashSeals.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(removeProductFlashSeals.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(removeProductFlashSeals.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
      .addCase(cheakOut.pending, (state) => {
        state.loading = true; // تعيين حالة التحميل إلى true
      })
      .addCase(cheakOut.fulfilled, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.products = action.payload; // حفظ قائمة المنتجات في الحالة
      })
      .addCase(cheakOut.rejected, (state, action) => {
        state.loading = false; // تعيين حالة التحميل إلى false
        state.error = action.error.message; // تخزين رسالة الخطأ
      })
  },
});

export const {} = cartSlice.actions;
export default cartSlice.reducer;

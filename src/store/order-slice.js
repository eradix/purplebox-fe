import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders?status=${status}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const addToCart = createAsyncThunk(
  "order/addtoCart",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        payload
      );
      thunkAPI.dispatch(getUserCart('To-Pay'));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteOnCart = createAsyncThunk(
  "order/deleteOnCart",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}`
      );
      thunkAPI.dispatch(getUserCart('To-Pay'));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getUserCart = createAsyncThunk(
  "order/getUserCart",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/cart?status=${status}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateOrderIfExist = createAsyncThunk(
  "order/updateOrderIfExist",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/cart/${payload.product_id}`,
        payload
      );
      thunkAPI.dispatch(getUserCart('To-Pay'));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (payload, { getState, dispatch }) => {
    try {
      const resp = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/orders/${payload.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
        dispatch(getAllOrders(getState().order.status))
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getTotalPriceAllItems = createAsyncThunk(
  "order/getTotalPriceAllItems",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/get-total-price`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/get/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      thunkAPI.dispatch(getAllOrders('To-Pay'));
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  allOrders: [],
  usersCart: [],
  getItemsByStatus: [],
  order: {},
  form: {
    product_id: "",
    quantity: "",
    status: "To-Pay",
    message: "",
  },
  status: "To-Pay",
  showModal: false,
  edit: true,
  success: false,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload
    },
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    resetForm(state) {
      state.form = {
        product_id: "",
        quantity: "",
        status: "To-Pay",
        message: "",
      };
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    getAll(state, action) {
      state.allUsers = action.payload;
    },
    reset(state) {
      state.allUsers = [];
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      console.log("loading");
    },
    [addToCart.fulfilled]: (state, action) => {
      state.success = true;
      state.success = false;
    },
    [addToCart.rejected]: (state) => {
      console.log("rejected");
    },

    [getUserCart.pending]: (state) => {
      console.log("loading");
    },
    [getUserCart.fulfilled]: (state, action) => {
      if(action.payload.status === 'To-Pay') state.usersCart = action.payload.data;
      else state.getItemsByStatus = action.payload.data
    },
    [getUserCart.rejected]: (state) => {
      console.log("rejected");
    },

    [deleteOnCart.pending]: (state) => {
      console.log("loading");
    },
    [deleteOnCart.fulfilled]: (state, action) => {
      console.log("fullfilled");
    },
    [deleteOnCart.rejected]: (state) => {
      console.log("rejected");
    },

    [getAllOrders.pending]: (state) => {
      console.log("loading");
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.allOrders = action.payload.data;
    },
    [getAllOrders.rejected]: (state) => {
      console.log("rejected");
    },

    [getTotalPriceAllItems.pending]: (state) => {
      console.log("loading");
    },
    [getTotalPriceAllItems.fulfilled]: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
    },
    [getTotalPriceAllItems.rejected]: (state) => {
      console.log("rejected");
    },

    [getOrder.pending]: (state) => {
      console.log("loading");
    },
    [getOrder.fulfilled]: (state, action) => {
      state.order = action.payload.data;
    },
    [getOrder.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;

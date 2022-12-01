import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const saveCustomCake = createAsyncThunk(
  "customCake/saveCustomCake",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const fetchUsersCake = createAsyncThunk(
  "customCake/fetchUsersCake",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/custom-cakes?status=${status}`,
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

export const fetchAllCustomCake = createAsyncThunk(
  "customCake/fetchAllCustomCake",
  async (status, thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/custom-cakes?status=${status}`,
        {},
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

const customCakeSlice = createSlice({
  name: "custom-cake",
  initialState: {
    allCustomCakes: [],
    usersCakes: [],
    cakeItems: [],
    showModal: false,
    success: false,
    form: {
      image: "",
      quantity: "",
      message: "",
      remarks: "",
      price: "",
      status: "To-Pay",
    },
  },
  reducers: {
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    getAll(state, action) {
      state.allCustomCakes = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    resetForm(state) {
      state.form = {
        image: "",
        quantity: "",
        message: "",
        remarks: "",
        price: "",
      };
    },
  },
  extraReducers: {
    [saveCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [saveCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
    },
    [saveCustomCake.rejected]: (state) => {
      console.log("rejected");
    },

    [fetchUsersCake.pending]: (state) => {
      console.log("loading");
    },
    [fetchUsersCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
      if(action.payload.status === 'To-Pay') state.usersCakes = action.payload.data
      else state.cakeItems = action.payload.data
    },
    [fetchUsersCake.rejected]: (state) => {
      console.log("rejected");
    },

    [fetchAllCustomCake.pending]: (state) => {
      console.log("loading");
    },
    [fetchAllCustomCake.fulfilled]: (state, action) => {
      console.log("fulfilled");
      state.allCustomCakes = action.payload.data;
    },
    [fetchAllCustomCake.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const customCakeActions = customCakeSlice.actions;

export default customCakeSlice;

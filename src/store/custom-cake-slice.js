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
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/custom-cakes`,
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
      state.usersCakes = action.payload.data;
    },
    [fetchUsersCake.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const customCakeActions = customCakeSlice.actions;

export default customCakeSlice;

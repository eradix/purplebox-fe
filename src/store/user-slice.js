import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "user/getUsers",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    form: {
      first_name: "",
      middle_name: "",
      last_name: "",
      address: "",
      role: "",
      email: "",
      password: "",
    },
    showModal: false,
    edit: false,
    success: false,
  },
  reducers: {
    save(state, action) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/users`, action.payload.form)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.response.data));
    },
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    getAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    resetAllUser(state) {
      state.allUsers = [];
    },
    resetForm(state) {
      state.form = {
        first_name: "",
        middle_name: "",
        last_name: "",
        address: "",
        role: "",
        email: "",
        password: "",
      };
    },
    setSuccessTrue(state) {
      state.success = true;
    },
    setSuccessFalse(state) {
      state.success = false;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      console.log("loading");
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.data;
    },
    [fetchUsers.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

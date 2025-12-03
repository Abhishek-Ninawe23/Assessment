import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosInstance.js";

// Async Thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ identifier, password }, thunkApi) => {
        try {

            const res = await api.post("auth/login", { identifier, password });
            return res.data.user; //only user data

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Login Failed");
        }
    }
);

// Async Thunk for registration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (payload, thunkApi) => {
        try {

            const res = await api.post("/auth/register", payload);
            return res.data.user;    //only user data

        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || error.message || "Registration Failed");
        }
    }
);

// Initial State for Auth Slice
const initialState = {
    user: null,
    loading: false,
    error: null
};

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");

            // Call backend to clear cookie
            api.post("/auth/logout");
        }
    },
    extraReducers: (builder) => {
        builder
            //loginUser cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user))
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login Failed";
            })
            //registerUser Cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(state.user))
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration Failed";
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
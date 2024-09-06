import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const apiBaseUrl = "http://localhost:3001/api/v1"

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error("Failed to log in")
        }

        const data = await response.json()

        return data // Le token est retourné
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        token: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user || action.payload
                state.token = action.payload.token || null
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { logout } = authSlice.actions

export default authSlice.reducer

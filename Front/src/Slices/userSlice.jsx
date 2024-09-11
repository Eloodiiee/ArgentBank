import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: "",
    lastName: "",
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUserProfileStart: (state) => {
            state.loading = true
            state.error = null
        },
        fetchUserProfileSuccess: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.loading = false
        },
        fetchUserProfileFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
        //Action de mise à jour du nom
        updateName: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
    },
})

export const { fetchUserProfileStart, fetchUserProfileSuccess, fetchUserProfileFailure, updateName } = userSlice.actions

const apiBaseUrl = "http://localhost:3001/api/v1"

export const getUserProfile = (token) => async (dispatch) => {
    dispatch(fetchUserProfileStart())
    try {
        const response = await fetch(`${apiBaseUrl}/user/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()
        console.log("Profile data fetched:", data)

        if (!response.ok || !data.body) {
            throw new Error("Failed to fetch profile")
        }

        dispatch(
            fetchUserProfileSuccess({
                firstName: data.body.firstName,
                lastName: data.body.lastName,
            })
        )
    } catch (error) {
        console.error("Error fetching profile:", error)
        dispatch(fetchUserProfileFailure(error.toString()))
    }
}

export default userSlice.reducer

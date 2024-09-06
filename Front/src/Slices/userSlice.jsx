import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: "",
    lastName: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateName: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        },
    },
})
const apiBaseUrl = "http://localhost:3001/api/v1"
export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })

        if (!response.ok) {
            throw new Error("Failed to fetch user profile")
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const { updateName } = userSlice.actions

export default userSlice.reducer

// Importation de la fonction createSlice depuis Redux Toolkit pour créer le slice utilisateur
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// URL de base de l'API
const apiBaseUrl = "http://localhost:3001/api/v1"
// État initial pour le slice utilisateur
const initialState = {
    firstName: "", // Prénom de l'utilisateur (initialement vide)
    lastName: "", // Nom de famille de l'utilisateur (initialement vide)
    loading: false, // Indicateur de chargement, vrai lorsque le profil utilisateur est en cours de récupération
    error: null, // Contient les messages d'erreur en cas de problème lors de la récupération des données
}

// Création du slice utilisateur
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
    },
    extraReducers: (builder) => {
        // Gestion de la mise à jour du profil utilisateur
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            state.firstName = action.payload.body.firstName // Met à jour le prénom avec la réponse de l'API
            state.lastName = action.payload.body.lastName // Met à jour le nom de famille
            state.loading = false
        })
        builder.addCase(updateUserProfile.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
})

// Thunk met à jour le profil utilisateur avec fetch
export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async ({ token, firstName, lastName }, thunkAPI) => {
    try {
        const response = await fetch(`${apiBaseUrl}/user/profile`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName }), // Envoie les données en format JSON
        })

        if (!response.ok) {
            throw new Error("Failed to update user profile")
        }

        const data = await response.json() // Retourne les nouvelles données utilisateur
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

// Exportation des actions générées automatiquement par createSlice
export const { fetchUserProfileStart, fetchUserProfileSuccess, fetchUserProfileFailure, updateName } = userSlice.actions

// Fonction asynchrone pour récupérer le profil utilisateur depuis l'API
// Et utilise un token JWT pour authentifier la requête
export const getUserProfile = (token) => async (dispatch) => {
    // Démarre la récupération du profil utilisateur
    dispatch(fetchUserProfileStart())
    try {
        // Envoi d'une requête POST pour récupérer le profil de l'utilisateur
        const response = await fetch(`${apiBaseUrl}/user/profile`, {
            method: "POST", // Requête POST à l'API
            headers: {
                "Content-Type": "application/json", // Envoi des données en JSON
                Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête d'autorisation
            },
        })

        // Récupération des données de la réponse
        const data = await response.json()
        console.log("Profile data fetched:", data)

        // Vérification de la validité de la réponse et des données reçues
        if (!response.ok || !data.body) {
            throw new Error("Failed to fetch profile") // Envoie erreur en cas de problème
        }

        // Envoie une action pour mettre à jour l'état avec les informations de l'utilisateur
        dispatch(
            fetchUserProfileSuccess({
                firstName: data.body.firstName, // Prénom reçu de l'API
                lastName: data.body.lastName, // Nom reçu de l'API
            })
        )
    } catch (error) {
        // En cas d'échec, envoie une action contenant l'erreur
        console.error("Error fetching profile:", error)
        dispatch(fetchUserProfileFailure(error.toString())) // Enregistre l'erreur dans l'état
    }
}

// Exportation du reducer du slice pour être intégré dans le store Redux
export default userSlice.reducer

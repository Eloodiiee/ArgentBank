// Importation de la fonction createSlice depuis Redux Toolkit pour créer le slice utilisateur
import { createSlice } from "@reduxjs/toolkit"

// État initial pour le slice utilisateur
const initialState = {
    firstName: "", // Prénom de l'utilisateur (initialement vide)
    lastName: "", // Nom de famille de l'utilisateur (initialement vide)
    loading: false, // Indicateur de chargement, vrai lorsque le profil utilisateur est en cours de récupération
    error: null, // Contient les messages d'erreur en cas de problème lors de la récupération des données
}

// Création d'un slice pour l'utilisateur
const userSlice = createSlice({
    name: "user", // Nom du slice
    initialState, // Utilisation de l'état initial défini ci-dessus
    reducers: {
        // Action déclenchée lorsque la récupération du profil utilisateur commence
        fetchUserProfileStart: (state) => {
            state.loading = true // Active l'indicateur de chargement
            state.error = null // Réinitialise l'erreur pour un nouveau départ
        },
        // Action déclenchée lorsque la récupération du profil utilisateur réussit
        fetchUserProfileSuccess: (state, action) => {
            state.firstName = action.payload.firstName // Met à jour le prénom de l'utilisateur
            state.lastName = action.payload.lastName // Met à jour le nom de famille de l'utilisateur
            state.loading = false // Désactive l'indicateur de chargement après succès
        },
        // Action déclenchée lorsque la récupération du profil utilisateur échoue
        fetchUserProfileFailure: (state, action) => {
            state.loading = false // Désactive l'indicateur de chargement
            state.error = action.payload // Enregistre le message d'erreur dans l'état
        },
        // Action pour mettre à jour le nom de l'utilisateur manuellement
        updateName: (state, action) => {
            state.firstName = action.payload.firstName // Met à jour le prénom de l'utilisateur
            state.lastName = action.payload.lastName // Met à jour le nom de famille de l'utilisateur
        },
    },
})

// Exportation des actions générées automatiquement par createSlice
export const { fetchUserProfileStart, fetchUserProfileSuccess, fetchUserProfileFailure, updateName } = userSlice.actions

// URL de base de l'API
const apiBaseUrl = "http://localhost:3001/api/v1"

// Fonction asynchrone pour récupérer le profil utilisateur depuis l'API
// Elle utilise un token JWT pour authentifier la requête
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
            throw new Error("Failed to fetch profile") // Lève une erreur en cas de problème
        }

        // Envoie une action pour mettre à jour l'état avec les informations de l'utilisateur
        dispatch(
            fetchUserProfileSuccess({
                firstName: data.body.firstName, // Prénom reçu de l'API
                lastName: data.body.lastName, // Nom de famille reçu de l'API
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

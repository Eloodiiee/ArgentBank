// Importation des modules nécessaires depuis Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Base URL de l'API
const apiBaseUrl = "http://localhost:3001/api/v1"

// Thunk asynchrone pour gérer la connexion utilisateur
// `loginUser` envoie les informations de connexion à l'API et récupère le token en cas de succès
export const loginUser = createAsyncThunk(
    "auth/loginUser", // Nom de l'action générée par Redux Toolkit
    async ({ email, password }, thunkAPI) => {
        try {
            // Envoi d'une requête POST au point de terminaison /user/login avec les informations d'authentification
            const response = await fetch(`${apiBaseUrl}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }), // Convertit les données en format JSON pour l'envoi
            })

            // Si la réponse n'est pas OK (code de statut >= 400), on lève une exception
            if (!response.ok) {
                throw new Error("Failed to log in") // Message d'erreur générique pour indiquer l'échec de la connexion
            }

            // Si la requête est réussie, les données de la réponse (incluant le token) sont extraites
            const data = await response.json()

            return data // Renvoie des données utilisateur et/ou du token
        } catch (error) {
            // En cas d'erreur (ex: réseau ou réponse non valide), on rejette la promesse avec un message d'erreur personnalisé
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

// Création d'un slice d'authentification pour gérer l'état lié à l'authentification utilisateur
const authSlice = createSlice({
    name: "auth", // Nom du slice
    initialState: {
        user: null, // Informations sur l'utilisateur (initialement null)
        isLoading: false, // Indicateur pour savoir si la requête d'authentification est en cours
        error: null, // Pour stocker les erreurs éventuelles
        token: null, // Token d'authentification (initialement null)
    },
    reducers: {
        // Action synchrone pour déconnecter l'utilisateur
        logout: (state) => {
            state.user = null // Réinitialise l'utilisateur à null
            state.token = null // Réinitialise le token à null
        },
    },
    extraReducers: (builder) => {
        // Gestion des différents états de la requête asynchrone `loginUser`
        builder
            .addCase(loginUser.pending, (state) => {
                // Lorsque la requête est en cours, on active l'indicateur de chargement et on réinitialise l'erreur
                state.isLoading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                // Lorsque la requête réussit, on désactive l'indicateur de chargement
                // On met à jour l'utilisateur et le token à partir de la réponse
                state.isLoading = false
                state.user = action.payload.user || action.payload // Si la réponse contient un objet utilisateur, on l'assigne
                state.token = action.payload.token || null // Token renvoyé ou null si absent
            })
            .addCase(loginUser.rejected, (state, action) => {
                // Si la requête échoue, on désactive l'indicateur de chargement et on stocke l'erreur
                state.isLoading = false
                state.error = action.payload // Message d'erreur renvoyé par `rejectWithValue`
            })
    },
})

// Exportation des actions générées automatiquement par createSlice
export const { logout } = authSlice.actions

// Exportation du reducer pour être intégré dans le store Redux
export default authSlice.reducer

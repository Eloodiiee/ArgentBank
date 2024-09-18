// Importation de la fonction configureStore depuis Redux Toolkit
import { configureStore } from "@reduxjs/toolkit"
// Importation du middleware redux-thunk pour la gestion des actions asynchrones
import { thunk } from "redux-thunk"

// Importation du reducer utilisateur depuis le slice utilisateur
import userReducer from "../Slices/userSlice"
import authReducer from "../Slices/authSlice"

// Création et configuration du store Redux
const store = configureStore({
    // Ajout des reducers (ici, on utilise uniquement le reducer utilisateur)
    reducer: {
        auth: authReducer, // Le reducer utilisateur gère l'authentification lié à l'utilisateur
        user: userReducer, // Le reducer utilisateur gère l'état lié à l'utilisateur
    },
    // Configuration du middleware
    // Par défaut, Redux Toolkit inclut certains middlewares, dont `redux-thunk`
    // Cette configuration permet de concaténer `thunk` au middleware par défaut pour gérer les actions asynchrones
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

// Exportation du store configuré pour être utilisé dans l'application
export default store

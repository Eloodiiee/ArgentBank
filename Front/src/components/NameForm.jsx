import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, updateUserProfile } from "../Slices/userSlice"

const NameForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user) // Sélection des données utilisateur dans le store
    const token = localStorage.getItem("jwt")

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [isOpen, setIsOpen] = useState(false)

    // Utilisation de useEffect pour charger le profil utilisateur
    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token)) // Récupère le profil utilisateur lors du montage du composant
        }
    }, [dispatch, token])

    // Mise à jour des champs lorsque le store est mis à jour
    useEffect(() => {
        setFirstName(user.firstName) // Mise à jour locale lorsque l'état Redux change
        setLastName(user.lastName)
    }, [user.firstName, user.lastName])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({ token, firstName, lastName })) // Mise à jour du profil utilisateur
        setIsOpen(false) // Ferme le formulaire après la soumission
    }

    const editName = () => {
        setIsOpen(!isOpen) // Ouverture/fermeture du formulaire d'édition
        setFirstName(user.firstName) // Réinitialise les champs avec les données actuelles
        setLastName(user.lastName)
    }

    return (
        <div className="edit-button-container">
            {!isOpen && (
                <button className="edit-button" type="button" onClick={editName}>
                    Edit Name
                </button>
            )}
            {isOpen && (
                <form onSubmit={handleSubmit}>
                    <div className={`edit-container ${isOpen ? "open" : ""}`}>
                        <div className="form-container">
                            <span>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={user.firstName} />
                            </span>
                            <span>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={user.lastName} />
                            </span>
                        </div>
                        <div className="btns-container">
                            <button className="edit-button" type="submit">
                                Save
                            </button>
                            <button className="edit-button" type="button" onClick={editName}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default NameForm

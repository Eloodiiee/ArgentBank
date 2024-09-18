import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, updateName } from "../Slices/userSlice"

const NameForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = localStorage.getItem("jwt")

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [isOpen, setIsOpen] = useState(false)

    // Utilisation de useEffect pour charger le profil utilisateur
    useEffect(() => {
        if (token) {
            dispatch(getUserProfile(token))
        }
    }, [dispatch, token])

    // Mise à jour des champs lorsque le store est mis à jour
    useEffect(() => {
        console.log("Redux state updated:", user.firstName, user.lastName) // Vérifie si les données dans Redux sont mises à jour
        setFirstName(user.firstName)
        setLastName(user.lastName)
    }, [user.firstName, user.lastName])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting:", firstName, lastName) // Vérifie les données avant soumission
        // Mise à jour du store avec les nouvelles données
        dispatch(updateName({ firstName, lastName }))
        setIsOpen(false)
    }
    const editName = () => {
        setIsOpen(!isOpen)
        setFirstName(user.firstName)
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

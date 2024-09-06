import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateName } from "../Slices/userSlice"

const apiBaseUrl = "http://localhost:3001/api/v1"

const NameForm = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${apiBaseUrl}/user/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName }),
            })

            if (response.ok) {
                dispatch(updateName({ firstName, lastName }))
            } else {
                console.error("Erreur lors de la mise à jour")
            }
        } catch (error) {
            console.error("Erreur de connexion au serveur", error)
        }
    }

    return (
        <div className="edit-button-container">
            <form onSubmit={handleSubmit}>
                <div className="edit-container">
                    <span>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Firstname" />
                    </span>
                    <span>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Lastname" />
                    </span>
                    <button className="edit-button" type="submit">
                        Edit Name
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NameForm

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "../Slices/userSlice"
import NameForm from "../components/NameForm"

const Profile = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    // Accède à l'état utilisateur et à l'état de chargement dans Redux
    const { firstName, lastName, error } = useSelector((state) => state.user)
    console.log("firstName", firstName)
    console.log("lastName", lastName)

    // Récupère le token une seule fois
    const token = localStorage.getItem("jwt")

    // Utiliser useEffect pour charger le profil utilisateur
    useEffect(() => {
        if (token && isLoading) {
            dispatch(getUserProfile(token)).then(() => {
                setIsLoading(false) // Met à jour isLoading après avoir récupéré les données
            })
        } else if (!token) {
            console.error("No token found")
            setIsLoading(false) // Si aucun token n'est trouvé, on arrête le chargement
        }
    }, [dispatch, token, isLoading])

    // Affichage en fonction de l'état de chargement et des erreurs
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {firstName} {lastName}
                </h1>
                <NameForm />
            </div>

            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">Available Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">Current Balance</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">View transactions</button>
                </div>
            </section>
        </main>
    )
}

export default Profile

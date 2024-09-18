import { useEffect, useState, Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile } from "../Slices/userSlice"
import NameForm from "../components/NameForm"
import { NavLink } from "react-router-dom"
import argentBankLogo from "../assets/images/argentBankLogo.png"
import { logout } from "../Slices/authSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

const Profile = () => {
    const dispatch = useDispatch() // Hook pour dispatcher une action Redux
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate() // Hook pour naviguer programmaticallement

    // Accède à l'état utilisateur et à l'état de chargement dans Redux
    const { firstName, lastName, error } = useSelector((state) => state.user)
    console.log("firstName", firstName)
    console.log("lastName", lastName)

    // Récupère le token une seule fois
    const token = localStorage.getItem("jwt")

    // Utilise useEffect pour charger le profil utilisateur
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
    const handleLogout = () => {
        // Supprime les données de l'utilisateur stockées localement
        localStorage.removeItem("jwt")

        // Action Redux pour effacer l'utilisateur mémorisé
        dispatch(logout())

        // Redirige vers la page d'accueil
        navigate("/")
    }
    // Affichage en fonction de l'état de chargement et des erreurs
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <Fragment>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                <div>
                    <NavLink to="/user" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        {firstName}
                    </NavLink>
                    <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Sign Out
                    </NavLink>
                </div>
            </nav>
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
        </Fragment>
    )
}

export default Profile

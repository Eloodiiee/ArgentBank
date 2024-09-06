import NameForm from "../components/NameForm"
import { getUserProfile } from "../Slices/userSlice"
import { useState, useEffect } from "react"

const Profile = () => {
    const [data, setData] = useState({}) // Stocke les données récupérées
    const [isLoading, setIsLoading] = useState(true) // Indique si les données sont en cours de chargement
    const token = localStorage.getItem("jwt") //Récupération du token dans le localstorage
    console.log(token)

    useEffect(() => {
        getUserProfile(token)
            .then((response) => {
                console.log(response)
                setData(response)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [token])

    return (
        <>
            {!isLoading && (
                <main className="main bg-dark">
                    <div className="header">
                        <h1>
                            Welcome back
                            <br />
                            {data.body.firstName} {data.body.lastName}
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
            )}
        </>
    )
}

export default Profile

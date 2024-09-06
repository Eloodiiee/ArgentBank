import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../Slices/authSlice"

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, error, user } = useSelector((state) => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const loginData = await dispatch(loginUser({ email, password })).unwrap()
            console.log("Login successful:", loginData)
            localStorage.setItem("jwt", loginData.body.token)
        } catch (error) {
            console.error("Login failed:", error)
        }
    }

    useEffect(() => {
        console.log("Current user:", user)
        if (user) {
            navigate("/user") // Redirige vers la page utilisateur une fois la connexion réussie
        }
    }, [user, navigate])

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" disabled={isLoading} className="sign-in-button">
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </section>
        </main>
    )
}

export default LoginForm

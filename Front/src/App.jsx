import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Pages/SignInPage"
import Profile from "./Pages/User"
import Footer from "./components/Footer"
import StaticPage from "./Pages/Homepage"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StaticPage />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/user" element={<Profile />} />
            </Routes>
            <Footer />
        </Router>
    )
}

export default App

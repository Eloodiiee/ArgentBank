import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./Pages/SignInPage"
import Profile from "./Pages/User"
import Header from "./components/Header"
import Footer from "./components/Footer"
import StaticPage from "./Pages/Homepage"
function App() {
    return (
        <Router>
            <Header />
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

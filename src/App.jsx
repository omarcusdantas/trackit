import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodayPage from "./pages/TodayPage";
import { UserProvider } from "./UserContext";

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route 
                        path="/" 
                        element={<LoginPage />}
                    />
                    <Route 
                        path="/sign-up" 
                        element={<SignupPage />}
                    />
                    <Route 
                        path="/today" 
                        element={<TodayPage />}
                    />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

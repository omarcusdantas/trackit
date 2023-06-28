import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
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
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

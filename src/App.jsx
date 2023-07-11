import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodayPage from "./pages/TodayPage";
import HabitsPage from "./pages/HabitsPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                    <Route path="/today" element={<TodayPage />} />
                    <Route path="/habits" element={<HabitsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
}

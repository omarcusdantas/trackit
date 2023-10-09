import { useRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../context/UserContext";
import PasswordInput from "../components/PasswordInput";
import authService from "../services/authService";
import { FormContainer } from "../styles/Template";
import logo from "../assets/logo.png";

export default function LoginPage() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const inputRefEmail = useRef(null);
    const persistenceRef = useRef(null);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    function successSignin(userData) {
        setIsDisabled(false);
        const newUserData = {
            name: userData.name,
            token: userData.token,
            progress: 0,
        };
        setUserData(newUserData);

        if (persistenceRef.current.checked) {
            localStorage.setItem("user", JSON.stringify(newUserData));
        }
        navigate("/today");
    }

    async function trySignin(event) {
        event.preventDefault();
        setIsDisabled(true);
        const data = {
            email: inputRefEmail.current.value,
            password: inputPassword,
        };

        try {
            const userData = await authService.signin(data);
            successSignin(userData);
        } catch (error) {
            setIsDisabled(false);
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData(user);
            navigate("/today");
        }
    }, []);

    return (
        <FormContainer>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={trySignin}>
                <input
                    type="email"
                    placeholder="email"
                    required
                    ref={inputRefEmail}
                    disabled={isDisabled}
                    name="email"
                />
                <PasswordInput
                    isSignup={false}
                    inputPassword={inputPassword}
                    setInputPassword={setInputPassword}
                    isDisabled={isDisabled}
                />
                <label>
                    <input type="checkbox" ref={persistenceRef} disabled={isDisabled} />
                    Remember me
                </label>
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Login"}
                </button>
                <Link to="/sign-up">Don't have an account? Sign up!</Link>
            </form>
        </FormContainer>
    );
}

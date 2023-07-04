import { Link, useNavigate } from "react-router-dom";
import { LoginContainer } from "../styles/template";
import logo from "../assets/logo.png";
import axios from "axios";
import React, { useRef, useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../UserContext";
import PasswordInput from "../components/PasswordInput";

export default function LoginPage() {
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const persistenceRef = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData(user);
            navigate("/today");
        }
    }, []);

    function handleForm(event) {
        event.preventDefault();
        setIsDisabled(true);

        const data = {
            email: inputEmailRef.current.value,
            password: inputPasswordRef.current.value,
        };

        axios
            .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", data)
            .then((response) => {
                setIsDisabled(false);
                const newUserData = {
                    name: response.data.name,
                    token: response.data.token,
                    progress: 0,
                };
                setUserData(newUserData);

                if (persistenceRef.current.checked) {
                    localStorage.setItem("user", JSON.stringify(newUserData));
                }

                navigate("/today");
            })
            .catch(() => {
                setIsDisabled(false);
                alert("The email or password is incorrect. Please try again.");
            });
    }

    return (
        <LoginContainer>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={handleForm}>
                <input
                    type="email"
                    placeholder="email"
                    required
                    ref={inputEmailRef}
                    disabled={isDisabled}
                    name="email"
                />
                <PasswordInput
                    isSignup={false}
                    inputPasswordRef={inputPasswordRef}
                    isDisabled={isDisabled}
                ></PasswordInput>
                <label>
                    <input type="checkbox" ref={persistenceRef} disabled={isDisabled} />
                    Remember me
                </label>
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Login"}
                </button>
                <Link to="/sign-up">
                    Don't have an account? Sign up!
                </Link>
            </form>
        </LoginContainer>
    );
}

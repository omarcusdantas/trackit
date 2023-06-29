import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useRef, useState } from "react";
import { LoginContainer } from "../styles/template";
import logo from "../assets/logo.png";
import { ThreeDots } from "react-loader-spinner";

export default function RegisterPage() {
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const inputNameRef = useRef(null);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [rightPassword, setRightPassword] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();

    function passwordsMatch(event) {
        setRepeatPassword(event.target.value);

        if (inputPasswordRef.current.value !== event.target.value) {
            setRightPassword(false);
            return;
        }
        setRightPassword(true);
    }

    function handleForm(event) {
        event.preventDefault();
        const data = {
            email: inputEmailRef.current.value,
            name: inputNameRef.current.value,
            image: "https://http.cat/411.jpg",
            password: inputPasswordRef.current.value,
        };

        if (data.password !== repeatPassword) {
            alert ("Passwords don't match.");
            return;
        }

        if (data.name.length < 2 || data.password.length < 4) {
            alert ("Fill in the form fields correctly.");
            return;
        }

        setIsDisabled(true);

        axios
            .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", data)
            .then(() => {
                setIsDisabled(false);
                navigate("/");
            })
            .catch((error) => {
                setIsDisabled(false);
                if (error.response && error.response.status === 409) {
                    return alert("Email is already registered");
                }
                alert("Fill in the form fields correctly.");
            });
    }

    return (
        <LoginContainer rightPassword={rightPassword}>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={handleForm}>
                <input
                    type="text"
                    placeholder="name"
                    required
                    ref={inputNameRef}
                    disabled={isDisabled}
                    minLength="2"
                />
                <input
                    type="text"
                    placeholder="email"
                    required
                    ref={inputEmailRef}
                    disabled={isDisabled}
                />
                <input
                    type="password"
                    placeholder="password (5 characters min)"
                    required
                    ref={inputPasswordRef}
                    disabled={isDisabled}
                    minLength="5"
                />
                <input
                    type="password"
                    placeholder="repeat password"
                    id="check-password"
                    required
                    onChange={(event) => passwordsMatch(event)}
                    value={repeatPassword}
                    disabled={isDisabled}
                />
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Sign-up"}
                </button>
                <Link to="/">
                    Do you already have an account? Log in!
                </Link>
            </form>
        </LoginContainer>
    );
}
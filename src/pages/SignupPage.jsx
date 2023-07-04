import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useRef, useState } from "react";
import { LoginContainer } from "../styles/template";
import logo from "../assets/logo.png";
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PasswordInput from "../components/PasswordInput";

export default function RegisterPage() {
    const inputEmailRef = useRef(null);
    const inputPasswordRef = useRef(null);
    const inputNameRef = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [rightPassword, setRightPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    function successSignup() {
        setIsDisabled(false);
        let timeoutId;

        MySwal
            .fire({
                icon: "success",
                title: "Account created!",
                confirmButtonText: "Go to Login",
                footer: "Or wait 5 seconds for redirect",
                didOpen: () => {
                    timeoutId = setTimeout(() => {
                        MySwal.close();
                        navigate("/");
                    }, 5000);
                },
            })
            .then((result) => {
                if (result.isConfirmed) {
                    clearTimeout(timeoutId);
                    navigate("/");
                }
            });
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

        if (data.name.length < 2 || data.password.length < 4 || data.name.length > 15 || data.name.length > 20) {
            alert ("Fill in the form fields correctly.");
            return;
        }

        setIsDisabled(true);

        axios
            .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", data)
            .then(() => successSignup())
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
                    ref={inputNameRef} 
                    disabled={isDisabled} 
                    minLength="2"
                    maxLength="15" 
                    name="name"
                    required
                />
                <input 
                    type="text" 
                    placeholder="email" 
                    ref={inputEmailRef} 
                    disabled={isDisabled} 
                    name="email"
                    required
                />
                <PasswordInput
                    isSignup={true}
                    inputPasswordRef={inputPasswordRef}
                    isDisabled={isDisabled}
                    setRepeatPassword={setRepeatPassword}
                    setRightPassword={setRightPassword}
                    rightPassword={rightPassword}
                ></PasswordInput>
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Sign-up"}
                </button>
                <Link to="/">Do you already have an account? Log in!</Link>
            </form>
        </LoginContainer>
    );
}

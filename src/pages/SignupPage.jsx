import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { LoginContainer } from "../styles/template";
import { ThreeDots } from "react-loader-spinner";
import PasswordInput from "../components/PasswordInput";
import logo from "../assets/logo.png";

export default function RegisterPage() {
    const inputRefEmail = useRef(null);
    const inputRefName = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [rightPassword, setRightPassword] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    // Redirect to LoginPage after successful signup 
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

    // Send signup information to API
    function sendInfo(data) {
        axios
            .post(`${import.meta.env.VITE_API_URL}/signup`, data)
            .then(() => successSignup())
            .catch((error) => {
                setIsDisabled(false);
                console.log(error);
                if (error.response) {
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    // Get user's UTC offset
    function getUserUtcOffset() {
        const now = new Date();
        const offsetInMinutes = -now.getTimezoneOffset();
        const offsetInHours = offsetInMinutes / 60;
        return offsetInHours;
    }

    // Validate form inputs
    function handleForm(event) {
        event.preventDefault();
        const data = {
            email: inputRefEmail.current.value,
            name: inputRefName.current.value,
            password: inputPassword,
            utcOffset: getUserUtcOffset(),
        };

        if (data.password !== repeatPassword) {
            return alert ("Passwords don't match.");
        }
        if (data.name.length < 2 || data.password.length < 4 || data.name.length > 15 || data.name.length > 20) {
            return alert ("Fill in the form fields correctly.");
        }

        setIsDisabled(true);
        sendInfo(data);
    }

    return (
        <LoginContainer rightPassword={rightPassword}>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={handleForm}>
                <input 
                    type="text" 
                    placeholder="name" 
                    ref={inputRefName} 
                    disabled={isDisabled} 
                    minLength="2"
                    maxLength="15" 
                    name="name"
                    required
                />
                <input 
                    type="email" 
                    placeholder="email" 
                    ref={inputRefEmail} 
                    disabled={isDisabled} 
                    name="email"
                    required
                />
                <PasswordInput
                    isSignup={true}
                    inputPassword={inputPassword}
                    setInputPassword={setInputPassword}
                    isDisabled={isDisabled}
                    setRepeatPassword={setRepeatPassword}
                    setRightPassword={setRightPassword}
                    rightPassword={rightPassword}
                />
                <button type="submit" disabled={isDisabled}>
                    {isDisabled ? <ThreeDots height="13px" color="#ffffff" /> : "Sign-up"}
                </button>
                <Link to="/">Do you already have an account? Log in!</Link>
            </form>
        </LoginContainer>
    );
}

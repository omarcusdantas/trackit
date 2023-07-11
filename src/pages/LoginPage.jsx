import { useRef, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { LoginContainer } from "../styles/template";
import PasswordInput from "../components/PasswordInput";
import logo from "../assets/logo.png";

export default function LoginPage() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const inputRefEmail = useRef(null);
    const inputRefPersistence = useRef(null);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    // Send inputs to API and store user's login info in local storage if persistence is enabled
    function handleForm(event) {
        event.preventDefault();
        setIsDisabled(true);

        const data = {
            email: inputRefEmail.current.value,
            password: inputPassword,
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

                if (inputRefPersistence.checked) {
                    localStorage.setItem("user", JSON.stringify(newUserData));
                }

                navigate("/today");
            })
            .catch((error) => {
                setIsDisabled(false);
                alert(error);
            });
    }

    // Check if user login information is saved on local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);
            setUserData(user);
            navigate("/today");
        }
    }, []);

    return (
        <LoginContainer>
            <img src={logo} alt="TrackIt" />
            <form onSubmit={handleForm}>
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
                    <input 
                        type="checkbox" 
                        ref={inputRefPersistence} 
                        disabled={isDisabled} 
                    />
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

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function PasswordInput({isSignup, inputPasswordRef, isDisabled, setRightPassword, repeatPassword, setRepeatPassword}) {
    const [showPassword, setShowPassword] = useState(false);

    function togglePassword() {
        setShowPassword(!showPassword);
    };

    function passwordsMatch(event) {
        setRepeatPassword(event.target.value);

        if (inputPasswordRef.current.value !== event.target.value) {
            setRightPassword(false);
            return;
        }
        setRightPassword(true);
    }

    return (
        <>
            <div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    ref={inputPasswordRef}
                    disabled={isDisabled}
                    minLength={isSignup? "4" : undefined}
                    maxLength={isSignup? "20" : undefined}
                    name="password"
                    required
                />
                <button type="button" onClick={togglePassword}>
                    {showPassword? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                </button>
            </div>
            {   isSignup &&
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="repeat password"
                    id="check-password"
                    onChange={(event) => passwordsMatch(event)}
                    value={repeatPassword}
                    disabled={isDisabled}
                    required
                />
            }
        </>
    );
}

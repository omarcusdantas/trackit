import React from "react";
import axios from "axios";
import DayButton from "../DayButton";
import { ThreeDots } from "react-loader-spinner";
import { Container, WeekContainer, ButtonContainer } from "./style";

export default function AddHabit(props) {
    const { toggleAddHabit, updateHabits, token } = props;
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [days, setDays] = React.useState([]);
    const inputNameRef = React.useRef(null);

    // Add and remove habit's days 
    function manageDays(day) {
        const indexToRemove = days.indexOf(day);

        if (indexToRemove !== -1) {
            const updatedDays = [...days];
            updatedDays.splice(indexToRemove, 1);
            return setDays(updatedDays);
        }

        setDays([...days, day]);
    }

    // Validate habit informations
    function registerHabit() {
        const inputName = inputNameRef.current.value;

        if (inputName === "" || inputName.length < 2) {
            return alert("Name must have at least 2 characters.");
        } else if (days.length === 0) {
            return alert("Select at least one day.");
        }

        setIsDisabled(true);
        const data = {
            name: inputName,
            days: days,
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/habits`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateHabits();
                toggleAddHabit();
            })
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

    return (
        <Container>
            <input 
                type="text" 
                placeholder="habit" 
                disabled={isDisabled} 
                ref={inputNameRef} 
                minLength="2" 
            />
            <WeekContainer>
                {daysOfWeek.map((day, index) => (
                    <DayButton
                        key={index}
                        text={day}
                        dayIndex={index}
                        isDisabled={isDisabled}
                        selected={days.includes(index)}
                        handleClick={manageDays}
                    ></DayButton>
                ))}
            </WeekContainer>
            <ButtonContainer>
                <button onClick={toggleAddHabit} disabled={isDisabled}>
                    Cancel
                </button>
                <button onClick={registerHabit} disabled={isDisabled}>
                    {isDisabled && <ThreeDots height="13px" color="#ffffff"></ThreeDots>}
                    {!isDisabled && "Save"}
                </button>
            </ButtonContainer>
        </Container>
    );
}

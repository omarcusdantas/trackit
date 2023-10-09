import { useState, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import DayButton from "../DayButton";
import daysOfWeek from "../../utils/daysOfWeek";
import habitsService from "../../services/habitsService";
import { Container, WeekContainer, ButtonContainer } from "./style";

export default function AddHabit(props) {
    const { toggleAddHabit, updateHabits, token } = props;

    const [isDisabled, setIsDisabled] = useState(false);
    const [days, setDays] = useState([]);
    const inputNameRef = useRef(null);

    async function registerHabit() {
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

        try {
            await habitsService.create(data, token);
            setIsDisabled(false);
            updateHabits();
            toggleAddHabit();
        } catch (error) {
            setIsDisabled(false);
        }
    }

    function manageDays(day) {
        const indexToRemove = days.indexOf(day);

        if (indexToRemove !== -1) {
            const updatedDays = [...days];
            updatedDays.splice(indexToRemove, 1);
            return setDays(updatedDays);
        }

        setDays([...days, day]);
    }

    return (
        <Container>
            <input type="text" placeholder="habit" disabled={isDisabled} ref={inputNameRef} minLength="2" />
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

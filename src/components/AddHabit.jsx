import React from "react";
import styled from "styled-components";
import DayButton from "./DayButton";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

export default function AddHabit({toggleAddHabit, updateHabits, token}) {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [days, setDays] = React.useState([]);
    const inputNameRef = React.useRef(null);

    function manageDays(day) {
        const indexToRemove = days.indexOf(day);
    
        if (indexToRemove !== -1) {
            const updatedDays = [...days];
            updatedDays.splice(indexToRemove, 1);
            setDays(updatedDays);
            return;
        }
    
        setDays([...days, day]);
    }

    function registerHabit() {
        const inputName = inputNameRef.current.value;

        if (inputName === "" ||  inputName.length < 2) {
            alert ("Name must have at least 2 characters.");
            return;
        } else if (days.length === 0) {
            alert ("Select at least one day.");
            return;
        }

        setIsDisabled(true);
        const data = {
            name: inputName,
            days: days
        };

        axios
            .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", data, { headers: {"Authorization" : `Bearer ${token}`}})
            .then(() => {updateHabits(); toggleAddHabit();})
            .catch((error) => {alert(error); setIsDisabled(false);});
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
                {
                    daysOfWeek.map((day, index) => (
                        <DayButton 
                            key={index} 
                            text={day} 
                            dayIndex={index} 
                            isDisabled={isDisabled} 
                            selected={days.includes(index)} 
                            handleClick={manageDays}
                        ></DayButton>
                    ))
                }
            </WeekContainer>
            <ButtonContainer>
                <button onClick={toggleAddHabit} disabled={isDisabled}>Cancel</button>
                <button onClick={registerHabit} disabled={isDisabled}>
                    { isDisabled &&
                        <ThreeDots height="13px" color="#ffffff"></ThreeDots>
                    }
                    { !isDisabled &&
                        "Save"
                    }
                </button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    height: 180px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 20px;
    padding: 0 18px;

    input {
        width: 100%;
        margin-top: 18px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        padding: 0 11px;

        &::placeholder {
            color: #DBDBDB;
        }
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 23px;

    button:first-child {
        border-radius: 4.6px;
        width: 69px;
        height: 20px;
        font-size: 16px;
        color: #52B6FF;
        background-color: #ffffff;
    
        &:disabled {
            cursor: default;
        }
    }

    button:nth-child(2) {
        background-color: #52B6FF;
        border-radius: 4.6px;
        width: 84px;
        height: 35px;
        font-size: 16px;
        color: #ffffff;

        &:disabled {
            background-color: #86CCFF;
            cursor: default;
        }
    }
`;

const WeekContainer = styled.div`
    display: flex;
    gap: 4px;
    margin: 8px 0 29px 0;
`;
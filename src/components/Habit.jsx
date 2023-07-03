import React from "react";
import styled from "styled-components";
import DayButton from "./DayButton";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Habit({info, days, habitId, updateHabits, token}) {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const MySwal = withReactContent(Swal);

    function deleteHabit() {
        axios
            .delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`, { headers: {"Authorization" : `Bearer ${token}`}})
            .then(() => {updateHabits()})
            .catch((error) => console.log(error));
    }

    function confirmDeleteHabit() {
        MySwal.fire({
            title: "Delete habit?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            width: 300,
            confirmButtonColor: "#52B6FF",
            icon: "question"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHabit();
            }
        });
    }

    return (
        <Container>
            <h3>{info}</h3>
            <WeekContainer>
                {
                    daysOfWeek.map((day, index) => {
                        if(days.includes(index)) {
                            return <DayButton key={index} text={day} isDisabled={true} selected={true}></DayButton>
                        }
                        return <DayButton key={index} text={day} isDisabled={true} selected={false}></DayButton>
                    })
                }
            </WeekContainer>
            <button onClick={confirmDeleteHabit}><FaRegTrashCan></FaRegTrashCan></button>
        </Container>
    );
}

const Container = styled.div`
    min-height: 91px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 14px 18px;
    position: relative;

    h3 {
        color: #666666;
        font-size: 20px;
    }

    >button {
        background-color: transparent;
        position: absolute;
        top: 10px;
        right: 8px;
        cursor: pointer;
        border: none;
        font-size: 20px;
    }

`;

const WeekContainer = styled.div`
    display: flex;
    gap: 4px;
    margin: 8px 0 0px 0;
`;
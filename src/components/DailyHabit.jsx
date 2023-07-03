import React, { useState } from "react";
import styled from "styled-components";
import checkImg from "../assets/check.png"
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

export default function DailyHabit({info, token, updateDailyHabits, isDisabled}) {
    const [isLoading, setIsLoading] = useState(false);

    function handleHabit() {
        setIsLoading(true);

        if (info.done === false) {
            axios
                .post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${info.id}/check`, "", { headers: {"Authorization" : `Bearer ${token}`}})
                .then(() => {updateDailyHabits(setIsLoading);})
                .catch((error) => {setIsLoading(false); console.log(error);});
            return;
        }
        axios
            .post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${info.id}/uncheck`, "", { headers: {"Authorization" : `Bearer ${token}`}})
            .then(() => {updateDailyHabits(setIsLoading);})
            .catch((error) => {setIsLoading(false); console.log(error);});
        return;
    }

    return (
        <Container>
            <Text>
                <h3>{info.name}</h3>
                {   
                    info.currentSequence !== undefined &&
                    <div>
                        <p>Current streak:{" "} 
                            <HabitInfo habitStatus={info.done} habitHighest={false}>
                                {info.currentSequence === 1? `1 day` : `${info.currentSequence} days`}
                            </HabitInfo>
                        </p>
                        <p>Highest streak:{" "}
                            <HabitInfo habitHighest={info.currentSequence > 0 && info.currentSequence >= info.highestSequence} habitStatus={false}>
                                {info.highestSequence === 1? `1 day` : `${info.highestSequence} days`}
                            </HabitInfo>
                        </p>
                    </div>
                }
            </Text>
            <Check onClick={handleHabit} habitStatus={info.done} disabled={isDisabled || isLoading}>
                {
                    isLoading? <TailSpin width="40" radius="0" color="#ffffff"/> : <img src={checkImg} alt="Check" />    
                }
            </Check>
        </Container>
    );
}

const Container = styled.div`
    min-height: 91px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 14px 18px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        color: #666666;
        font-size: 20px;
        margin-bottom: 7px;
    }
`;

const Text = styled.div`
    p {
        font-size: 13px;
        color: #666666;
        line-height: 16px;
    }
`;

const HabitInfo = styled.span`
    font-size: 13px;
        
    color: ${(props) => {
        if (props.habitStatus || props.habitHighest) {
            return "#8FC549";
        } 
            return "#666666";
        }};
`;

const Check = styled.button`
    border-radius: 5px;
    min-width: 69px;
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => {
        if (props.habitStatus) {
            return "#8FC549";
        } 
            return "#EBEBEB";
        }};
    
    border: 1px solid ${(props) => {
        if (props.habitSstatus) {
            return "#8FC549";
        } 
            return "#E7E7E7";
        }};
        
    &:disabled {
        cursor: default;
    }
`;


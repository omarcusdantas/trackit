import { useState } from "react";
import axios from "axios";
import { Container, Text, HabitInfo, Check } from "./style";
import checkImg from "../../assets/check.png";
import { TailSpin } from "react-loader-spinner";

export default function DailyHabit(props) {
    const { info, token, updateDailyHabits, isDisabled } = props;
    const [isWaiting, setIsWaiting] = useState(false);

    // Connect to API to set habit as done or not done
    function handleHabit() {
        setIsWaiting(true);

        if (info.done) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/daily-habits/${info.id}/uncheck`, "", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    updateDailyHabits(setIsWaiting);
                })
                .catch((error) => {
                    setIsWaiting(false);
                    console.log(error);
                    if (error.response) {
                        return alert(
                            `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                        );
                    }
                    alert(error.message);
                });
            return;
        }
        axios
            .post(`${import.meta.env.VITE_API_URL}/daily-habits/${info.id}/check`, "", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateDailyHabits(setIsWaiting);
            })
            .catch((error) => {
                setIsWaiting(false);
                console.log(error);
                if (error.response) {
                    return alert(`${error.response.data} Error ${error.response.status}: ${error.response.statusText}`);
                }
                alert(error.message);
            });
    }

    return (
        <Container>
            <Text>
                <h3>{info.name}</h3>
                {info.currentSequence !== undefined && (
                    <div>
                        <p>
                            Current streak:{" "}
                            <HabitInfo habitStatus={info.done} habitHighest={false}>
                                {info.done? 
                                    (info.currentSequence === 0? `1 day` : `${info.currentSequence + 1} days`):
                                    (info.currentSequence === 1? `1 day` : `${info.currentSequence} days`)
                                }
                            </HabitInfo>
                        </p>
                        <p>
                            Highest streak:{" "}
                            <HabitInfo
                                habitHighest={
                                    info.currentSequence >= info.highestSequence &&
                                    (info.done || info.highestSequence > 0)
                                }
                                habitStatus={false}
                            >
                                {info.done? 
                                    (info.highestSequence === 0? `1 day` : `${info.highestSequence + 1} days`):
                                    (info.highestSequence === 1? `1 day` : `${info.highestSequence} days`)
                                }
                            </HabitInfo>
                        </p>
                    </div>
                )}
            </Text>
            <Check onClick={handleHabit} habitStatus={info.done} disabled={isDisabled || isWaiting}>
                {isWaiting ? <TailSpin width="40" radius="0" color="#ffffff" /> : <img src={checkImg} alt="Check" />}
            </Check>
        </Container>
    );
}

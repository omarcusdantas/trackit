// Page to show and handle daily habits

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import styled from "styled-components";
import { PageContainer, Main, Title, Container } from "../styles/template";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import DailyHabit from "../components/DailyHabit/DailyHabit";
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function TodayPage() {
    const { userData, setUserData } = useContext(UserContext);
    const [dailyHabits, setDailyHabits] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();

    // Update progress percentage of daily habits completed
    function updateProgress(habits) {
        let total = 0;
        habits.forEach((habit) => {
            if (habit.done === true) {
                total++;
            }
        });

        const newProgress = Math.round((total / habits.length) * 100);
        setUserData({ ...userData, progress: newProgress });
    }

    // Connect to API to get daily habits
    function getDailyHabits(setIsWaiting) {
        axios
            .get(`${import.meta.env.VITE_API_URL}/daily-habits`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            })
            .then((response) => {
                if (setIsWaiting) {
                    setIsWaiting(false);
                }
                if (pageLoading) {
                    setPageLoading(false);
                }
                setDailyHabits(response.data);
                updateProgress(response.data);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("user");
                navigate("/");
                if (error.response) {
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    // Get daily habits when page loads
    useEffect(() => {
        if (userData && userData.token) {
            getDailyHabits();
        }
    }, []);

    return (
        <PageContainer>
            <TopBar />
            <Main>
                {pageLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        <Title>
                            <TitleContainer>
                                <TitleSpace />
                                <h2>{dayjs().format("dddd, DD/M")}</h2>
                                <ProgressContainer dailyProgress={userData && userData.progress}>
                                    {userData.progress === 0 || isNaN(userData.progress)
                                        ? `No habits completed yet`
                                        : `${userData.progress}% of habits completed`}
                                </ProgressContainer>
                            </TitleContainer>
                        </Title>
                        <Container>
                            {dailyHabits.length === 0 ? (
                                <p>Nothing to do today.</p>
                            ) : (
                                dailyHabits.map((dailyHabit, index) => (
                                    <DailyHabit
                                        key={index}
                                        info={dailyHabit}
                                        token={userData.token}
                                        updateDailyHabits={getDailyHabits}
                                        isDisabled={false}
                                    />
                                ))
                            )}
                        </Container>
                    </>
                )}
            </Main>
            <Menu />
        </PageContainer>
    );
}

const ProgressContainer = styled.p`
    font-size: 18px;

    color: ${(props) => {
        if (props.dailyProgress === 0 || isNaN(props.dailyProgress)) {
            return "#bababa";
        }
        return "#8fc549";
    }};
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TitleSpace = styled.div`
    height: 8px;
`;

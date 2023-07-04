import React from "react";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import DailyHabit from "../components/DailyHabit";
import { UserContext } from "../UserContext";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";
import styled from "styled-components";
import TodayDate from "../components/TodayDate";
import LoadingScreen from "../components/LoadingScreen";

export default function TodayPage() {
    const { userData, setUserData } = React.useContext(UserContext);
    const [dailyHabits, setDailyHabits] = React.useState([]);
    const [pageLoading, setPageLoading] = React.useState(true);

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

    function getDailyHabits(setIsLoading) {
        axios
            .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
                headers: { "Authorization": `Bearer ${userData.token}` }
            })
            .then((response) => {
                if (setIsLoading) {
                    setIsLoading(false);
                }
                setPageLoading(false);
                setDailyHabits(response.data);
                updateProgress(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (userData && userData.token) {
            getDailyHabits();
        }
    }, []);

    return (
        <PageContainer>
            <TopBar></TopBar>
            <Main>
                {   pageLoading? 
                    <LoadingScreen></LoadingScreen> :
                    <>
                        <Title>
                            <TitleContainer>
                                <TitleSpace></TitleSpace>
                                <TodayDate></TodayDate>
                                <ProgressContainer dailyProgress={userData && userData.progress}>
                                    {userData &&
                                        (userData.progress === 0 || isNaN(userData.progress)
                                            ? `No habits completed yet`
                                            : `${userData.progress}% of habits completed`)}
                                </ProgressContainer>
                            </TitleContainer>
                        </Title>
                        <Container>
                            {dailyHabits.length === 0 && <p>Nothing to do today.</p>}
                            {dailyHabits.length !== 0 &&
                                dailyHabits.map((dailyHabit, index) => (
                                    <DailyHabit
                                        key={index}
                                        info={dailyHabit}
                                        token={userData.token}
                                        updateDailyHabits={getDailyHabits}
                                    ></DailyHabit>
                                ))}
                        </Container>
                    </>
                }
            </Main>
            <Menu></Menu>
        </PageContainer>
    );
}

const ProgressContainer = styled.p`
    font-size: 18px;
    
    color: ${(props) => {
        if (props.dailyProgress === 0 || isNaN(props.dailyProgress)) {
            return "#BABABA";
        }
        return "#8FC549";
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

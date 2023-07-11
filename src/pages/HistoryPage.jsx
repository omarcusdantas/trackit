// Page with calendar to track passed days habits

import { useEffect, useContext, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { PageContainer, Main, Title, Container } from "../styles/template";
import CalendarContainer from "../styles/Calendar";
import Calendar from "react-calendar";
import { UserContext } from "../UserContext";
import DailyHabit from "../components/DailyHabit/DailyHabit";
import LoadingScreen from "../components/LoadingScreen";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";

export default function HistoricPage() {
    const { userData } = useContext(UserContext);
    const [pageState, setPageState] = useState({
        history: [],
        selectedDate: null,
        showHabits: false,
        habitsInfo: {},
        pageLoading: true,
    });

    // Check if there is any daily habit on clicked day and shows on screen
    function handleDateChange(date) {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        const formattedDay = dayjs(date).format("dddd");
        const habitsOfDay = pageState.history.find((item) => item.day === formattedDate);

        if (habitsOfDay && formattedDate !== dayjs().format("DD/MM/YYYY")) {
            setPageState({
                ...pageState,
                habitsInfo: {
                    date: `${formattedDay}, ${formattedDate}`,
                    habits: habitsOfDay.habits,
                },
                showHabits: true,
            });
        }
        setPageState({
            ...pageState,
            selectedDate: date,
        });
    }

    // Set colors of dates depending on user's completion of daily habits
    function tileClassName({ date, view }) {
        if (view === "year") {
            return null;
        }

        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        const today = dayjs().format("DD/MM/YYYY");
        const habitsOfDay = pageState.history.find((item) => item.day === formattedDate);

        if (formattedDate === today) {
            return null;
        } else if (habitsOfDay && habitsOfDay.habits.some((habit) => !habit.done)) {
            return "not-done";
        } else if (habitsOfDay && habitsOfDay.habits.every((habit) => habit.done)) {
            return "done";
        }
        return null;
    }

    // Get user's history from API
    useEffect(() => {
        if (userData && userData.token) {
            axios
                .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", {
                    headers: { Authorization: `Bearer ${userData.token}` },
                })
                .then((response) => {
                    setPageState({
                        ...pageState,
                        history: response.data,
                        pageLoading: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    alert(error);
                });
        }
    }, []);

    return (
        <PageContainer>
            <TopBar />
            {!pageState.showHabits ?
                (<Main>
                    {pageState.pageLoading ?
                        <LoadingScreen /> :
                        (<>
                            <Title>
                                <h2>History</h2>
                            </Title>
                            <CalendarContainer>
                                <Calendar
                                    className="react-calendar"
                                    locale="en-US"
                                    weekStartsOn={0}
                                    tileClassName={tileClassName}
                                    onChange={handleDateChange}
                                    value={pageState.selectedDate}
                                    maxDate={new Date()}
                                ></Calendar>
                            </CalendarContainer>
                        </>)
                    }
                </Main>) :
                (<Main>
                    <Title>
                        <h2>{pageState.habitsInfo.date}</h2>
                        <button onClick={() => setPageState({ ...pageState, showHabits: false })}>
                            <p>x</p>
                        </button>
                    </Title>
                    <Container>
                        {pageState.habitsInfo.habits.map((dailyHabit, index) => (
                            <DailyHabit 
                                key={index}
                                info={dailyHabit}
                                isDisable={true}
                            />
                        ))}
                    </Container>
                </Main>)
            }
            <Menu />
        </PageContainer>
    );
}

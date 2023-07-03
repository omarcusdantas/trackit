import React from "react";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import { PageContainer, Main, Title, Container } from "../styles/template";
import Calendar from 'react-calendar';
import { UserContext } from "../UserContext";
import axios from "axios";
import dayjs from 'dayjs';
import { CalendarContainer } from "../styles/Calendar";
import DailyHabit from "../components/DailyHabit";

export default function HistoricPage() {
    const { userData } = React.useContext(UserContext);
    const [history, setHistory] = React.useState([]);
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [showHabits, setShowHabits] = React.useState(false);
    const [habitsInfo, setHabitsInfo] = React.useState({});

    React.useEffect(() => {
        if (userData && userData.token) {
            axios
                .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", { headers: {"Authorization" : `Bearer ${userData.token}`}})
                .then((response) => {
                    setHistory(response.data);
                    console.log(response.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    function tileClassName({ date, view }) {
        if (view === "year") {
            return null;
        }

        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        const today = dayjs().format("DD/MM/YYYY");
        const habitsOfDay = history.find((item) => item.day === formattedDate);

        if (formattedDate === today) {
            return null;
        } else if (habitsOfDay && habitsOfDay.habits.some((habit) => !habit.done)) {
            return "not-done";
        } else if (habitsOfDay && habitsOfDay.habits.every((habit) => habit.done)) {
            return "done";
        }
        return null;
    }
    
    function handleDateChange(date) {
        const formattedDate = dayjs(date).format("DD/MM/YYYY");
        const formattedDay = dayjs(date).format("dddd");
        const habitsOfDay = history.find((item) => item.day === formattedDate);
        
        if (habitsOfDay && formattedDate !== dayjs().format("DD/MM/YYYY")) {
            setHabitsInfo({
                date: `${formattedDay}, ${formattedDate}`,
                habits: habitsOfDay.habits
            });
            setShowHabits(true);
        }
        setSelectedDate(date);
    }

    return (
        <PageContainer>
            <TopBar></TopBar>
            {
                !showHabits &&
                <Main>
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
                                value={selectedDate}
                                maxDate={new Date()}
                            ></Calendar>
                        </CalendarContainer>
                </Main>
            }
            {
                showHabits &&
                <Main>
                    <Title>
                        <h2>{habitsInfo.date}</h2>
                        <button onClick={() => setShowHabits(false)}><p>x</p></button>
                    </Title>
                    <Container>
                        {habitsInfo.habits.map((dailyHabit, index) => (
                            <DailyHabit 
                                key={index} 
                                info={dailyHabit} 
                                isDisabled={true}
                            ></DailyHabit>
                        ))}
                    </Container>
                </Main>
            }
            <Menu></Menu>
        </PageContainer>
    );
}
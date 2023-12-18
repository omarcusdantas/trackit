import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Calendar from "react-calendar";
import { UserContext } from "../context/UserContext";
import DailyActivity from "../components/DailyActivity/DailyActivity";
import LoadingScreen from "../components/LoadingScreen";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import historyService from "../services/historyService";
import { PageContainer, Main, Title, Container } from "../styles/Template";
import CalendarContainer from "../styles/Calendar";

export default function HistoricPage() {
  const { userData } = useContext(UserContext);
  const [pageState, setPageState] = useState({
    history: [],
    showHabits: false,
    habitsInfo: {},
    pageLoading: true,
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  function disableShowHabits() {
    setPageState({ ...pageState, showHabits: false });
  }

  function handleDateChange(date) {
    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const formattedDay = dayjs(date).format("dddd");
    const habitsOfDay = pageState.history.find((day) => day.date === formattedDate);

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
    setSelectedDate(date);
  }

  function tileClassName({ date, view }) {
    if (view === "year") {
      return null;
    }

    const formattedDate = dayjs(date).format("DD/MM/YYYY");
    const today = dayjs().format("DD/MM/YYYY");
    const habitsOfDay = pageState.history.find((day) => day.date === formattedDate);

    if (formattedDate === today) {
      return null;
    } else if (habitsOfDay && habitsOfDay.habits.some((habit) => !habit.done)) {
      return "not-done";
    } else if (habitsOfDay && habitsOfDay.habits.every((habit) => habit.done)) {
      return "done";
    }
    return null;
  }

  async function getHistory() {
    try {
      const history = await historyService.get(userData.token);
      setPageState({
        ...pageState,
        history: history,
        pageLoading: false,
      });
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }

  useEffect(() => {
    if (userData && userData.token) {
      getHistory();
    }
  }, []);

  return (
    <PageContainer>
      <TopBar />
      <Main>
        {pageState.pageLoading && <LoadingScreen />}
        {!pageState.pageLoading && !pageState.showHabits && (
          <>
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
          </>
        )}
        {!pageState.pageLoading && pageState.showHabits && (
          <>
            <Title>
              <h2>{pageState.habitsInfo.date}</h2>
              <button onClick={disableShowHabits}>
                <p>x</p>
              </button>
            </Title>
            <Container>
              {pageState.habitsInfo.habits.map((dailyHabit, index) => (
                <DailyActivity key={index} info={dailyHabit} isDisabled={true} />
              ))}
            </Container>
          </>
        )}
      </Main>
      <Menu />
    </PageContainer>
  );
}

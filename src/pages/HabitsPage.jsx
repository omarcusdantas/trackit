import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import AddHabit from "../components/AddHabit/AddHabit";
import Habit from "../components/Habit";
import { UserContext } from "../context/UserContext";
import habitsService from "../services/habitsService";
import { PageContainer, Main, Title, Container } from "../styles/Template";

export default function HabitsPage() {
    const [isAddHabit, setIsAddHabit] = useState(false);
    const [habits, setHabits] = useState([]);
    const { userData } = useContext(UserContext);
    const [pageLoading, setPageLoading] = useState(true);
    const navigate = useNavigate();

    function toggleAddHabit() {
        setIsAddHabit(!isAddHabit);
    }

    async function getHabits() {
        try {
            const habits = await habitsService.get(userData.token);
            setHabits(habits);
            if (pageLoading) {
                setPageLoading(false);
            }
        } catch (error) {
            localStorage.removeItem("user");
            navigate("/");
        }
    }

    useEffect(() => {
        if (userData && userData.token) {
            getHabits();
        }
    }, []);

    return (
        <PageContainer>
            <TopBar />
            <Main>
                {pageLoading && <LoadingScreen />}
                {!pageLoading && (
                    <>
                        <Title>
                            <h2>My Habits</h2>
                            <button onClick={toggleAddHabit}>
                                <p>+</p>
                            </button>
                        </Title>
                        {isAddHabit && (
                            <AddHabit toggleAddHabit={setIsAddHabit} updateHabits={getHabits} token={userData.token} />
                        )}
                        <Container>
                            {habits.length == 0 && <p>Add a habit to start tracking it</p>}
                            {habits.length !== 0 &&
                                habits.map((habit, index) => (
                                    <Habit
                                        key={index}
                                        info={habit.name}
                                        days={habit.days}
                                        habitId={habit.id}
                                        updateHabits={getHabits}
                                        token={userData.token}
                                    />
                                ))}
                        </Container>
                    </>
                )}
            </Main>
            <Menu />
        </PageContainer>
    );
}

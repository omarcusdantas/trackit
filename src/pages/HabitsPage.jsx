import React from "react";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import AddHabit from "../components/AddHabit";
import Habit from "../components/Habit";
import { UserContext } from "../UserContext";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";

export default function HabitsPage() {
    const [isAddHabit, setIsAddHabit] = React.useState(false);
    const [habits, setHabits] = React.useState([]);
    const { userData } = React.useContext(UserContext);

    function getHabits() {
        axios
            .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", { headers: {"Authorization" : `Bearer ${userData.token}`}})
            .then((response) => {
                setHabits(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        if (userData && userData.token) {
            getHabits();
        }
    }, []);

    function toggleAddHabit() {
        setIsAddHabit(!isAddHabit);
    }

    return (
        <PageContainer>
            <TopBar></TopBar>
            <Main>
                <Title>
                    <h2>My Habits</h2>
                    <button onClick={toggleAddHabit}><p>+</p></button>
                </Title>
                {   
                    isAddHabit &&
                    <AddHabit 
                        toggleAddHabit={toggleAddHabit} 
                        updateHabits={getHabits} 
                        token={userData.token}
                    ></AddHabit>
                }
                <Container>
                    {
                        habits.length == 0 &&
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    }
                    {
                        habits.length !== 0 &&
                        habits.map((habit, index) => (
                            <Habit 
                                key={index} 
                                info={habit.name} 
                                days={habit.days} 
                                habitId={habit.id} 
                                updateHabits={getHabits} 
                                token={userData.token}
                            ></Habit>
                        ))
                    }
                </Container>
            </Main>
            <Menu></Menu>
        </PageContainer>
    );
}

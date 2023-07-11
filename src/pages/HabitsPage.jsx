// Page to add and exclude habits

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { PageContainer, Main, Title, Container } from "../styles/template";
import LoadingScreen from "../components/LoadingScreen";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import AddHabit from "../components/AddHabit/AddHabit";
import Habit from "../components/Habit";

export default function HabitsPage() {
    const [isAddHabit, setIsAddHabit] = useState(false);
    const [habits, setHabits] = useState([]);
    const { userData } = useContext(UserContext);
    const [pageLoading, setPageLoading] = useState(true);

    // Get user's habits from API
    function getHabits() {
        axios
            .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                headers: {"Authorization" : `Bearer ${userData.token}` },
            })
            .then((response) => {
                if (pageLoading) {
                    setPageLoading(false);
                }

                setHabits(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }

    // Get user's habits when page loads
    useEffect(() => {
        if (userData && userData.token) {
            getHabits();
        }
    }, []);

    return (
        <PageContainer>
            <TopBar />
            <Main>
                {pageLoading?
                    <LoadingScreen /> :
                    (<>
                        <Title>
                            <h2>My Habits</h2>
                            <button onClick={() => setIsAddHabit(!isAddHabit)}><p>+</p></button>
                        </Title>
                        {   
                            isAddHabit &&
                            <AddHabit 
                                toggleAddHabit={setIsAddHabit} 
                                updateHabits={getHabits} 
                                token={userData.token}
                            />
                        }
                        <Container>
                            {habits.length == 0 &&
                                <p>Add a habit to start tracking it</p>
                            }
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
                                ))
                            }
                        </Container>
                    </>)
                }
            </Main>
            <Menu />
        </PageContainer>
    );
}

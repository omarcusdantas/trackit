import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar/TopBar";
import DailyActivity from "../components/DailyActivity/DailyActivity";
import LoadingScreen from "../components/LoadingScreen";
import { UserContext } from "../context/UserContext";
import dailyActivitiesService from "../services/dailyActivitiesService";
import { PageContainer, Main, Title, Container } from "../styles/Template";

export default function TodayPage() {
  const { userData, setUserData } = useContext(UserContext);
  const [dailyActivities, setDailyActivities] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();

  function updateProgress(dailyActivities) {
    let total = 0;
    dailyActivities.forEach((habit) => {
      if (habit.done === true) {
        total++;
      }
    });

    const newProgress = Math.round((total / dailyActivities.length) * 100);
    setUserData({ ...userData, progress: newProgress });
  }

  async function getDailyActivities(setIsWaiting) {
    try {
      const dailyActivities = await dailyActivitiesService.get(userData.token);
      setDailyActivities(dailyActivities);
      updateProgress(dailyActivities);
      if (setIsWaiting) {
        setIsWaiting(false);
      }
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
      getDailyActivities();
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
              <TitleContainer>
                <TitleSpace />
                <h2>{dayjs().format("dddd, DD/M")}</h2>
                <ProgressContainer $dailyProgress={userData && userData.progress}>
                  {userData.progress === 0 || isNaN(userData.progress)
                    ? `No habits completed yet`
                    : `${userData.progress}% of habits completed`}
                </ProgressContainer>
              </TitleContainer>
            </Title>
            <Container>
              {dailyActivities.length == 0 && <p>Add a habit to start tracking it</p>}
              {dailyActivities.length !== 0 &&
                dailyActivities.map((dailyHabit, index) => (
                  <DailyActivity
                    key={index}
                    info={dailyHabit}
                    token={userData.token}
                    updateDailyActivities={getDailyActivities}
                    isDisabled={false}
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

const ProgressContainer = styled.p`
  font-size: 18px;

  color: ${(props) => {
    if (props.$dailyProgress === 0 || isNaN(props.$dailyProgress)) {
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

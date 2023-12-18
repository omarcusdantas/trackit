import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import dailyActivitiesService from "../../services/dailyActivitiesService";
import checkImg from "../../assets/check.png";
import { Container, Text, HabitInfo, Check } from "./style";

export default function DailyActivity(props) {
  const { info, token, updateDailyActivities, isDisabled } = props;
  const { id, name, done, currentSequence, highestSequence } = info;

  const [isWaiting, setIsWaiting] = useState(false);

  async function trackHabit() {
    setIsWaiting(true);
    if (done) {
      try {
        await dailyActivitiesService.track(id, token, "uncheck");
        updateDailyActivities(setIsWaiting);
      } catch (error) {
        setIsWaiting(false);
      }
      return;
    }

    try {
      await dailyActivitiesService.track(id, token, "check");
      updateDailyActivities(setIsWaiting);
    } catch (error) {
      setIsWaiting(false);
    }
  }

  return (
    <Container>
      <Text>
        <h3>{name}</h3>
        {currentSequence !== undefined && (
          <div>
            <p>
              Current streak:
              <HabitInfo $status={done} $highest={false}>
                {currentSequence === 1 ? ` 1 day` : ` ${currentSequence} days`}
              </HabitInfo>
            </p>
            <p>
              Highest streak:
              <HabitInfo $highest={currentSequence > 0 && currentSequence >= highestSequence} $status={false}>
                {highestSequence === 1 ? ` 1 day` : ` ${highestSequence} days`}
              </HabitInfo>
            </p>
          </div>
        )}
      </Text>
      <Check onClick={trackHabit} $status={done} disabled={isDisabled || isWaiting}>
        {isWaiting ? <TailSpin width="40" radius="0" color="#ffffff" /> : <img src={checkImg} alt="Check" />}
      </Check>
    </Container>
  );
}

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

function TodayDate() {
  const currentDate = dayjs().format("dddd, DD/M");
  return <h2 data-test="today">{currentDate}</h2>;
}

export default TodayDate;
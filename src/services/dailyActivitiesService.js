import axios from "axios";
const url = import.meta.env.VITE_API_URL;

function handleApiError(error, showAlert) {
  console.log(error);
  if (!showAlert) {
    return;
  }
  if (error.response) {
    return alert(`${error.response.data}. Error ${error.response.status}`);
  }
  alert(error.message);
}

async function get(token) {
  try {
    const dailyActivities = await axios.get(`${url}/daily-activities`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return dailyActivities.data;
  } catch (error) {
    co;
    handleApiError(error, false);
    throw error;
  }
}

async function track(habitId, token, action) {
  try {
    await axios.put(`${url}/daily-activities/${habitId}/${action}`, "", {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleApiError(error, true);
    throw error;
  }
}

const dailyActivitiesService = {
  get,
  track,
};
export default dailyActivitiesService;

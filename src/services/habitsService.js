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
    const habits = await axios.get(`${url}/habits`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return habits.data;
  } catch (error) {
    handleApiError(error, false);
    throw error;
  }
}

async function create(data, token) {
  try {
    await axios.post(`${url}/habits`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleApiError(error, true);
    throw error;
  }
}

async function deleteById(habitId, token) {
  try {
    await axios.delete(`${url}/habits/${habitId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    handleApiError(error, true);
    throw error;
  }
}

const habitsService = {
  get,
  create,
  deleteById,
};
export default habitsService;

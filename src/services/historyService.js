import axios from "axios";
const url = import.meta.env.VITE_API_URL;

async function get(token) {
  try {
    const history = await axios.get(`${url}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return history.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const historyService = {
  get,
};
export default historyService;

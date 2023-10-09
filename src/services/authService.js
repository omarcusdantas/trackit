import axios from "axios";
const url = import.meta.env.VITE_API_URL;

function handleApiError(error, showAlert) {
    console.log(error);
    if (!showAlert) {
        return;
    }
    if (error.response) {
        return alert(
            `${error.response.data}. Error ${error.response.status}`
        );
    }
    alert(error.message);
}

async function signup(data) {
    try {
        await axios.post(`${url}/signup`, data);
    } catch (error) {
        handleApiError(error, true);
        throw error;
    }
}

async function signin(data) {
    try {
        const response = await axios.post(`${url}/signin`, data);
        return response.data;
    } catch (error) {
        handleApiError(error, true);
        throw error;
    }
}

const authService = { 
    signup, 
    signin,
};
export default authService;

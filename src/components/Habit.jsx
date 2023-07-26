import styled from "styled-components";
import DayButton from "./DayButton";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Habit(props) {
    const { info, days, habitId, updateHabits, token } = props;
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    const MySwal = withReactContent(Swal);

    // Connect to API to delete habit
    function deleteHabit() {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/habits/${habitId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                updateHabits();
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    return alert(
                        `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
                    );
                }
                alert(error.message);
            });
    }

    // Habit delete alert
    function confirmDeleteHabit() {
        MySwal.fire({
            title: "Delete habit?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            width: 300,
            confirmButtonColor: "#52B6FF",
            icon: "question",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteHabit();
            }
        });
    }

    return (
        <Container>
            <h3>{info}</h3>
            <WeekContainer>
                {daysOfWeek.map((day, index) =>
                    <DayButton 
                        key={index} 
                        text={day} 
                        isDisabled={true} 
                        selected={days.includes(index)}
                    />
                )}
            </WeekContainer>
            <button onClick={confirmDeleteHabit}>
                <FaRegTrashCan />
            </button>
        </Container>
    );
}

const Container = styled.div`
    background-color: #ffffff;
    padding: 14px 18px;
    min-height: 91px;
    border-radius: 5px;
    position: relative;

    h3 {
        color: #666666;
        font-size: 20px;
    }

    > button {
        background-color: transparent;
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 8px;
        cursor: pointer;
        border: none;
    }
`;

const WeekContainer = styled.div`
    margin-top: 8px;
    display: flex;
    gap: 4px;
`;

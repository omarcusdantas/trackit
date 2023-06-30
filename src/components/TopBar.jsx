import React from "react";
import styled from "styled-components";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from "../UserContext";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
    const { userData } = React.useContext(UserContext);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!userData || !userData.name) {
            navigate("/");
        }
    }, [userData, navigate]);

    function logout() {
        MySwal.fire({
            title: "Logout?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No",
            width: 300,
            confirmButtonColor: "#52B6FF"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("user");
                navigate("/");
            }
        });
    }

    if (!userData || !userData.name) {
        return null; // Render nothing if user data is not available
    }

    return (
        <Bar>
            <Container>
                <h1>TrackIt</h1>
                <UserContainer>
                    <h2>{userData.name}</h2>
                    <button onClick={logout}><LogoutIcon /></button>
                </UserContainer>
            </Container>
        </Bar>
    );
}

const Bar = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    height: 70px;
    z-index: 1;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Container = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;

    h1 {
        color: #ffffff;
        font-family: "Playball", sans-serif;
        font-size: 39px;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 10px;

    h2 {
        font-size: 18px;
        color: #ffffff;
        text-align: end;
        line-height: 25px;
        text-wrap: balance;
    }

    button {
        border: none;
        background-color: transparent;
        padding: 0;
        height: 25px;
    }
`;

const LogoutIcon = styled(RiLogoutBoxRLine)`
    font-size: 25px;
    color: #ffffff;
`;
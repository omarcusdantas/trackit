import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

export default function LoadingScreen() {
    return (
        <Container>
            <RotatingLines 
                strokeColor="#52B6FF"
                strokeWidth="4"
                width="80"
            ></RotatingLines>
        </Container>
    );
}

const Container = styled.div`
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
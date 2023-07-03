import styled from "styled-components";

export const LoginContainer = styled.div`
    height: 667px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        margin: 68px 0 33px 0;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 6px;
        height: 300px;
        align-items: center;
    }

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        padding: 0 11px;

        &::placeholder {
            color: #DBDBDB;
        }
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #52B6FF;
        color: #ffffff;
        font-size: 20px;
        width: 303px;
        height: 45px;
        border: none;
        border-radius: 4.6px;
        transition: all 0.3s ease;

        &:disabled {
            background-color: #86CCFF;
            cursor: default;
        }

        &:not(:disabled):hover {
            background-color: #5470FF;
        }
    }

    a {
        margin-top: 25px;
        font-size: 14px;
        color: #52B6FF;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 10px;
        border: 1px solid #D5D5D5;
        color: #7A7A7A;
        border-radius: 4.6px;
        padding: 5px;
    }

    input[type="checkbox"] {
        width: 23px;
        height: 23px;
    }

    #check-password {
        background-color: ${(props) => {
            if (props.rightPassword) {
                return;
            }
            return "#F9C0C0";
        }};
    }
`;

export const PageContainer = styled.div`
    background-color: #F2F2F2;
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;

export const Main = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 92px;
    margin-bottom: 115px;
    padding: 0 20px;
`;

export const Title = styled.div`
    min-height: 35px;
    display: flex;
    justify-content: center;
    align-items: end;
    position: relative;

    h2 {
        text-align: center;
        font-size: 23px;
        color: #126BA5;
    }

    button {
        width: 40px;
        height: 35px;
        background-color: #52B6FF;
        border-radius: 4.6px;
        position: absolute;
        right: 0;

        p {
            color: #ffffff;
            font-size: 27px;
            position: absolute;
            top: -2px;
            left: 11.7px;
        }
    }

`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 29px;

    p {
        font-size: 18px;
        color: #666666;
        line-height: 22px;
        text-align: center;
    }
`;


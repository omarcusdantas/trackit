import styled from "styled-components";

export const Container = styled.div`
    background-color: #ffffff;
    min-height: 91px;
    padding: 14px 18px;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
        color: #666666;
        font-size: 20px;
        margin-bottom: 7px;
    }
`;

export const Text = styled.div`
    p {
        font-size: 13px;
        color: #666666;
        line-height: 16px;
        text-align: left;
    }
`;

export const HabitInfo = styled.span`
    font-size: 13px;

    color: ${(props) => {
        if (props.$status || props.$highest) {
            return "#8FC549";
        }
        return "#666666";
    }};
`;

export const Check = styled.button`
    min-width: 69px;
    width: 69px;
    height: 69px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) => {
        if (props.$status) {
            return "#8FC549";
        }
        return "#EBEBEB";
    }};

    border: 1px solid
        ${(props) => {
            if (props.$status) {
                return "#8FC549";
            }
            return "#E7E7E7";
        }};

    &:disabled {
        cursor: default;
    }
`;

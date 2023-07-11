import { useState } from "react";
import styled from "styled-components";

export default function DayButton(props) {
    const { text, isDisabled, selected, handleClick, dayIndex } = props;
    const [isSelected, setIsSelected] = useState(selected);

    // Send selected day to manageDays function
    function toggleSelected() {
        setIsSelected(!isSelected);
        handleClick(dayIndex);
    }

    return (
        <Button 
            selected={isSelected} 
            onClick={toggleSelected} 
            disabled={isDisabled}
        >
            {text}
        </Button>
    );
}

const Button = styled.button`
    text-align: center;
    font-size: 20px;
    height: 30px;
    width: 30px;
    border-radius: 5px;
    padding: 0;

    background-color: ${(props) => {
        if (props.selected === true) {
            return "#CFCFCF";
        }
        return "#FFFFFF";
    }};

    color: ${(props) => {
        if (props.selected === true) {
            return "#ffffff";
        }
        return "#DBDBDB";
    }};

    border: 1px solid
        ${(props) => {
            if (props.selected === true) {
                return "#CFCFCF";
            }
            return "#D5D5D5";
    }};

    &:disabled {
        cursor: default;
    }
`;

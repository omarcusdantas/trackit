import React from "react";
import styled from "styled-components";

export default function DayButton({text, isDisabled, selected, handleClick, dayIndex}) {
    const [isSelected, setIsSelected] = React.useState(selected);

    function toggleSelected() {
        setIsSelected(!isSelected);
        handleClick(dayIndex);
    }

    return (
        <Button selected={isSelected} onClick={toggleSelected} disabled={isDisabled}>
            {text}
        </Button>
    );
}

const Button = styled.button`
    height: 30px;
    width: 30px;
    border-radius: 5px;
    font-size: 20px;
    padding: 0;
    text-align: center;

    background-color: ${(props) => {
        if (props.selected === true) {
            return "#CFCFCF";
        } 
        return "#FFFFFF";
    }};
    border: 1px solid ${(props) => {
        if (props.selected === true) {
            return "#CFCFCF";
        } 
        return "#D5D5D5";
    }};
    color: ${(props) => {
        if (props.selected === true) {
            return "#ffffff";
        } 
        return "#DBDBDB";
    }};

    &:disabled {
        cursor: default;
    }
`;

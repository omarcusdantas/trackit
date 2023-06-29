import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        font-family: "Lexend Deca", sans-serif;
    }

    button, input[type="submit"] {
        cursor: pointer;
        border: none;
        font-family: "Lexend Deca", sans-serif;
    }

    input {
        font-family: "Lexend Deca", sans-serif;
        color: #666666;
    }

    .swal2-icon {
        justify-self: center;
        margin-top: 20px;
    }
`;

export default GlobalStyle;

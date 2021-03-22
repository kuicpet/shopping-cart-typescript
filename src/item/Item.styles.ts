import styled from "styled-components";


export const Wrapper = styled.div`
    display: flex;
    justify-content: column;
    flex-direction: column;
    width: 100%;
    height: 100%;
    text-transform: capitalize;
    padding: 1rem;

    button {
        width: 50%;
        margin: 0 auto;
        padding: 6px 16px;
        background-color: orange;
        & :hover {
            background-color: black;
            color: white;
        }
    }

    img {
        height: 250px;
        object-fit: cover;
        background-color: lightgray;
        vertical-align: middle;
    }

    div {
        font-family: sans-serif;
        padding: 1rem;
        height: 50%;
        cursor: pointer;
    }
`;
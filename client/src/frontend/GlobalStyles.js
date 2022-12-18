import { createGlobalStyle, css } from "styled-components";

// createGlobalStyle returns a component that DOESN'T accept any children!

// the css`${}` here is a workaround to apply text formatting in our IDE, for whatever reason createGlobalStyle is not recognized by Prettier or some other formatting extension/library
const GlobalStyles = createGlobalStyle`${css`
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 67.5%;
    font-family: monospace;
    background-color: whitesmoke;
    color: black;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  div {
    animation: fadeInAnimation ease-in-out 1s;
    animation-iteration-count: 1;

    @keyframes fadeInAnimation {
      start {
        opacity: 0;
      }
      end {
        opacity: 1;
      }
    }
  }

  button {
    display: inline-block;
    position: relative;
    // relative position for tooltip popup
    font-weight: 600;
    font-size: 1.5rem;
    color: black;

    border-radius: 2.5px;
    margin: 0 auto;
    border: none;
    height: 3.5rem;
    width: 10rem;
    padding: 0.5rem;
    text-align: center;
    background-color: powderblue;

    padding: 0.5rem;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
      0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
      0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
    animation: fadeInAnimation ease-in-out 1s;
    animation-iteration-count: 1;

    @keyframes fadeInAnimation {
      start {
        opacity: 0;
      }
      end {
        opacity: 1;
      }
    }

    &:is {
    }
  }
`}`;

export default GlobalStyles;

import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import ModalWindow from "./components/ModalWindow/ModalWindow.jsx";
/////////////////////////////////////////
import { useState, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
/////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";

  // this would then get drilled down to ModalTable which displays these amounts as separate AND fully amalgamated values!

  // if the key is NOT an empty array the marquee is therefore also SET
  // Simply do a CHECk in the ModalWindow component to see which Marquee's have value

  // [{ ltr: quantity }]
  const InitAppState = {
    East: { setInput: [], compareInput: [] },
    West: { setInput: [], compareInput: [] },
    South: { setInput: [], compareInput: [] },
  };
  const reducer = (state, action) => {
    console.log("action.type:", action.type);
    console.log("action.payload:", action.payload);
    console.log("state:", state);
    /*
    types:
- post (set)
- patch (update)
- reset (reset to [])
    */
  };

  const [appState, dispAppState] = useReducer(reducer, InitAppState);

  // MODAL POPUP STATE:
  const [modalState, toggleModal] = useState(true);

  const marqSizes = {
    East: 42,
    West: 42,
    South: 84,
  };

  // look into creating dark-mode functionality here
  const theme = {
    colors: {
      button: "powderblue",
    },
    dark: {},
    light: {},
  };

  const marKeysArr = Object.keys(appState);
  console.log("marKeysArr:", marKeysArr);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        {toggleModal ? (
          <ModalWindow
            modalState={modalState}
            toggleModal={toggleModal}
            appState={appState}
          />
        ) : (
          ""
        )}
        <NavBar title={appTitle} />
        {marKeysArr.map((el) => (
          <StyledMarqueeContainer key={el}>
            <Marquee
              key={`marq-${el}`}
              appState={appState}
              dispAppState={dispAppState}
              marqName={el}
              marqSize={marqSizes[el]}
            />
          </StyledMarqueeContainer>
        ))}
        <Keyboard />
      </StyledAppContainer>
    </ThemeProvider>
  );
}

const StyledAppContainer = styled.div`
  margin: 0 auto;
  align-content: center;
  align-items: center;
  max-width: 100%;
  /* overflow-x: hidden; */
`;

const StyledMarqueeContainer = styled.div`
  /* max-width: 700px; */
  width: 100%;
  margin: 0 auto 2rem auto;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0);
  // transparent
`;

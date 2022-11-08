import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn.jsx";
import Marquee from "./components/Marquee/Marquee.jsx";
import Keyboard from "./components/Keyboard/Keyboard.jsx";
import ModalWindow from "./components/ModalWindow/ModalWindow.jsx";
////////////////////////////////////////////////
import { useState, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
////////////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";
  // the amalgamated row values for each Marquee:
  const appOutputObj = {
    East: [], // [{ ltr: quantity }]
    West: [], // [{ ltr: quantity }]
    South: [], // [{ ltr: quantity }]
  };
  // this would then get drilled down to Modal Window which displays these amounts as separate AND fully amalgamated values!
  const reducer = () => {};
  const [appOutputState, dispatchAppOutput] = useReducer(reducer, appOutputObj);

  // MODAL POPUP STATE:
  const [modalIsOpen, toggleModal] = useState(false);

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
  };

  const marKeysArr = Object.keys(appOutputObj);
  console.log("marKeysArr:", marKeysArr);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        <NavBar title={appTitle} />
        <ModalWindow
          isOpen={modalIsOpen}
          setIsOpen={toggleModal}
          appOutputState={appOutputState}
        />
        {marKeysArr.map((el) => (
          <React.Fragment key={el}>
            <DisplayBtn
              marqName={el}
              key={`btn-${el}`}
              appOutputState={appOutputState}
            />
            <StyledMarqueeContainer key={el}>
              <Marquee
                key={`marq-${el}`}
                appOutputState={appOutputState}
                dispatchAppOutput={dispatchAppOutput}
                marqName={el}
                marqSize={marqSizes[el]}
              />
            </StyledMarqueeContainer>
          </React.Fragment>
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

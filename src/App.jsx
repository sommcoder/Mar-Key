import React from "react";
import NavBar from "./components/NavBar/NavBar";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
import ModalWindow from "./components/ModalWindow/ModalWindow";
////////////////////////////////////////////////
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
////////////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";

  // grand total output:
  const initAppOutputState = []; // [{ ltr: quantity }, { ltr: quantity }, etc..]

  // ALL MARQUEE STATES:
  const [appState, dispatchAppState] = useState(initAppOutputState);

  // action.type = (east, west, south)
  // action.payload = [{ltr: quantity}, {ltr: quantity}]

  // TOTAL STOCK: calculated by adding up the outputs of each of the marquees
  const [stockSummaryState, setStockSummaryState] = useState();

  // MODAL POPUP STATE:
  // the modal displays the tally of letters needed to the user:
  const [modalIsOpen, toggleModal] = useState(false);

  // To render the marquee Component's width:
  // we can add rem and covert to string with concatenation. Easier than the opposite!
  const marqWidths = {
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

  const marqueeNamesArr = Object.keys(marqWidths);
  console.log("marqueeNamesArr:", marqueeNamesArr);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        <NavBar title={appTitle} />
        {marqueeNamesArr.map((el) => (
          <React.Fragment key={el}>
            <DisplayBtn
              marqName={el}
              key={`btn-${el}`}
              appState={appState}
              dispatchAppState={dispatchAppState}
            />
            <ModalWindow
              isOpen={modalIsOpen}
              setIsOpen={toggleModal}
              appState={appState}
              stockSummaryState={stockSummaryState}
            />
            <StyledMarqueeContainer key={el}>
              {marqWidths[el].visible === true ? (
                <Marquee
                  key={`marq-${el}`}
                  dispatchAppState={dispatchAppState}
                  setStockSummaryState={setStockSummaryState}
                  appState={appState}
                  marqName={el}
                  marqWidths={marqWidths[el]}
                />
              ) : null}
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

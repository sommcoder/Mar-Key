import React from "react";
import NavBar from "./components/NavBar/NavBar";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
////////////////////////////////////////////////
import { useState, useReducer } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
////////////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";

  // what we will use to show the user once they've inputted everything:
  // once each marquee that is SELECTED by the user receives an input and is compared to the previous state, they will then be amalgamated, sorted and used to update the App state by which marquee's were SELECTED/INPUTTED
  const initAppOutputState = {
    East: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    West: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    South: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
  };

  // used to render the marquee Component's size:
  const marqueeSizing = {
    East: "42rem",
    West: "42rem",
    South: "84rem",
  };

  // action.type = (east, west, south)
  // action.payload = [{ltr: quantity}, {ltr: quantity}]
  const reducer = (state, action) => {
    let newState = { ...state, [action.type]: action.payload };
    console.log("newState", newState);
    return newState;
  };

  // ALL MARQUEE STATES:
  const [appState, dispatchAppState] = useReducer(reducer, initAppOutputState);

  // TOTAL STOCK: calculated by adding up the outputs of each of the marquees
  const [stockSummaryState, setStockSummaryState] = useState();

  // MODAL POPUP STATE:
  // the modal displays the tally of letters needed to the user:
  const [modalIsOpen, toggleModal] = useState(false);

  // store themes here.
  // GlobalStyles can be nested within and take advantage of our ThemeProvider!
  // look into creating dark-mode functionality here
  const theme = {
    colors: {
      button: "powderblue",
    },
  };

  const marqueeNamesArr = Object.keys(initAppOutputState);
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
            <StyledInputTallyModal
              isOpen={modalIsOpen}
              setIsOpen={toggleModal}
              // state:
              appState={appState}
              stockSummaryState={stockSummaryState}
            ></StyledInputTallyModal>
            <StyledMarqueeContainer key={el}>
              {appState[el].isVisible === true ? (
                <Marquee
                  key={`marq-${el}`}
                  dispatchAppState={dispatchAppState}
                  setStockSummaryState={setStockSummaryState}
                  appState={appState}
                  marqName={el}
                  marqSize={marqueeSizing[el]}
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

const StyledInputTallyModal = styled.div`
  display: none;
`;

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

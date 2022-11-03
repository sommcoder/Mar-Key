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

  const initMarqueeState = {
    East: {
      isVisible: true,
      size: "42rem",
      isSet: false,
      isError: false,
      output: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    },
    West: {
      isVisible: true,
      size: "42rem",
      isSet: false,
      isError: false,
      output: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    },
    South: {
      isVisible: true,
      size: "84rem",
      isSet: false,
      isError: false,
      output: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    },
  };

  const reducer = (state, action) => {};

  // INDIVIDUAL MARQUEE STATE:
  const [marqState, setMarquee] = useReducer(reducer, initMarqueeState);

  // TOTAL STOCK: calculated by adding up the outputs of each of the marquees
  const [stockSummaryState, setStockSummaryState] = useState();

  // MODAL POPUP STATE:
  const [modalIsOpen, toggleModal] = useState(false);

  // store themes here.
  // GlobalStyles can be nested within and take advantage of our ThemeProvider!
  // look into creating dark-mode functionality here
  const theme = {
    colors: {
      button: "powderblue",
    },
    button: {},
  };

  const marqueeNamesArr = Object.keys(initMarqueeState);
  console.log("marqueeNamesArr:", marqueeNamesArr);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledAppContainer>
        <NavBar title={appTitle} />
        {marqueeNamesArr.map((el, i, arr) => (
          <React.Fragment key={el}>
            <DisplayBtn
              marqName={el}
              key={`btn-${el}`}
              marqState={marqState}
              setMarquee={setMarquee}
            />
            <StyledInputTallyModal
              isOpen={modalIsOpen}
              setIsOpen={toggleModal}
              stockSummaryState={stockSummaryState}
            ></StyledInputTallyModal>
            <StyledMarqueeContainer key={el}>
              {marqState[el].isVisible === true ? (
                <Marquee
                  key={`marq-${el}`}
                  setMarquee={setMarquee}
                  setStockSummaryState={setStockSummaryState}
                  marqState={marqState}
                  marqName={el}
                  marqSize={marqState[el].size}
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

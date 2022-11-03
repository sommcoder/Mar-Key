import React from "react";
import NavBar from "./components/NavBar/NavBar";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
////////////////////////////////////////////////
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
////////////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";

  const InitAppInputState = {
    totalInput: [], // [{ ltr: quantity }, { ltr: quantity }]
  };

  const initMarqueeState = {
    East: { isVisible: true, size: "42rem", isSet: false, isError: false },
    West: { isVisible: true, size: "42rem", isSet: false, isError: false },
    South: { isVisible: true, size: "84rem", isSet: false, isError: false },
  };

  // APP STATE:
  const [totalAppInputState, setAppInputState] = useState(InitAppInputState);

  // INDIVIDUAL MARQUEE STATE:
  const [marqueeState, setMarquee] = useState(initMarqueeState);

  // ERROR STATE:
  const [stockSummaryState, setStockSummaryState] = useState();

  // MODAL POPUP STATE:
  const [isOpen, setIsOpen] = useState(false);

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
        {marqueeNamesArr.map((el) => (
          <React.Fragment key={el}>
            <DisplayBtn
              name={el}
              key={`btn-${el}`}
              marqueeState={marqueeState}
              setMarquee={setMarquee}
            />
            <StyledInputTallyModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              stockSummaryState={stockSummaryState}
            ></StyledInputTallyModal>
            <StyledMarqueeContainer key={el}>
              {marqueeState[el].isVisible === true ? (
                <Marquee
                  key={`marq-${el}`}
                  setMarquee={setMarquee}
                  marqueeState={marqueeState}
                  name={el}
                  size={marqueeState[el].size}
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

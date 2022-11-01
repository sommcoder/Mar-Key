import React from "react";
import NavBar from "./components/NavBar/NavBar";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
////////////////////////////////////////////////
import { useState } from "react";
import styled from "styled-components";
////////////////////////////////////////////////

export default function App() {
  const appTitle = "Mar-Key";
  // we should probably move anything Marquee state related into the Marquee component
  // and anything row state related, in the TextRow component??

  const initMarqueeState = {
    East: { isVisible: true, size: "42rem", isSet: false, isError: false },
    West: { isVisible: true, size: "42rem", isSet: false, isError: false },
    South: { isVisible: true, size: "84rem", isSet: false, isError: false },
  };

  // Marquee container state
  const [marqueeState, setMarquee] = useState(initMarqueeState);
  const [stockSummaryState, setStockSummaryState] = useState();
  const [isOpen, setIsOpen] = useState(false);
  /*
   
  stockSummaryState will
   
  */

  // keyboard letters for tablet/mobile:
  const letterSet = [
    {
      rowNum: "row0",
      letters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    },
    {
      rowNum: "row1",
      letters: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    },
    {
      rowNum: "row2",
      letters: ["ENTER", "z", "x", "c", "v", "b", "n", "m", "<=="],
    },
    {
      rowNum: "row3",
      letters: [
        "am",
        "pm",
        "presents",
        "www",
        "live",
        "feat",
        "free",
        "sold out",
      ],
    },
  ];

  const marqueeNamesArr = Object.keys(initMarqueeState);
  console.log("marqueeNamesArr:", marqueeNamesArr);

  return (
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
      <Keyboard letterSet={letterSet} />
    </StyledAppContainer>
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
  border: 1px solid rgba(0, 0, 0, 0); // transparent
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
`;

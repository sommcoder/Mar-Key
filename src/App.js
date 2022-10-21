import Header from "./components/Header/Header";
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
    East: { isVisible: true, size: "55rem", isSet: false, isError: false },
    West: { isVisible: false, size: "55rem", isSet: false, isError: false },
    South: { isVisible: false, size: "110rem", isSet: false, isError: false },
  };

  // Marquee container state
  const [marqueeState, setMarquee] = useState(initMarqueeState);

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

  return (
    <div id="app-container">
      <Header title={appTitle} />
      {marqueeNamesArr.map((el) => (
        <>
          <DisplayBtn
            name={el}
            marqueeState={marqueeState}
            setMarquee={setMarquee}
          />
          <StyledMarqueeContainer key={el}>
            {marqueeState[el].isVisible === true ? (
              <Marquee
                setMarquee={setMarquee}
                marqueeState={marqueeState}
                name={el}
                size={marqueeState[el].size}
              />
            ) : null}
          </StyledMarqueeContainer>
        </>
      ))}
      <Keyboard letterSet={letterSet} />
    </div>
  );
}

const StyledMarqueeContainer = styled.div`
  /* max-width: 700px; */
  width: 100%;
  margin: 0 auto 2rem auto;
  text-align: center;
  border: 0.02rem solid grey;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  &:hover {
    border: 0.1rem solid black;
    box-shadow: 0.1rem 0.2rem 0.8rem grey;
    /* transform: translateY(-0.1rem); */
  }
`;

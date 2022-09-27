import "./App.css";
import Header from "./components/Header/Header";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
import { useState } from "react";

// const PORT = 5000; // express.js server port
// the react app is on port 3000

function App() {
  const appTitle = "Mar-Key";

  const initMarqueeState = {
    East: { isVisible: true, size: "55rem", isSet: false, isError: false },
    West: { isVisible: false, size: "55rem", isSet: false, isError: false },
    South: { isVisible: false, size: "110rem", isSet: false, isError: false },
  };

  // Marquee container state
  const [marqueeState, setMarquee] = useState(initMarqueeState); //

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
          <div className="marquee-container" key={el}>
            {marqueeState[el].isVisible === true ? (
              <Marquee
                setMarquee={setMarquee}
                marqueeState={marqueeState}
                name={el}
                size={marqueeState[el].size}
              />
            ) : null}
          </div>
        </>
      ))}
      <Keyboard letterSet={letterSet} />
    </div>
  );
}

export default App;

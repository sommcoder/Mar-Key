import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
import { useState } from "react";

/*

We will need to have a state for the marquees once we includ the button functionality. This will replace the MARQUEE objects that we have below

*/

function App() {
  const [isVisible, setMarquee] = useState(true);
  const appTitle = "Mar-Key";

  // buttons above the display toggle the visibility of the MARQUEE's, when false, MARQUEE fades away, button remains in case the user wants to include it in the rendering!

  const EAST_MARQUEE = { isVisible: isVisible, size: "45rem" };
  const WEST_MARQUEE = { isVisible: isVisible, size: "45rem" };
  const SOUTH_MARQUEE = { isVisible: isVisible, size: "90rem" };

  const MARQUEE_ROWS = 3;

  // keyboard letters:
  const letterSet = [
    {
      rowNum: "row-1",
      letters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    },
    {
      rowNum: "row-2",
      letters: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    },
    {
      rowNum: "row-3",
      letters: ["ENTER", "z", "x", "c", "v", "b", "n", "m", "<=="],
    },
  ];

  /*
  what i believe we want is to have serve BlockData.json to our App/js by REQUESTING letter sizes by looking up the letter and ensuring we are able to display the user's input based on each blocks stock.
  */

  return (
    <div id="app-container">
      <Header title={appTitle} />
      {EAST_MARQUEE.isVisible === true ? (
        <Marquee
          size={EAST_MARQUEE.size}
          rows={MARQUEE_ROWS}
          name="East"
          setMarquee={setMarquee}
        />
      ) : (
        ""
      )}
      {WEST_MARQUEE.isVisible === true ? (
        <Marquee
          size={WEST_MARQUEE.size}
          rows={MARQUEE_ROWS}
          name="West"
          setMarquee={setMarquee}
        />
      ) : (
        ""
      )}
      {SOUTH_MARQUEE.isVisible === true ? (
        <Marquee
          size={SOUTH_MARQUEE.size}
          rows={MARQUEE_ROWS}
          name="South"
          classname="marquee-south"
          setMarquee={setMarquee}
        />
      ) : (
        ""
      )}
      <Keyboard letterSet={letterSet} addKeyToBlock />
    </div>
  );
}

export default App;

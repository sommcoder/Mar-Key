import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
import { useState } from "react";

/*
IDEA:

what if there were three text input lines within a FORM that corresponds with the Marquee components. 

The user will ADD text to the text input lines and the app will generate a display on the users selected marquee displays based on the established SIZING for each Marquee block


*/

function App() {
  const [currLetter, setLetter] = useState("");
  const appTitle = "Mar-Key";
  // have a radio input to select the marquee sides the user would like to use
  const EAST_MARQUEE = true;
  const WEST_MARQUEE = true;
  const SOUTH_MARQUEE = true;

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

  function addKeyToBlock(ltr) {
    setLetter(ltr);
  }
  return (
    <div id="app-container">
      <Header title={appTitle} />
      {EAST_MARQUEE === true ? <Marquee name="East" /> : ""}
      {WEST_MARQUEE === true ? <Marquee name="West" /> : ""}
      {SOUTH_MARQUEE === true ? (
        <Marquee classname="marquee-south" name="South" />
      ) : (
        ""
      )}
      <Keyboard letterSet={letterSet} addKeyToBlock />
    </div>
  );
}

export default App;

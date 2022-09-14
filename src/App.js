import "./App.css";
import Header from "./components/Header/Header";
import DisplayBtn from "./components/DisplayBtn/DisplayBtn";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";
import { useState } from "react";

/*
 
the display buttons are CONSTANT, always rendered, always available to be clicked, they live insice the marquee container which when the displayBtn is clicked, will update the state object to render the corresponding marquee component
 
*/

function App() {
  const appTitle = "Mar-Key";
  const initMarqueeState = {
    East: { isVisible: true, size: "45rem" },
    West: { isVisible: true, size: "45rem" },
    South: { isVisible: true, size: "90rem" },
  };

  const [marqueeState, toggleMarquee] = useState(initMarqueeState);

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
  const marqueeNamesArr = Object.keys(initMarqueeState);

  return (
    <div id="app-container">
      <Header title={appTitle} />
      {marqueeNamesArr.map((el) => (
        <>
          <DisplayBtn
            name={el}
            state={marqueeState}
            toggleMarquee={toggleMarquee}
          /> 
          {marqueeState[el].isVisible === true ? (
          <div className="marquee-container" key={el}>
            <Marquee name={marqueeState[el]} size={marqueeState[el].size} />
          </div>
           ) : null
          }
      ))}
      <Keyboard letterSet={letterSet} addKeyToBlock />
    </div>
  );
}

export default App;

/*
 
Challenge?


ultimately, after we click the display button, the marquee rows are rendered WITHOUT the inline style attribute, and therefore I'm assuming they default to the size of their parent container
 
*/

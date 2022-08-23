import { useState, useEffect } from "react";
import MarqueeRow from "../MarqueeRow/MarqueeRow";
import DisplayBtn from "../DisplayBtn/DisplayBtn";
import ClearBtn from "../ClearBtn/ClearBtn";
import TextRow from "../TextRow/TextRow";
import "./Marquee.css";

export default function Marquee(props) {
  // should i create a separate state object for each row?
  const [rowValues, setRow] = useState([
    { "row-0": [] },
    { "row-1": [] },
    { "row-2": [] },
  ]);
  // const [rowValue1, setRow1] = useState([]);
  // const [rowValue2, setRow2] = useState([]);

  const rowsArr = [];
  for (let i = 0; i < props.rows; i++) {
    rowsArr.push(i);
  }

  // construct an array based on the number of rows designated in App.js
  console.log("marquee rowsArr:", rowsArr); //
  return (
    <div className="marquee-container" key={props.name}>
      <DisplayBtn name={props.name} />
      <div className="marquee-display-container">
        {rowsArr.map((row, i) => (
          <MarqueeRow
            size={props.size}
            rowId={`row-${row}`}
            key={`row-${row}`}
            rowValues={rowValues}
          />
        ))}
      </div>
      <div className="text-box-container">
        {rowsArr.map((row, i) => (
          <TextRow setRow={setRow} rowId={`row-${row}`} key={`row-${row}`} />
        ))}
      </div>
      <ClearBtn />
    </div>
  );
}

/*
 
what are we trying to solve here?

We are trying to have the TextRow component SET the Blocks inside the MarqueeRow Component.

the blocks


we want the text rows and marquee rows to be linked so that what is inputted in the text input gets set to the corresponding marquee row once the user clicks enter
 
*/

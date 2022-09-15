import { useState } from "react";
import ClearBtn from "../ClearBtn/ClearBtn";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import TextRow from "../TextRow/TextRow";
import Block from "../Block/Block";
import "./Marquee.css";

export default function Marquee(props) {
  const initRowValuesObj = {
    row0: [],
    row1: [],
    row2: [],
  };

  const [rowValuesObj, setRow] = useState(initRowValuesObj);

  const keysArr = Object.keys(rowValuesObj);

  let rowSize = {
    width: props.size,
  };

  return (
    <div className="marquee-display-container">
      {keysArr.map((row) => (
        <div
          className="marquee-row"
          style={rowSize}
          data-rowid={row}
          key={row}
          rowValuesObj={rowValuesObj}
        >
          {rowValuesObj[row].map((block, i) => (
            <Block key={`${row}-block-${i}`} block={block} />
          ))}
        </div>
      ))}

      <div className="text-box-container">
        {keysArr.map((row) => (
          <TextRow
            setRow={setRow}
            rowId={row}
            key={row}
            rowValuesObj={rowValuesObj}
          />
        ))}
      </div>
      <ClearBtn rowValuesObj={rowValuesObj} setRow={setRow} />
      <SetCurrBtn rowValuesObj={rowValuesObj} setRow={setRow} />
    </div>
  );
}

/*
 
what are we trying to solve here?

We are trying to have the TextRow component SET the Blocks inside the MarqueeRow Component.

the blocks


we want the text rows and marquee rows to be linked so that what is inputted in the text input gets set to the corresponding marquee row once the user clicks enter
 
*/

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
            <Block key={`${row[0]}-block-${i}`} block={block} style={row[1]} />
          ))}
        </div>
      ))}

      <form id="user-input-form" className="text-box-container">
        {keysArr.map((row) => (
          <TextRow
            setRow={setRow}
            rowId={row}
            key={row}
            rowValuesObj={rowValuesObj}
          />
        ))}
        <SetCurrBtn
          data-rowid={props.rowId}
          rowValuesObj={rowValuesObj}
          setRow={setRow}
        />
        <ClearBtn
          form="user-input-form"
          rowValuesObj={rowValuesObj}
          setRow={setRow}
        />
      </form>
    </div>
  );
}

/*
 
PROBLEM:

Now that we have the function in the SETCURRBTN
- Set needs to act like a submit button
- we have just wrapped the buttons and the text rows in a FORM and we need the button to "PULL" the input from the textRow inputs
 
*/

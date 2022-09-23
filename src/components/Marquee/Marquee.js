import { useState } from "react";
import ResetBtn from "../ResetBtn/ResetBtn";
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

  // row = row0, row1, row2
  // row[i] the index of the letter

  // block[i][0] the letter symbol
  // block[i][1] the letter symbols size

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
            <Block
              key={`${row}-block-${i}`}
              block={block[0]}
              style={block[1]}
            />
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
        <ResetBtn
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

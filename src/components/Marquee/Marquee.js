import { useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import "./Marquee.css";

export default function Marquee(props) {
  console.log("Marquee props:", props);
  // Marquee is the immediate parent of Block & TextRowForm
  const initRowState = {
    row0: [],
    row1: [],
    row2: [],
  };

  const [rowState, setRow] = useState(initRowState); // currState to initiate
  const [newRowState, setNewRow] = useState(initRowState); // newState to compare

  const keysArr = Object.keys(initRowState);

  let rowSize = {
    width: props.size,
  };

  let marqName = props.name;
  let marqState = props.marqueeState;

  // gets the marqueeWidth passed down from the top-level App.js
  const marqWidth = +marqState[marqName].size.split("rem").splice(0, 1);
  console.log(marqWidth);

  // row = row0, row1, row2
  // row[i] the index of the letter

  // block[i][0] the letter symbol
  // block[i][1] the letter symbols size

  return (
    <div className="marquee-display-container" marqName={marqName}>
      {keysArr.map((row) => (
        <div
          className="marquee-row"
          style={rowSize}
          data-rowid={row}
          key={`${marqName}-${row}`}
          rowState={rowState}
          marqWidth={marqWidth}
        >
          {rowState[row].map((block, i) => (
            <Block
              key={`${marqName}-${row}-block-${i}`}
              block={block[0]}
              style={block[1]}
            />
          ))}
        </div>
      ))}
      <TextRowForm
        id="user-input-form"
        className="text-box-container"
        keysArr={keysArr}
        rowState={rowState}
        newRowState={newRowState}
        initRowState={initRowState}
        setRow={setRow}
        setNewRow={setNewRow}
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
      />
    </div>
  );
}

/*
 
We changed TextRow component to be a TextRowForm component so that we're able to map, key and ref the input elements all within the same component to be able to iterate through the elements using ref

*/

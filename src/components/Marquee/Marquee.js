import { useState } from "react";
import ResetBtn from "../ResetBtn/ResetBtn";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import TextRowBox from "../TextRowBox/TextRowBox";
import Block from "../Block/Block";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./Marquee.css";

export default function Marquee(props) {
  // row state is in the Marquee because the Marquee component is the common parent shared by TextRow as well as the Block, SetCurrBtn and ResetBtns components
  const initRowState = {
    row0: [],
    row1: [],
    row2: [],
  };

  const [rowState, setRow] = useState(initRowState); // currState to initiate
  const [newRowState, setNewRow] = useState(initRowState); // newState to compare

  // this is a reference we need to coordinate with the row of the Marquee so the right input goes to the right marqueeRow:
  const keysArr = Object.keys(initRowState);

  let rowSize = {
    width: props.size,
  };

  let marqName = props.name;
  let marqState = props.marqueeState;

  // gets the marqueeWidth passed down from the top-level App.js
  const currMarqWidth = +marqState[marqName].size.split("rem").splice(0, 1);
  console.log(currMarqWidth);

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
          key={`${marqName}${row}`}
          rowState={rowState}
          marqWidth={currMarqWidth}
        >
          {rowState[row].map((block, i) => (
            <Block
              key={`${row}-block-${i}`}
              block={block[0]}
              style={block[1]}
            />
          ))}
        </div>
      ))}
      <TextRowBox
        id="user-input-form"
        className="text-box-container"
        keysArr={keysArr}
      />
      <SetCurrBtn
        form="user-input-form"
        marqName={marqName}
        marqState={marqState}
        rowState={rowState}
        setMarquee={props.setMarquee}
        setRow={setRow}
        marqWidth={currMarqWidth}
      />
      <ResetBtn
        marqName={marqName}
        marqState={marqState}
        marqWidth={currMarqWidth}
        setMarquee={props.setMarquee}
        rowInitState={initRowState}
        setRow={setRow}
      />
      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
    </div>
  );
}

/*
 
We changed TextRow component to be a TextRowBox component so that we're able to map, key and ref the input elements all within the same component to be able to iterate through the elements using ref

*/

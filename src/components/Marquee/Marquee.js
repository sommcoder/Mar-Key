import { useState } from "react";
import ResetBtn from "../ResetBtn/ResetBtn";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import TextRow from "../TextRow/TextRow";
import Block from "../Block/Block";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./Marquee.css";

export default function Marquee(props) {
  const initRowState = {
    row0: [],
    row1: [],
    row2: [],
  };

  // marquee ROW state Objects:
  const [rowState, setRow] = useState(initRowState); // current state
  const [newRowState, setNewRow] = useState(initRowState); // new state to compare

  const keysArr = Object.keys(initRowState);
  // gets the keys of the marqueeState

  let rowSize = {
    width: props.size,
  };

  let marqName = props.name;
  let marqState = props.marqueeState;

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

      <form id="user-input-form" className="text-box-container">
        {keysArr.map((row) => (
          <TextRow
            setRow={setRow}
            rowId={row}
            key={row}
            marqState={props.state}
            marqWidth={currMarqWidth}
          />
        ))}
        <SetCurrBtn
          marqName={marqName}
          marqState={marqState}
          rowState={rowState}
          setMarquee={props.setMarquee}
          setRow={setRow}
          marqWidth={currMarqWidth}
        />
        <ResetBtn
          form="user-input-form"
          marqName={marqName}
          marqState={marqState}
          marqWidth={currMarqWidth}
          setMarquee={props.setMarquee}
          rowInitState={initRowState}
          setRow={setRow}
        />
      </form>
      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
    </div>
  );
}

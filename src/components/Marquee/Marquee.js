import { useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import styled from "styled-components";

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
    <StyledMarquee marqName={marqName}>
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
    </StyledMarquee>
  );
}

// styling:
const StyledMarquee = styled.div`
  padding-top: 2rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;
  cursor: pointer;
`;

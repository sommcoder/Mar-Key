import { useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import styled from "styled-components";

export default function Marquee(props) {
  console.log("Marquee props:", props);
  // Marquee is the immediate parent of Block & TextRowForm so therefore the row state is here
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
        <StyledMarqueeRow
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
        </StyledMarqueeRow>
      ))}
      {/* <TextRowForm
        keysArr={keysArr}
        rowState={rowState}
        newRowState={newRowState}
        initRowState={initRowState}
        setRow={setRow}
        setNewRow={setNewRow}
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
      /> */}
    </StyledMarquee>
  );
}

/*
 
TextRowForm component is the one messing up our rendering causing a blank page.
Let's try and figure out why this may be next time! Also looks like some of the styling didn't get transferred over from CSS to using styled-components
 
*/

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

const StyledMarqueeRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  background-color: rgb(253, 243, 229);
  height: 5rem;
  margin: 0 auto;
  border-bottom: 0.25rem grey solid;
  border-right: 0.25rem grey solid;
  border-left: 0.25rem grey solid;

  /* first child is technically the ErrMsg component */
  &:nth-child(1) {
    border-top: 0.25rem grey solid;
  }
`;

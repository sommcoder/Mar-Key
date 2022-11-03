import { useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import styled from "styled-components";

export default function Marquee({
  marqState,
  marqName,
  marqSize,
  setMarquee,
  setStockSummaryState,
}) {
  // Marquee is the immediate parent of BLOCK & TextRowForm so therefore the row state is managed here

  // if user tries to RE-SUBMIT using SetCurrBtn we need to use RowState to initiate this functionality
  const initRowState = {
    row0: { values: [], sizes: [] },
    row1: { values: [], sizes: [] },
    row2: { values: [], sizes: [] },
  };

  const keysArr = Object.keys(initRowState);

  // MARQUEE STATE:
  const [isDisabled, toggleDisabled] = useState(false);
  const [rowState, setRow] = useState(initRowState); // currState to initiate
  const [newRowState, setNewRow] = useState(initRowState); // newState to compare
  const [stockConflictState, setStockConflict] = useState([]);
  // empty array is good. If there any stock conflicts we will update this in our code and this will trigger the error message, the error message will be populated with the strings of inputs from this state array
  //   ['a', 'f', 'w']

  // dynamically get JUST the number:
  const marqWidth = +marqState[marqName].size.split("rem").splice(0, 1);

  // LEGEND:

  //TODO: We will need to FIX this! since we've changed out stateObj and then we will need to fix the way that we are mapping the Block component as well
  // row = row0, row1, row2
  // row[i] = the index of the letter
  // rowState[row].sizes[i] = size

  console.log("rowState:", rowState);

  console.log("stockConflictState:", stockConflictState);

  return (
    <StyledMarquee marqName={marqName}>
      {keysArr.map((row) => (
        <StyledMarqueeRow
          marqSize={marqSize}
          data-rowid={row}
          key={`${marqName}-${row}`}
          rowState={rowState}
          marqWidth={marqWidth}
        >
          {rowState[row].values.map((block, i) => (
            <Block
              key={`${marqName}-${row}-block-${i}`}
              block={block}
              style={rowState[row].sizes[i]}
            />
          ))}
        </StyledMarqueeRow>
      ))}
      <TextRowForm
        //state:
        rowState={rowState}
        newRowState={newRowState}
        initRowState={initRowState}
        stockConflictState={stockConflictState}
        marqState={marqState}
        // state functions:
        setRow={setRow}
        setNewRow={setNewRow}
        setMarquee={setMarquee}
        setStockSummaryState={setStockSummaryState}
        setStockConflict={setStockConflict}
        // other props:
        marqName={marqName}
        keysArr={keysArr}
        isDisabled={isDisabled}
        marqWidth={marqWidth}
      />
    </StyledMarquee>
  );
}

const StyledMarquee = styled.div`
  padding-top: 1rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;
  z-index: 1;

  @keyframes fadeInAnimation {
    start {
      opacity: 0;
    }
    end {
      opacity: 1;
    }
  }
`;

const StyledMarqueeRow = styled.div`
  display: flex;
  width: ${(props) => (props.marqSize ? props.marqSize : "350px")};
  flex-direction: row;
  justify-content: center;
  background-color: rgb(253, 243, 229);
  height: 5rem;
  margin: 0 auto;
  border-bottom: 0.25rem grey solid;
  border-right: 0.25rem grey solid;
  border-left: 0.25rem grey solid;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);

  /* &:hover {
    background-color: rgb(249, 232, 207);
    cursor: pointer;
  } */
  /* first child is technically the DisplayBtn component */
  &:nth-child(1) {
    border-top: 0.25rem grey solid;
  }
`;

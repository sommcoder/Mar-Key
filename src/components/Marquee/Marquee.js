import { useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import styled from "styled-components";

export default function Marquee(props) {
  console.log("Marquee props:", props);
  // Marquee is the immediate parent of BLOCK & TextRowForm so therefore the row state is managed here
  const initRowState = {
    row0: [],
    row1: [],
    row2: [],
  };

  const errorMessages = {
    err_size: "The size of your letters are too large for this marquee",
    err_unknown_input: "This particular symbol was not found in our database",
    err_missing_input: `There are not enough ___ in inventory`,
  };

  const [isDisabled, toggleDisabled] = useState(false);
  const [rowState, setRow] = useState(initRowState); // currState to initiate
  const [newRowState, setNewRow] = useState(initRowState); // newState to compare

  // component properties:
  const keysArr = Object.keys(initRowState);

  let marqName = props.name;
  let marqState = props.marqueeState;

  // dynamically get JUST the number:
  const marqWidth = +marqState[marqName].size.split("rem").splice(0, 1);

  // LEGEND:
  // row = row0, row1, row2
  // row[i] = the index of the letter
  // block[i][0] = the letter symbol
  // block[i][1] = the letter symbols size

  return (
    <StyledMarquee marqName={marqName}>
      {keysArr.map((row) => (
        <StyledMarqueeRow
          size={props.size}
          data-rowid={row}
          key={`${marqName}-${row}`}
          rowState={rowState}
          marqWidth={props.marqWidth}
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
      <TextRowForm
        keysArr={keysArr}
        rowState={rowState}
        newRowState={newRowState}
        initRowState={initRowState}
        setRow={setRow}
        setNewRow={setNewRow}
        marqName={marqName}
        marqState={marqState}
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
  cursor: pointer;
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
  width: ${(props) => (props.size ? props.size : "350px")};
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

  &:hover {
    background-color: rgb(249, 232, 207);
  }
  /* first child is technically the DisplayBtn component */
  &:nth-child(1) {
    border-top: 0.25rem grey solid;
  }
`;

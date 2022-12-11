import { useReducer } from "react";
import TextRowForm from "../TextRowForm/TextRowForm.jsx";
import Block from "../Block/Block.jsx";
import styled, { keyframes } from "styled-components";
import SelectBtn from "../SelectBtn/SelectBtn.jsx";

export default function Marquee({
  appState,
  dispAppState,
  marqName,
  marqSize,
}) {
  /*
  !component description:
  - appState tracks LETTERS and QUANTITY for the modal Tally
  - marqState tracks INPUT and THEIR SIZE for rending the Block components dynamically
  */
  const marqWidth = marqSize + "rem";

  // for mapping the Block components:
  const initMarqRowState = {
    row0: [], // [ [value, size], [value, size], etc]
    row1: [],
    row2: [],
  };

  const keysArr = Object.keys(initMarqRowState);

  const reducer = (state, action) => {
    if (!action.payload) return state;
    console.log("rowREDUCER: action.payload:", action.payload);

    switch (action.type) {
      case "set": {
        dispAppState({
          type: "set",
          payload: {
            [marqName]: action.payload.output,
          },
        });
        console.log("action.payload:", action.payload.view);

        // updates the Marquee UI:
        return { ...state, ...action.payload.view };
      }
      case "compare": {
        dispAppState({
          type: "compare",
          payload: {
            [marqName]: action.payload.output,
          },
        });
        console.log("action.payload:", action.payload.view);
        // updates the Marquee UI:
        return { ...state, ...action.payload.view };
      }
      case "reset": {
        // full appState reset!
        dispAppState({
          type: "reset",
          payload: action.payload.output,
        });
        console.log("action.payload:", action.payload.view);
        // updates the Marquee UI:
        return { ...state, ...action.payload.view };
      }
      default: {
        return state;
      }
    }
  };

  //! Marquee is the immediate parent of Block & TextRowForm so therefore the rowState is managed here

  const [rowState, dispRowState] = useReducer(reducer, initMarqRowState);

  ///////////////////////////////////////////

  // !LEGEND:
  // row = row0, row1, row2
  // row[i] = the index of the letter

  console.log("rowState Marquee:", rowState);

  return (
    <StyledMarquee marqName={marqName}>
      <SelectBtn marqName={marqName} appState={appState} />
      {keysArr.map((row) => (
        <StyledMarqueeRow
          data-rowid={row}
          key={`${marqName}-${row}`}
          rowState={rowState}
          marqWidth={marqWidth}
        >
          {rowState[row].map((blockKey, i) => (
            <Block
              key={`${marqName}-${row}-block-${i}`}
              block={blockKey[0]}
              style={blockKey[1]}
              delay={i + 1}
            />
          ))}
        </StyledMarqueeRow>
      ))}
      <TextRowForm
        formName={`${marqName}-form`}
        appState={appState}
        dispRowState={dispRowState}
        dispAppState={dispAppState}
        marqName={marqName}
        keysArr={keysArr}
        marqSize={marqSize}
        rowState={rowState}
        initMarqRowState={initMarqRowState}
      />
    </StyledMarquee>
  );
}

const fadeInAnimation = keyframes`
     0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const StyledMarquee = styled.div`
  padding-top: 1rem;
  margin: 0 auto 2rem auto;
  width: 100%;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  animation: ${fadeInAnimation} ease-in-out 0.75s;
  animation-iteration-count: 1;
  z-index: 1;
`;

const StyledMarqueeRow = styled.div`
  display: flex;
  width: ${(props) => (props.marqWidth ? props.marqWidth : "350px")};
  flex-direction: row;
  justify-content: center;
  background-color: rgb(253, 243, 229);
  height: 5rem;
  margin: 0 auto;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);

  border: 0.25rem grey solid;
  border-top: none; // prevents border stacking
  /* 0th child is the DisplayBtn component */
  &:nth-child(2) {
    border-top: 0.25rem grey solid;
  }
`;

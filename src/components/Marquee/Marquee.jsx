import { useState, useReducer } from "react";
import TextRowForm from "../TextRowForm/TextRowForm";
import Block from "../Block/Block";
import styled from "styled-components";

export default function Marquee({
  appState,
  marqName,
  marqWidths,
  dispatchAppState,
  setStockSummaryState,
}) {
  // Marquee is the immediate parent of BLOCK & TextRowForm so therefore the row state is managed here
  /*
   
1) set row state
2) set NEW row state
3) upon NEW row state update, dispatch app state sends a payload of the amalgamated and sorted letters and their quantities to the app reducer
4) app reducer will update App state

  */
  // array conents determine the block components that are rendered as children in the MarqueeRow components:
  const initRowState = {
    row0: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    row1: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    row2: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
  };
  ///////////////////////////////////////////////
  // adjusting the booleans of genMarqState
  const appReducer = (state, action) => {
    // switch (action.type) {
    //   case "visible": {
    //   }
    // }
  };
  // default marquee state:
  const initMarqState = {
    visible: true,
    selected: false,
    error: false,
  };

  const [marqState, dispatchGenMarqState] = useReducer(
    appReducer,
    initMarqState
  );
  ////////////////////////////////////////////////////
  // we don't need a switch statement since our code is the same, only thing that changes is ....

  // but wait... do we EVEN need a useReducer now???
  // same reducer function for BOTH useReducer Hooks
  const reducer = (state, action) => {
    let newState = { ...state, [action.type]: action.payload };
    console.log("newState", newState);
    return newState;
  };

  // the row state will be combined, sorted and added to the corresponding MarqueeState object using the App's useReducer hook
  const [rowState, dispatchRowState] = useReducer(reducer, initRowState);
  const [newRowState, dispatchNewRowState] = useReducer(reducer, initRowState);

  const keysArr = Object.keys(initRowState);

  // const [isDisabled, toggleDisabled] = useState(false);
  // // should be moved to the Marquee component:
  // // separate useState hooks for each:
  // const [visibility, setVisibility] = useState(true);
  // // when the marquee's input has at least one valid row entry:
  // const [active, setActive] = useState(false);

  const [stockConflictState, setStockConflict] = useState([]);
  // empty array is good. If there any stock conflicts we will update this in our code and this will trigger the error message, the error message will be populated with the strings of inputs from this state array
  //   ['a', 'f', 'w']
  // dynamically get JUST the number:
  const marqWidth = marqWidths + "rem";
  console.log("marqWidth:", marqWidth);
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
          data-rowid={row}
          key={`${marqName}-${row}`}
          rowState={rowState}
          marqWidth={marqWidth}
        >
          {rowState[row].map((block, i) => (
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
        appState={appState}
        // state functions:
        dispatchRowState={dispatchRowState}
        dispatchNewRowState={dispatchNewRowState}
        setStockSummaryState={setStockSummaryState}
        setStockConflict={setStockConflict}
        // other props:
        marqName={marqName}
        keysArr={keysArr}
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
  width: ${(props) => (props.marqWidth ? props.marqWidth : "350px")};
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
  /* 0th child is technically the DisplayBtn component */
  &:nth-child(1) {
    border-top: 0.25rem grey solid;
  }
`;
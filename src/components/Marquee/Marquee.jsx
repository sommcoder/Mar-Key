import { useReducer, useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm.jsx";
import Block from "../Block/Block.jsx";
import styled from "styled-components";
import SelectBtn from "../SelectBtn/SelectBtn.jsx";

export default function Marquee({
  appState,
  dispAppState,
  marqName,
  marqSize,
}) {
  const marqWidth = marqSize + "rem";
  ////////////////////////////////////////////////////
  const initMarqRowState = {
    row0: [], // [["", number], ["", number] ...]}
    row1: [], // [["", number], ["", number] ...]}
    row2: [], // [["", number], ["", number] ...]}
  };

  const keysArr = Object.keys(initMarqRowState);

  const reducer = (state, action) => {
    console.log("REDUCER CALLED");
    if (!action.payload) return state;
    // ^^ is this a valid work around..?
    console.log("action.payload:", action.payload);
    let rowsArr = Object.keys(action.payload);
    console.log("rowsArr:", rowsArr);
    let newState = {};

    switch (action.type) {
      case "update": {
        // payload ROW LOOP:
        for (let i = 0; i < rowsArr.length; i++) {
          // dynamically assign row to an empty array
          newState[rowsArr[i]] = [];
          let oldRow = action.payload[rowsArr[i]];

          console.log("newState:", newState);
          console.log("oldRow:", oldRow);

          // values/sizes LOOP:
          for (let n = 0; n < oldRow.values.length; n++) {
            let value = oldRow.values[n];
            let size = oldRow.sizes[n];
            newState[rowsArr[i]].push([value, size]);
          }
        }
        return { ...state, ...newState };
      }

      default:
        return state;
    }
  };

  //! Marquee is the immediate parent of Block & TextRowForm so therefore the rowState is managed here

  // the row state will be combined, sorted and added to the corresponding MarqueeState object using the App's useReducer hook
  const [rowState, dispatchRowState] = useReducer(reducer, initMarqRowState);
  const [newRowState, dispatchNewRowState] = useReducer(
    reducer,
    initMarqRowState
  );
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
            />
          ))}
        </StyledMarqueeRow>
      ))}
      <TextRowForm
        //reference:
        initMarqRowState={initMarqRowState}
        //state:
        rowState={rowState}
        newRowState={newRowState}
        appState={appState}
        // state functions:
        dispatchRowState={dispatchRowState}
        dispatchNewRowState={dispatchNewRowState}
        dispAppState={dispAppState}
        // other props:
        marqName={marqName}
        keysArr={keysArr}
        marqSize={marqSize}
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
  &:nth-child(2) {
    border-top: 0.25rem grey solid;
  }
`;

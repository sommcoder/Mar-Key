import { useReducer } from "react";
import TextRowForm from "../TextRowForm/TextRowForm.jsx";
import Block from "../Block/Block.jsx";
import styled from "styled-components";

export default function Marquee({
  appOutputState,
  dispatchAppOutput,
  marqName,
  marqSize,
}) {
  ///////////////////////////////////////////////
  const appReducer = (state, action) => {};
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
  // array conents determine the block components that are rendered as children in the MarqueeRow components:
  const initRowState = {
    row0: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    row1: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
    row2: [], // [{ ltr: quantity }, { ltr: quantity }, etc..]
  };

  const reducer = (state, action) => {
    console.log("action.type:", action.type);
    console.log("action.payload:", action.payload);
    let rowsArr = Object.keys(action.payload);
    console.log("rowsArr:", rowsArr);
    // input:
    // {row0: {values: [""], sizes: [""]}}

    // output:
    // {row0: [["", number], ["", number] ...]}
    if (action.type === "update") {
      let newState = {};
      // payload ROW LOOP:
      for (let i = 0; i < rowsArr.length; i++) {
        // if undefined, assign row key
        if (!newState[rowsArr[i]]) newState = { [rowsArr[i]]: [] };
        // values/sizes LOOP:
        console.log("newState:", newState);
        let row = action.payload[i];
        for (let n = 0; n < row.values.length; n++) {
          let value = row.values;
          let size = row.sizes;
          newState[i].push([value, size]);
        }
        console.log("newState[i]:", newState[i]);
      }
      console.log("newState", newState);
      return newState;
    }
  };

  //! Marquee is the immediate parent of Block & TextRowForm so therefore the rowState is managed here

  // the row state will be combined, sorted and added to the corresponding MarqueeState object using the App's useReducer hook
  const [rowState, dispatchRowState] = useReducer(reducer, initRowState);
  const [newRowState, dispatchNewRowState] = useReducer(reducer, initRowState);
  ///////////////////////////////////////////

  const keysArr = Object.keys(initRowState);

  // concat "rem"
  const marqWidth = marqSize + "rem";
  console.log("marqWidth:", marqWidth);

  // !LEGEND:
  // row = row0, row1, row2
  // row[i] = the index of the letter

  console.log("rowState:", rowState);

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
        //reference:
        initRowState={initRowState}
        //state:
        rowState={rowState}
        newRowState={newRowState}
        marqState={marqState}
        appOutputState={appOutputState}
        // state functions:
        dispatchRowState={dispatchRowState}
        dispatchNewRowState={dispatchNewRowState}
        dispatchAppOutput={dispatchAppOutput}
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
  &:nth-child(1) {
    border-top: 0.25rem grey solid;
  }
`;

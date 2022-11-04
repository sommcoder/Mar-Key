import styled from "styled-components";
import data from "../../data/blockData.json";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useState, useRef } from "react";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";

export default function TextRowForm({
  keysArr,
  marqName,
  appState,
  marqWidth,
  setStockSummaryState,
}) {
  // when the textRowForm is being given an error:
  const [error, setError] = useState(false);

  // refs of our input elements for animation and focus interactivity:
  const inputRefsArr = useRef([]);
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  // Making this state would require a rerender, which we don't want. We want LIVE functionality
  const inputValidationObj = {
    row0: { value: [], size: 0 },
    row1: { value: [], size: 0 },
    row2: { value: [], size: 0 },
  };

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;
    console.log("ev:", ev);
    console.log("key:", key);
    console.log("row:", row);
    console.log("inputValidationObj START", inputValidationObj);

    if (key === "Tab") return;
    if (key === " ") ev.preventDefault();
    if (key === "Enter") {
      // cycle focus:
      if (keysArr.indexOf(row) + 1 < keysArr.length)
        inputRefsArr.current[keysArr.indexOf(row) + 1].focus();
      else inputRefsArr.current[0].focus();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      // every letter is larger than 1:
      if (inputValidationObj[row].size <= 1) {
        inputValidationObj[row].size = 0;
        return false;
      }
      // lookup the size of the block that's in the last position of our cache Object
      inputValidationObj[row].size -= +data[
        inputValidationObj[row].value.at(-1)
      ].size
        .split("rem")
        .splice(0, 1);
      inputValidationObj[row].value.pop(); // pop the last input value off the valueArr
      ev.target.value = inputValidationObj[row].value.join("");
      return;
    }
    // get the size of the block the user inputted:
    let currBlockSize = +data[key].size.split("rem").splice(0, 1);

    // validation max capacity guard / animation:
    if (inputValidationObj[row].size + currBlockSize > marqWidth) {
      inputRefsArr.current[keysArr.indexOf(row)].animate(
        [
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0%)",
            borderColor: "rgb(255, 0, 0)",
          },
        ],
        650
      );
      // ref of appState prop for updating
      let updatedMarqueeStateObj = appState;
      updatedMarqueeStateObj[marqName].isError = true;
      return; // exit execution
    }

    ////////////////////////////////////////////////
    // if all above is well, add to our cache and assign currKey to our input element
    inputValidationObj[row].size += currBlockSize; // update size
    inputValidationObj[row].value.push(key); // update input values
    ev.target.value = inputValidationObj[row].value.join("");
    return;
  }

  return (
    <div
      id="user-input-form"
      css={`
        margin-bottom: 0.5rem;
      `}
    >
      {keysArr.map((row) => (
        <StyledTextRow
          key={`${marqName}-${row}`}
          readOnly
          ref={addToRefsArr}
          data-rowid={row}
          type="text"
          name={row}
          onKeyDown={validateEntry}
        />
      ))}
      <SetCurrBtn marqName={marqName} appState={appState}></SetCurrBtn>
      <CompareBtn
        setStockSummaryState={setStockSummaryState}
        marqName={marqName}
        appState={appState}
      ></CompareBtn>
      <ResetBtn marqName={marqName} appState={appState}></ResetBtn>

      {appState[marqName].isError === true ? <ErrorMsg /> : ""}
    </div>
  );
}

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 350px;
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: rgba(176, 224, 230, 0.25);
  }
  &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  }
`;

// ENTER FUNCTIONALITY:
// do we even need to do this? won't the form submission in setCurrBtn trigger a rerendering?
// for (const line in inputValidationObj) {
//   // reset our validationObj
//   if (Object.hasOwn(inputValidationObj, line)) {
//     inputValidationObj[line].value = []; // reset to empty array
//     inputValidationObj[line].size = 0; // reset to 0
//   }
// }

import styled from "styled-components";
import data from "../../data/blockData.json";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";
import { useRef } from "react";

export default function TextRowForm({
  appOutputState,
  dispatchAppOutput,
  dispatchRowState,
  dispatchNewRowState,
  keysArr,
  marqName,
  marqSize,
}) {
  console.log("marqWidth:", marqSize);
  // Input elemtns Refs:
  const inputRefsArr = useRef([]);
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  // LIVE validation object:
  const inputValidationObj = {
    row0: { value: [], size: 0 },
    row1: { value: [], size: 0 },
    row2: { value: [], size: 0 },
  };

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;
    console.log("key:", key);
    console.log("row:", row);
    // console.log("inputValidationObj START", inputValidationObj);

    if (key === " ") ev.preventDefault();
    if (key === "Enter") {
      // cycle focus:
      if (keysArr.indexOf(row) + 1 < keysArr.length)
        inputRefsArr.current[keysArr.indexOf(row) + 1].focus();
      else inputRefsArr.current[0].focus();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      if (inputValidationObj[row].size)
        // if (inputValidationObj[row].size <= 1) {
        //   inputValidationObj[row].size = 0;
        //   return;
        // }
        // subtract the LAST letter in our validationObj
        inputValidationObj[row].size -=
          +data[inputValidationObj[row].value.at(-1)].size;
      inputValidationObj[row].value.pop();
      ev.target.value = inputValidationObj[row].value.join("");
      return;
    }

    if (!data[key]) return;
    let currBlockSize = +data[key].size;

    // Max capacity check:
    if (inputValidationObj[row].size + currBlockSize > marqSize) {
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
        ],
        { duration: 150, iterations: 3 }
      );
      return;
    }
    inputValidationObj[row].size += currBlockSize; // update size
    inputValidationObj[row].value.push(key); // update input values
    console.log("inputValidationObj END:", inputValidationObj);
    ev.target.value = inputValidationObj[row].value.join("");
    return;
  }

  return (
    <>
      <form
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
      </form>
      <SetCurrBtn
        keysArr={keysArr}
        dispatchRowState={dispatchRowState}
        marqName={marqName}
      />
      <CompareBtn
        appOutputState={appOutputState}
        dispatchAppOutput={dispatchAppOutput}
        dispatchNewRowState={dispatchNewRowState}
        marqName={marqName}
      />
      <ResetBtn
        appOutputState={appOutputState}
        dispatchAppOutput={dispatchAppOutput}
        marqName={marqName}
      />
      {appOutputState[marqName].isError === true ? <ErrorMsg /> : ""}
    </>
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

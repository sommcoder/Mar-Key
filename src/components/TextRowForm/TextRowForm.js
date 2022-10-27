import styled from "styled-components";
import data from "../../data/blockData.json";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useState, useEffect } from "react";

/*
 
textRowForm's logic handles user validation in the input elements (Text Rows)


TODO: I think we may need to incorporate a useState Hook in some way. with useEffect being the thing that triggers the animation


todo: what we want is for the particular element with user input that EXCEEDS the marquee width to have a one-time animation occur on it that triggered once the user tries to keyDown a key that would prevent the whole input from being able to fit on the marqueeRow
 
*/

let isError = false;

export default function TextRowForm(props) {
  // const [isError, toggleError] = useState(false); // a boolean state

  console.log("TextRowForm props:", props);
  // global component variables:
  const marqName = props.marqName;
  const marqState = props.marqState;
  const marqWidth = props.marqWidth;

  // this is an object that will store our currInput and its corresponding size. This DOES NOT need to be controlled in state because we do not want to trigger a rerendering each time we add something
  const inputValidationCache = {
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
    ////////////////////////////////////////////////
    if (key === "Tab") return;
    // prevents scroll jumping on space bar keyDown since we are on a read-only element
    // user can still scroll jump if they are NOT in an input element
    if (key === " ") ev.preventDefault();
    // handle enter/submit:
    // this should just erase the cache and in the SetCurrBtn component we will clear the entire form
    if (key === "Enter") {
      // do we even need to do this? won't the form submission in setCurrBtn trigger a rerendering?
      for (const line in inputValidationCache) {
        if (Object.hasOwn(inputValidationCache, line)) {
          console.log(inputValidationCache[line]);
          inputValidationCache[line].value = []; // reset to empty array
          inputValidationCache[line].size = 0; // reset to 0
        }
      }
      console.log(inputValidationCache);
      return;
    }

    // handle deletions
    if (key === "Backspace" || key === "Delete") {
      // lookup the size of the block that's in the last position of our cache Object
      // subtract and assign result to the cache
      inputValidationCache[row].size -= +data[
        inputValidationCache[row].value.at(-1)
      ].size
        .split("rem")
        .splice(0, 1);

      inputValidationCache[row].value.pop(); // pop the last input value off the valueArr

      // assign our cache to the input value
      ev.target.value = inputValidationCache[row].value.join("");
      return;
    }

    // get the size of the block that corresponds with what the user just inputted:
    let currBlockSize = +data[key].size.split("rem").splice(0, 1);

    // validation max capacity guard:
    if (inputValidationCache[row].size + currBlockSize > marqWidth) {
      console.log("cannot add, row capacity has been reached");
      // toggleError(true);
      return; // exit execution
    }

    ////////////////////////////////////////////////
    // if all above is well, add to our cache and assign currKey to our input element
    inputValidationCache[row].size += currBlockSize; // update size
    inputValidationCache[row].value.push(key); // update input values
    ev.target.value = inputValidationCache[row].value.join("");

    return;
  }

  return (
    // only id that is necessary. Needed to link the setCurrBtn to the form
    <StyledTextRowForm id="user-input-form">
      {props.keysArr.map((row) => (
        <StyledTextRow
          key={`${marqName}-${row}`}
          readOnly
          data-rowid={row}
          type="text"
          onKeyDown={validateEntry}
        />
      ))}
      <SetCurrBtn
        key={`set-${marqName}`}
        form="user-input-form"
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        rowState={props.rowState}
        setMarquee={props.setMarquee}
        setRow={props.setRow}
      />
      <ResetBtn
        key={`reset-${marqName}`}
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        setMarquee={props.setMarquee}
        initRowState={props.initRowState}
        setRow={props.setRow}
      />
      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
    </StyledTextRowForm>
  );
}

////////////////////////////////////////////////

const StyledTextRowForm = styled.div`
  margin-bottom: 0.5rem;
`;

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 350px;
  margin: 0px auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  cursor: pointer;
  border-left: 2px solid rgb(118, 118, 118); // workaround for border-left being too dark
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

  animation: errorShake ease-in-out 1s;
  animation-iteration-count: 1;

  @keyframes errorShake {
    0% {
      transform: translateX(-1%);
    }
    20% {
      transform: translateX(1%);
    }
    40% {
      transform: translateX(-2%);
    }
    60% {
      transform: translateX(2%);
    }
    80% {
      transform: translateX(1%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;

import styled, { ThemeProvider } from "styled-components";
import data from "../../data/blockData.json";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useRef } from "react";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";

export default function TextRowForm(props) {
  console.log("TextRowForm props:", props);
  const marqName = props.marqName;
  const marqState = props.marqState;
  const marqWidth = props.marqWidth;

  const inputRefsArr = useRef([]);
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  const inputValidationObj = {
    row0: { value: [], size: 0 },
    row1: { value: [], size: 0 },
    row2: { value: [], size: 0 },
  };

  ////////////////////////////////////////////////
  // INPUT VALIDATION FUNCTION
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
      for (const line in inputValidationObj) {
        // reset our validationObj
        if (Object.hasOwn(inputValidationObj, line)) {
          inputValidationObj[line].value = []; // reset to empty array
          inputValidationObj[line].size = 0; // reset to 0
        }
      }

      // adjust focus to NEXT sibling
      // if last sibling, reset to first child
      if (props.keysArr.indexOf(row) + 1 < props.keysArr.length)
        inputRefsArr.current[props.keysArr.indexOf(row) + 1].focus();
      else inputRefsArr.current[0].focus();
      return;
    }

    // handle deletions
    if (key === "Backspace" || key === "Delete") {
      // lookup the size of the block that's in the last position of our cache Object
      // subtract and assign result to the cache
      inputValidationObj[row].size -= +data[
        inputValidationObj[row].value.at(-1)
      ].size
        .split("rem")
        .splice(0, 1);

      inputValidationObj[row].value.pop(); // pop the last input value off the valueArr

      // assign our cache to the input value
      ev.target.value = inputValidationObj[row].value.join("");
      return;
    }

    // get the size of the block that corresponds with what the user just inputted:
    let currBlockSize = +data[key].size.split("rem").splice(0, 1);

    // validation max capacity guard / animation:
    if (inputValidationObj[row].size + currBlockSize > marqWidth) {
      inputRefsArr.current[props.keysArr.indexOf(row)].animate(
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
      // ref of marqState prop for updating
      let updatedMarqueeStateObj = marqState;
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
    // only id that is necessary. Needed to link the setCurrBtn to the form
    <StyledTextRowForm id="user-input-form">
      {props.keysArr.map((row) => (
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
      <SetCurrBtn
        marqName={marqName}
        marqState={marqState}
        form="user-input-form"
        type="submit"
      ></SetCurrBtn>
      <CompareBtn
        marqName={marqName}
        marqState={marqState}
        form="user-input-form"
        type="submit"
      ></CompareBtn>
      <ResetBtn
        marqName={marqName}
        marqState={marqState}
        form="user-input-form"
        type="reset"
      ></ResetBtn>

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
  z-index: 1;
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
`;

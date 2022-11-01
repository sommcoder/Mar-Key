import styled from "styled-components";
import data from "../../data/blockData.json";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import CompareBtn from "../CompareBtn/CompareBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import { useRef } from "react";

export default function TextRowForm(props) {
  console.log("TextRowForm props:", props);
  // global component variables:
  const marqName = props.marqName;
  const marqState = props.marqState;
  const marqWidth = props.marqWidth;

  console.log("marqWidth:", marqWidth);

  const inputRefsArr = useRef([]);
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  const inputValidationObj = {
    row0: { values: [], totalSize: 0 },
    row1: { values: [], totalSize: 0 },
    row2: { values: [], totalSize: 0 },
  };

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;
    console.log("key:", key, "row:", row, "ev:", ev);

    ////////////////////////////////////////////////
    if (key === "Tab") return;
    // prevents scroll jumping on space bar keyDown since input elements have been declared read-only
    // user can still scroll jump if they are NOT in an input element
    if (key === " ") ev.preventDefault();
    // handle enter/submit:
    // this should just erase the cache and in the SetCurrBtn component we will clear the entire form
    if (key === "Enter") {
      // do we even need to do this? won't the form submission in setCurrBtn trigger a rerendering?
      for (const line in inputValidationObj) {
        // reset our validationObj
        if (Object.hasOwn(inputValidationObj, line)) {
          inputValidationObj[line].values = []; // reset to empty array
          inputValidationObj[line].totalSize = 0; // reset to 0
        }
      }

      // FOCUS CYCLING:
      if (props.keysArr.indexOf(row) + 1 < props.keysArr.length)
        inputRefsArr.current[props.keysArr.indexOf(row) + 1].focus();
      else inputRefsArr.current[0].focus();
      return;
    }

    if (key === "Backspace" || key === "Delete") {
      // lookup the size of the block that's in the last position of our cache Object
      // subtract and assign result to the cache
      inputValidationObj[row].totalSize -= +data[
        inputValidationObj[row].values.at(-1)
      ].size
        .split("rem")
        .splice(0, 1);

      inputValidationObj[row].values.pop(); // pop the last input value off the valueArr

      // assign our cache to the input value
      ev.target.value = inputValidationObj[row].values.join("");
      return;
    }

    // get the size of the block that corresponds with what the user just inputted:
    let currBlockSize = +data[key].size.split("rem").splice(0, 1);
    currBlockSize += 0.125; // accounts for Block component's border size

    // validation max capacity guard:
    if (inputValidationObj[row].totalSize + currBlockSize > marqWidth) {
      // access the ref by the name of the corresponding row:
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
    console.log("currBlockSize:", currBlockSize);
    ////////////////////////////////////////////////
    // if all above is well, add to our cache and assign currKey to our input elements value
    inputValidationObj[row].totalSize += currBlockSize; // update size

    console.log(
      "inputValidationObj[row].size:",
      inputValidationObj[row].totalSize
    );
    inputValidationObj[row].values.push(key); // update input values
    ev.target.value = inputValidationObj[row].values.join("");

    console.log("inputValidationObj:", inputValidationObj);
  }

  // Component UI:
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
      <SetCurrBtn />
      <CompareBtn />
      <ResetBtn />
      {props.stockConflictState.length > 0 ? (
        <ErrorMsg stockError={props.stockConflictState} />
      ) : (
        ""
      )}
    </StyledTextRowForm>
  );
}

////////////////////////////////////////////////
const StyledTextRowForm = styled.form`
  margin-bottom: 0.5rem;
`;

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 300px;
  margin: 0px auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  z-index: 1;
  cursor: pointer;
  border-left: 2px solid rgb(118, 118, 118); // workaround for border-left being too dark
  box-shadow: 0 1px 2px rgba(39, 35, 35, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
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

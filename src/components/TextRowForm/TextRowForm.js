import styled, { css } from "styled-components";
import data from "../../data/blockData.json";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useRef } from "react";

export default function TextRowForm(props) {
  console.log("TextRowForm props:", props);
  // global component variables:
  const marqName = props.marqName;
  const marqState = props.marqState;
  const marqWidth = props.marqWidth;

  console.log("marqWidth:", marqWidth);

  // this is an object that will store our currInput and its corresponding size. This DOES NOT need to be controlled in state because we do not want to trigger a rerendering each time we add something
  const inputRefsArr = useRef([]);
  // on render of each TextRow, React will populate the refArr with refs from EACH of the TextRows as they are mapped in the return statement
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };
  /*
   
  should we use useRef for the cache object below? We DO need this data to persist between renders
   
  */
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

      // Input Focus cycling:
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

    // validation max capacity guard:
    if (inputValidationObj[row].size + currBlockSize > marqWidth) {
      console.log("currBlockSize:", currBlockSize);
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
    // if all above is well, add to our cache and assign currKey to our input elements value
    inputValidationObj[row].size += currBlockSize; // update size
    inputValidationObj[row].value.push(key); // update input values
    ev.target.value = inputValidationObj[row].value.join("");

    console.log("inputValidationObj:", inputValidationObj);
  }

  /*
   
  all size validation is done in the textRowForm component

TODO: -remove all size validations
TODO: -take the data from our stateObj and populate the Marquee with blocks
   
  */

  ////////////////////////////////////////////////
  // SET MARQUEE FUNCTION
  function setCurrMarquee(ev) {
    ev.preventDefault();
    console.log("ev setCurrMarquee:", ev);
    const updatedRowValuesObj = {};
    let targetFormEl = ev.target.form; // form Element
    let sizeError = false;
    let validEntry = 0;

    // TEXTROW LOOP: Populates the targetValueArr
    for (let i = 0; i < props.keysArr.length; i++) {
      let targetValueStr = targetFormEl[i].value.trim(); // user input string
      validEntry++; // valid entry check
      let rowTargetId = targetFormEl[i].dataset.rowid;
      let rowInputArr = []; // a 2d array containing [ltr, size]
      // if the string is blank, skip and simply add to
      if (targetValueStr) {
        // spread string into individual letters in an array, trime edges
        let targetValueArr = [...targetValueStr]; // form the array
        console.log("rowTargetid:", rowTargetId);
        console.log("targetValueArr pre loop:", targetValueArr);

        // DATA EXTRACTION LOOP:
        // goes left to right across the strings indices
        for (let j = 0; j < targetValueStr.length; j++) {
          if (!data[targetValueStr[j]]) continue; // !exist clause
          // form our 2d array PER user character entry, push to inputArr
          rowInputArr.push([
            data[targetValueStr[j]].blockSymbol,
            data[targetValueStr[j]].size,
          ]);
        }
      }
      // every row gets committed to the rowState
      updatedRowValuesObj[rowTargetId] = rowInputArr;
    }
    console.log("updatedRowValuesObj POST loop:", updatedRowValuesObj);
    console.log("did we get a value?:", validEntry);

    ///////// conditional Marquee RowStateObj updates: /////////////
    // needs to be at least ONE valid row:
    if (validEntry) {
      props.setRow((rowValuesObj) => ({
        ...rowValuesObj,
        ...updatedRowValuesObj,
      }));

      ////////// condition MarqueeStateObj updates: ///////////
      // ref of marqState prop for updating
      let updatedMarqueeStateObj = marqState;
      updatedMarqueeStateObj[marqName].isSet = true;
      if (sizeError) updatedRowValuesObj[marqName].isError = true;

      console.log("updatedMarqueeStateObj", updatedMarqueeStateObj);
      props.setMarquee((marqueeState) => ({
        ...marqueeState,
        ...updatedMarqueeStateObj,
      }));
      // reset the textRows afterSubmit
      for (let i = 0; i < 3; i++) ev.target.form[i].value = "";
    }
    console.log("marqObj POST toggleMarquee():", marqState);
  }

  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";

    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...props.rowInitState,
    }));
    let updatedMarqueeStateObj = props.marqState;
    updatedMarqueeStateObj[props.marqName].isSet = false;
    props.toggleMarquee((marqueeState) => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));
  }

  ////////////////////////////////////////////////
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
      <StyledSetCurrBtn
        form="user-input-form"
        type="submit"
        onClick={setCurrMarquee}
      >
        Set
        <StyledTooltipBox>
          Sets the current marquee
          <StyledArrow></StyledArrow>
        </StyledTooltipBox>
      </StyledSetCurrBtn>

      <StyledCompareBtn>
        Compare
        <StyledTooltipBox>
          Compares to the set marquee<StyledArrow></StyledArrow>
        </StyledTooltipBox>
      </StyledCompareBtn>

      <StyledResetBtn form="user-input-form" type="reset" onClick={resetRows}>
        Reset
        <StyledTooltipBox>
          Resets entire marquee<StyledArrow></StyledArrow>
        </StyledTooltipBox>
      </StyledResetBtn>

      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
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

const StyledTooltipBox = styled.span`
  display: none;
  border-radius: 4px;
  position: absolute;
  color: white;
  background-color: rgba(44, 43, 43, 1);
  bottom: 40px;
  left: 50%;
  width: 120px;
  padding: 8px 8px;
  margin-left: -60px; // use half the width 120/2
`;

const StyledArrow = styled.span`
  content: "";
  position: absolute;
  left: 50%;

  /* vertically center */
  top: 120%;
  transform: translateY(-50%);
  border: 10px solid rgba(44, 43, 43, 1);
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
  display: none;
`;

const StyledSetCurrBtn = styled.button`
  color: black;
  background-color: powderblue;
  font-weight: 600;
  border-radius: 2.5px;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  border: none;
  height: 3.5rem;
  width: 10rem;
  padding: 0.5rem;
  text-align: center;
  &:hover {
    cursor: pointer;
  }

  ////////////////////////
  position: relative; // relative for tooltip popup

  &:hover ${StyledTooltipBox} {
    display: block;
    transition-delay: 1s;
  }

  &:hover ${StyledArrow} {
    display: block;
    transition-delay: 1s;
  }

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
`;

const StyledCompareBtn = styled(StyledSetCurrBtn)``;

const StyledResetBtn = styled(StyledSetCurrBtn)``;

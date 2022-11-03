import styled from "styled-components";
import data from "../../data/blockData.json";
import {
  StyledTooltipBox,
  StyledArrow,
  StyledResetBtn,
} from "../ResetBtn/ResetBtn";

export default function SetCurrBtn(props, { marqName, marqState }) {
  console.log("SetCurrBtn props:", props);

  const updatedRowValuesObj = {};
  let conflictsArr = []; // any input that does NOT have enough stock will be populated in this array

  // this is a global object as we need to concern ourselves with the tally for ALL rows
  const inputTrackerObj = {}; // letterVar: {row: { tally: 0, stock: 0 },}
  // SET MARQUEE FUNCTION
  function populateStateObjects(el) {
    // !TEXTROW LOOP:
    for (let i = 0; i < props.keysArr.length; i++) {
      let targetValueStr = el[i].value.trim(); // user input string
      let rowTargetId = el[i].dataset.rowid;
      let rowInputObj = { values: [], sizes: [] }; // assign to the right row in State
      if (!targetValueStr) return;

      // !JSON DATA LOOP:
      for (let j = 0; j < targetValueStr.length; j++) {
        let inputData = data[targetValueStr[j]];
        console.log("inputData:", inputData);
        if (!inputData) continue;
        let ltr = targetValueStr[j];
        console.log("ltr:", ltr);

        // !POPULATE ROW STATE OBJECT:
        rowInputObj.values.push(inputData.blockSymbol);
        rowInputObj.sizes[j] = inputData.size;

        // !POPULATE TRACKER STATE OBJECT:
        if (ltr !== " ") {
          // if the inputTrackerObj doesn't ALREADY have a key of the incoming input name, create it!
          if (!inputTrackerObj[ltr]) {
            // set this unique input name to the value of the object below:
            inputTrackerObj[ltr] = { tally: 1, stock: 0 };
            // set the stock to the stock of that
            inputTrackerObj[ltr].stock = inputData.stock;
          } else inputTrackerObj[ltr].tally += 1;
          if (
            inputTrackerObj[ltr].tally > inputTrackerObj[ltr].stock &&
            !conflictsArr.includes(ltr)
          ) {
            // pushes inputs with a stock conflict to array:
            conflictsArr.push(ltr);
          }
        }
      }
      updatedRowValuesObj[rowTargetId] = rowInputObj; // commit row to state object
    }
  }

  function setCurrMarquee(ev) {
    ev.preventDefault();
    console.log("ev setCurrMarquee:", ev);
    let targetFormEl = ev.target.form; // form Element

    populateStateObjects(targetFormEl);
    console.log("inputTrackerObj POST function:", inputTrackerObj);
    console.log("updatedRowValuesObj POST function:", updatedRowValuesObj);

    // if we had any stock conflicts detected, update State with setStockConflict()
    // Triggers a rerender of the Marquee Component and displays the corresponding errMsg
    if (conflictsArr.length > 0) {
      props.setStockConflict((initConflictsArr) => ({
        ...initConflictsArr,
        ...conflictsArr,
      }));
    }

    // Marquee RowStateObj updates:
    // needs to be at least ONE valid row:
    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...updatedRowValuesObj,
    }));

    // condition MarqueeStateObj updates:
    // reference of marqState prop for updating
    let updatedMarqueeStateObj = marqState;
    updatedMarqueeStateObj[marqName].isSet = true;

    console.log("updatedMarqueeStateObj", updatedMarqueeStateObj);
    props.setMarquee((marqueeState) => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));

    // reset textRow Components afterSubmit
    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";

    console.log("marqObj POST toggleMarquee():", marqState);

    // create a function that creates a popup
  }

  return (
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
  );
}

// copy of ResetBtn styled Component
const StyledSetCurrBtn = styled(StyledResetBtn)``;

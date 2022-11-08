import styled from 'styled-components';
import data from '../../data/blockData.json';
import {
  StyledTooltipBox,
  StyledArrow,
  StyledResetBtn,
} from '../ResetBtn/ResetBtn.jsx';

export default function SetCurrBtn({
  setStockConflict,
  dispatchRowState,
  keysArr,
  marqName,
  appState,
}) {
  let rowTargetId; // which row(s) were updated
  let conflictsArr = []; // populate with conflict inputs
  console.log('rowTargetId:', rowTargetId);
  const updatedRowValuesObj = {};
  const inputTrackerObj = {}; // letterVar: {row: { tally: 0, stock: 0 },}
  // SET MARQUEE FUNCTION
  function populateStateObjects(el) {
    console.log('el.value:', el.value);
    // !TEXTROW LOOP:
    for (let i = 0; i < keysArr.length; i++) {
      if (!el[i].value) continue; // no value clause
      let targetValueStr = el[i].value.trim();
      rowTargetId = el[i].dataset.rowid;
      console.log('targetValueStr:', targetValueStr);
      console.log('rowTargetId:', rowTargetId);

      let rowInputObj = { values: [], sizes: [] }; // assign to the right row in State

      // !JSON DATA LOOP:
      for (let j = 0; j < targetValueStr.length; j++) {
        let inputData = data[targetValueStr[j]];
        console.log('inputData:', inputData);
        if (!inputData) continue;
        let ltr = targetValueStr[j];
        console.log('ltr:', ltr);

        // !POPULATE ROW STATE OBJECT:
        rowInputObj.values.push(inputData.blockSymbol);
        rowInputObj.sizes[j] = inputData.size;

        // !POPULATE TRACKER STATE OBJECT:
        if (ltr !== ' ') {
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
    console.log('ev setCurrMarquee:', ev);
    let targetFormEl = ev.target.form; // form Element
    console.log('targetFormEl:', targetFormEl);

    populateStateObjects(targetFormEl);

    console.log('inputTrackerObj POST function:', inputTrackerObj);
    console.log('updatedRowValuesObj POST function:', updatedRowValuesObj);

    // if we had any stock conflicts detected, update State with setStockConflict()
    // Triggers a rerender of the Marquee Component and displays the corresponding errMsg
    // if (conflictsArr.length > 0) {
    //   setStockConflict((initConflictsArr) => ({
    //     ...initConflictsArr,
    //     ...conflictsArr,
    //   }));
    // }
    console.log('rowTargetId b4 dispatch:', rowTargetId);

    // Marquee RowStateObj updates:
    dispatchRowState({ type: 'update', payload: updatedRowValuesObj });

    // condition MarqueeStateObj updates:
    // reference of appState prop for updating
    let updatedMarqueeStateObj = appState;
    // updatedMarqueeStateObj[marqName].isSet = true;

    console.log('updatedMarqueeStateObj', updatedMarqueeStateObj);
    dispatchRowState(marqueeState => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));

    // reset textRow Components afterSubmit
    for (let i = 0; i < 3; i++) ev.target.form[i].value = '';

    console.log('marqObj POST toggleMarquee():', appState);
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
        <StyledArrow />
      </StyledTooltipBox>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled(StyledResetBtn)`
  color: black;
`;

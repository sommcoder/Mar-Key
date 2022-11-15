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
  /*
   
  look into creating a CUSTOM HOOK so that we can share this logic in THIS component but ALSO the CompareBtn component!!
   
  */

  function setCurrMarquee(ev) {
    ev.preventDefault();
    const updatedRowValuesObj = {};
    let form = ev.target.form; // form Element

    // Form Row Loop:
    for (let row = 0; row < keysArr.length; row++) {
      if (!form[row].value) continue; // no value clause
      let targetValueStr = form[row].value.trim();
      let rowTargetId = form[row].dataset.rowid;
      let rowInputObj = { values: [], sizes: [] };

      // Row Input Loop:
      for (let ltr = 0; ltr < targetValueStr.length; ltr++) {
        let inputData = data[targetValueStr[ltr]]; // lookup!
        if (!inputData) continue;
        // add error msg here! "cannot find ltr!"
        rowInputObj.values.push(inputData.blockSymbol);
        rowInputObj.sizes[ltr] = inputData.size;
      }
      updatedRowValuesObj[rowTargetId] = rowInputObj;
    }

    // Marquee RowStateObj updates:
    dispatchRowState({ type: 'update', payload: updatedRowValuesObj });

    // reset textRow Components afterSubmit
    for (let i = 0; i < keysArr.length; i++) form[i].value = '';
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

// Are we gunna need this??? vvvvv
/*
 
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
 
*/

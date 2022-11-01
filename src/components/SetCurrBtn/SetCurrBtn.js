import styled from 'styled-components';
import data from '../../data/blockData.json';

export default function SetCurrBtn(props) {
  console.log('SetCurrBtn props:', props);
  const marqName = props.marqName;
  const marqState = props.marqState;

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

    populateStateObjects(targetFormEl);
    console.log('inputTrackerObj POST function:', inputTrackerObj);
    console.log('updatedRowValuesObj POST function:', updatedRowValuesObj);

    // if we had any stock conflicts detected, update State with setStockConflict()
    // Triggers a rerender of the Marquee Component and displays the corresponding errMsg
    if (conflictsArr.length > 0) {
      props.setStockConflict(initConflictsArr => ({
        ...initConflictsArr,
        ...conflictsArr,
      }));
    }

    // Marquee RowStateObj updates:
    // needs to be at least ONE valid row:
    props.setRow(rowValuesObj => ({
      ...rowValuesObj,
      ...updatedRowValuesObj,
    }));

    // condition MarqueeStateObj updates:
    // reference of marqState prop for updating
    let updatedMarqueeStateObj = marqState;
    updatedMarqueeStateObj[marqName].isSet = true;

    console.log('updatedMarqueeStateObj', updatedMarqueeStateObj);
    props.setMarquee(marqueeState => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));

    // reset textRow Components afterSubmit
    for (let i = 0; i < 3; i++) ev.target.form[i].value = '';

    console.log('marqObj POST toggleMarquee():', marqState);

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
  content: '';
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
  position: relative; // relative for tooltip popup
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

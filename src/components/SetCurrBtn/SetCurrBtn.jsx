import styled from "styled-components";
import data from "../../data/blockData.json";
import setCurrMarquee from "../../functions/setCurrMarquee";
import {
  StyledTooltipBox,
  StyledArrow,
  StyledResetBtn,
} from "../ResetBtn/ResetBtn.jsx";

export default function SetCurrBtn({ dispatchRowState, keysArr }) {
  function submitMarquee(ev) {
    const updatedRowValuesObj = setCurrMarquee(ev, data, keysArr);

    // dispatch:
    dispatchRowState({
      type: "update",
      payload: updatedRowValuesObj,
    });
  }
  return (
    <StyledSetCurrBtn
      form="user-input-form"
      type="submit"
      onClick={submitMarquee}
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

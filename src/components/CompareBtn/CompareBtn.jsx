import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import data from "../../data/blockData.json";
import {
  StyledResetBtn,
  StyledTooltipBox,
  StyledArrow,
} from "../ResetBtn/ResetBtn";

export default function CompareBtn({ keysArr, dispatchRowState }) {
  function compareMarquee(ev) {
    console.log("ev:", ev);

    const updatedRowValuesObj = setCurrMarquee(ev, data, keysArr);
    /*
 
rethought our Marquee state. Going to access MarqState in CompareBtn and use that state to dispatch the reduce fn for AppState. CompareBtn will updates the setInput and the CompareInput, this will trigger a rendering of the Modal Component popup
 
*/

    /*
    
1) get a tally of the COUNT of each ltr: currMarquee
2) get a tally of the COUNT of each ltr: newMarquee
3) use dispAppState to update the Marquee
4) this triggers the modal popup!




5) display NEW marquee, use the dispatchRowState update as the NEW current marqRowState
*/

    dispatchRowState({
      type: "update",
      payload: updatedRowValuesObj,
    });

    ev.preventDefault();
  }
  return (
    <StyledCompareBtn
      form="user-input-form"
      type="submit"
      onClick={compareMarquee}
    >
      Compare
      <StyledTooltipBox>
        Compares to set marquee
        <StyledArrow />
      </StyledTooltipBox>
    </StyledCompareBtn>
  );
}

const StyledCompareBtn = styled(StyledResetBtn)`
  color: black;
`;

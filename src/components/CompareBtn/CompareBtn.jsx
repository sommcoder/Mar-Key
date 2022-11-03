import styled from "styled-components";
import {
  StyledResetBtn,
  StyledTooltipBox,
  StyledArrow,
} from "../ResetBtn/ResetBtn";

export default function CompareBtn({ setStockSummaryState, keysArr }) {
  function compareMarquee(ev) {
    ev.preventDefault();

    console.log("ev setCurrMarquee:", ev);
    let targetFormEl = ev.target.form; // form Element

    // FORM ROW INPUT LOOP:
    for (let i = 0; i < keysArr.length; i++) {
      let targetValueStr = targetFormEl[i].value.trim(); // user input string
      let rowTargetId = targetFormEl[i].dataset.rowid;

      // we will need to separate the Marquee update function from the SETMARQUEE function because compare will ALSO need to update the Marquee state. But obviously with additional functionality.

      console.log("targetValueStr:", targetValueStr);

      if (targetValueStr) {
        let targetValueArr = [...targetValueStr];

        console.log("rowTargetid:", rowTargetId);
        console.log("targetValueArr pre loop:", targetValueArr);
      }
    }

    // once we've compared the initial marquee to the new marquee we need to update the state of the
    setStockSummaryState();
  }
  return (
    <StyledCompareBtn
      form="user-input-form"
      type="submit"
      onClick={compareMarquee}
    >
      Compare
      <StyledTooltipBox>
        Compares to set marquee<StyledArrow></StyledArrow>
      </StyledTooltipBox>
    </StyledCompareBtn>
  );
}

const StyledCompareBtn = styled(StyledResetBtn)`
  color: black;
`;

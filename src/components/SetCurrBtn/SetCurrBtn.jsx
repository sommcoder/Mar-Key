import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import { Button, Arrow, Tooltip } from "../../styles/Button.styled";

export default function SetCurrBtn({ dispatchRowState, keysArr }) {
  function submitMarquee(ev) {
    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);

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
const StyledTooltipBox = styled(Tooltip)``;
const StyledArrow = styled(Arrow)``;
const StyledSetCurrBtn = styled(Button)`
  &:hover ${StyledTooltipBox}, ${StyledArrow} {
    display: block;
    transition-delay: 1s;
    z-index: 10;
  }
`;

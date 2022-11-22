import styled from "styled-components";
import { Button, Arrow, Tooltip } from "../../styles/Button.styled";

export default function ResetBtn({ setRow, marqName, appState, setMarquee }) {
  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";
  }
  return (
    <StyledResetBtn form="user-input-form" type="reset" onClick={resetRows}>
      Reset
      <StyledTooltipBox>
        Resets marquee
        <StyledArrow />
      </StyledTooltipBox>
    </StyledResetBtn>
  );
}

const StyledTooltipBox = styled(Tooltip)``;
const StyledArrow = styled(Arrow)``;
const StyledResetBtn = styled(Button)`
  &:hover ${StyledTooltipBox}, ${StyledArrow} {
    display: block;
    transition-delay: 1s;
    z-index: 10;
  }
`;

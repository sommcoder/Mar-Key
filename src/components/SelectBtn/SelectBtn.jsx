import styled from "styled-components";
import { Button, Arrow, Tooltip } from "../../styles/Button.styled";

export default function SelectBtn({ marqName }) {
  function toggleDisplay(ev) {
    /*
     
    the select button toggles WHICH marquee is able to be receive input from the Keyboard component and what the user presses
     
    */
  }

  return (
    <StyledSelectBtn onClick={toggleDisplay} data-id={marqName}>
      {`${marqName} Marquee`}
      <StyledTooltipBox>
        Select Marquee(s) to work with
        <StyledArrow />
      </StyledTooltipBox>
    </StyledSelectBtn>
  );
}

const StyledTooltipBox = styled(Tooltip)``;
const StyledArrow = styled(Arrow)``;
const StyledSelectBtn = styled(Button)`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 25rem;
  margin-bottom: 1rem;
  &:hover ${StyledTooltipBox}, ${StyledArrow} {
    display: block;
    transition-delay: 1s;
    z-index: 10;
  }
`;

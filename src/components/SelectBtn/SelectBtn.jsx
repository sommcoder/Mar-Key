import styled from "styled-components";
import {
  StyledResetBtn,
  StyledTooltipBox,
  StyledArrow,
} from "../ResetBtn/ResetBtn";

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

const StyledSelectBtn = styled(StyledResetBtn)`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 25rem;
  margin-bottom: 1rem;
  &:focus {
    border: 2px solid green;
  }
`;

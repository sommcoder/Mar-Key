import styled from "styled-components";
import {
  StyledResetBtn,
  StyledTooltipBox,
  StyledArrow,
} from "../ResetBtn/ResetBtn";

export default function SelectBtn({ marqName }) {
  function toggleDisplay(ev) {
    // if selected, the button should highlight green
    // toggle Marquee visibility:
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
  margin-bottom: 2rem;
  &:focus {
    border: 2px solid green;
  }
`;

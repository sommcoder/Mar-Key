import styled from "styled-components";
import {
  StyledResetBtn,
  StyledTooltipBox,
  StyledArrow,
} from "../ResetBtn/ResetBtn";

export default function DisplayBtn({ marqState, marqName, setMarquee }) {
  function toggleDisplay(ev) {
    // console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // toggle Marquee visibility:
    if (marqState[marqueeToUpdate].isVisible === true)
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    else updatedMarqueeState[marqueeToUpdate] = { isVisible: true };

    setMarquee((currState) => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  return (
    <StyledDisplayBtn onClick={toggleDisplay} data-id={marqName}>
      {`${marqName} Marquee`}
      <StyledTooltipBox>
        Select Marquee(s) to work with
        <StyledArrow></StyledArrow>
      </StyledTooltipBox>
    </StyledDisplayBtn>
  );
}

const StyledDisplayBtn = styled(StyledResetBtn)`
  display: block;
  position: relative;
  // now that it's a block, we have to redefine position I suppose?
  margin: 0 auto;
  width: 25rem;
  // now that it's a block, we have to redefine the margin I suppose?
`;

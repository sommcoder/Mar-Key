import styled from "styled-components";

export default function DisplayBtn(props) {
  function toggleDisplay(ev) {
    // console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // toggle Marquee visibility:
    if (props.marqueeState[marqueeToUpdate].isVisible === true)
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    else updatedMarqueeState[marqueeToUpdate] = { isVisible: true };

    props.setMarquee((currState) => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  return (
    <StyledDisplayBtn onClick={toggleDisplay} data-id={props.name}>
      {`${props.name} Marquee`}
      <StyledTooltipBox>
        Select Marquee(s) to work with
        <StyledArrow></StyledArrow>
      </StyledTooltipBox>
    </StyledDisplayBtn>
  );
}

////////////////////////////////////////////////

const StyledTooltipBox = styled.span`
  display: none;
  z-index: 5;
  border-radius: 4px;
  position: absolute;
  color: white;
  background-color: rgba(44, 43, 43, 1);
  bottom: 40px;
  left: 50%;
  width: 120px;
  padding: 8px 8px;
  /* margin-left: calc(120px / 2); */
  /* margin-left: 50%; // use half the width 120/2 */
`;

const StyledArrow = styled.span`
  content: "";
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 120%;
  transform: translateY(-50%);
  border: 10px solid rgba(44, 43, 43, 1);
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
  display: none;
`;

const StyledDisplayBtn = styled.button`
  display: block;
  width: 25rem;
  &:hover ${StyledTooltipBox} {
    display: block;
    transition-delay: 1s;
  }

  &:hover ${StyledArrow} {
    display: block;
    transition-delay: 1s;
  }

  &:hover {
    background-color: white;
    background: none;
    color: black;
    border: 0.2rem solid powderblue;
    transition: ease-in-out;
    cursor: pointer;
  }
`;

import styled from "styled-components";

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
//////////////////////////////////
// BUTTON DESIGN/INTERACTIVITY://
// this is exported to all of the other buttons in the App
//////////////////////////////////
export const StyledTooltipBox = styled.span`
  display: none;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  font-size: 1.25rem;
  top: -20%; // allows space for tooltip arrow
  left: 50%;
  transform: translateX(-50%) translateY(-110%);
  color: white;
  background-color: rgba(44, 43, 43, 1);
  width: 150px;
  padding: 8px 8px;
`;

export const StyledArrow = styled.span`
  content: "";
  position: absolute;
  display: none;
  top: 95%;
  left: 45%; // not sure why 45% works?? cause of the border???
  // creates a triangle from a square:
  border: 10px solid rgba(44, 43, 43, 1);
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
`;

export const StyledResetBtn = styled.button`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;

  &:hover {
    cursor: pointer;
    background-color: white;
    border: 2px solid powderblue;
  }

  &:hover ${StyledTooltipBox}, ${StyledArrow} {
    display: block;
    transition-delay: 1s;
    z-index: 10;
  }
`;

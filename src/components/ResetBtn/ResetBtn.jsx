import styled from "styled-components";

export default function ResetBtn(props) {
  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";

    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...props.initRowState,
    }));
    let updatedMarqueeStateObj = props.marqState;
    updatedMarqueeStateObj[props.marqName].isSet = false;
    props.setMarquee((marqueeState) => ({
      ...marqueeState,
      ...updatedMarqueeStateObj,
    }));
  }
  return (
    <StyledResetBtn form="user-input-form" type="reset" onClick={resetRows}>
      Reset
      <StyledTooltipBox>
        Resets entire marquee<StyledArrow></StyledArrow>
      </StyledTooltipBox>
    </StyledResetBtn>
  );
}
export const StyledTooltipBox = styled.span`
  display: none;
  border-radius: 4px;
  position: absolute;
  color: white;
  background-color: rgba(44, 43, 43, 1);
  bottom: 40px;
  left: 50%;
  width: 120px;
  padding: 8px 8px;
  margin-left: -60px; // use half the width 120/2
`;

export const StyledArrow = styled.span`
  content: "";
  position: absolute;
  left: 50%;

  /* vertically center */
  top: 120%;
  transform: translateY(-50%);
  border: 10px solid rgba(44, 43, 43, 1);
  border-color: rgba(44, 43, 43, 1) transparent transparent transparent;
  display: none;
`;

export const StyledResetBtn = styled.button`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;

  &:hover {
    cursor: pointer;
  }

  &:hover ${StyledTooltipBox} {
    display: block;
    transition-delay: 1s;
  }

  &:hover ${StyledArrow} {
    display: block;
    transition-delay: 1s;
  }
`;

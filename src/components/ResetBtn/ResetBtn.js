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
const StyledResetBtn = styled(StyledSetCurrBtn)``;

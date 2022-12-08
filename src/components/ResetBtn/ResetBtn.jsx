import styled from "styled-components";
import { Button } from "../../styles/Button.styled";

export default function ResetBtn({
  setRow,
  marqName,
  appState,
  setMarquee,
  formName,
}) {
  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";
  }
  return (
    <StyledResetBtn
      form={formName}
      type="reset"
      onClick={resetRows}
      title="Resets marquee"
    >
      Reset
    </StyledResetBtn>
  );
}

const StyledResetBtn = styled(Button)``;

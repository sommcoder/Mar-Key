import styled from "styled-components";
import { Button } from "../../styles/Button.styled";

export default function ResetBtn({
  initMarqRowState,
  dispatchRowState,
  formName,
}) {
  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    console.log("reset - ev:", ev);

    const updatedRowValuesObj = initMarqRowState;

    for (let i = 0; i < 3; i++) ev.target.form[i].value = "";

    dispatchRowState({
      type: "reset",
      payload: updatedRowValuesObj,
    });
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

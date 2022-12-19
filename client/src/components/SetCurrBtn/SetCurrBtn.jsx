import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import { Button } from "../../styles/Button.styled";

export default function SetCurrBtn({ dispRowState, keysArr, formName }) {
  function submitMarquee(ev) {
    console.log("ev:", ev);

    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);

    // dispatch:
    dispRowState({
      type: "set",
      payload: updatedRowValuesObj,
    });
  }
  return (
    <StyledSetCurrBtn
      form={formName}
      type="submit"
      onClick={submitMarquee}
      title="Sets the current marquee"
    >
      Set
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled(Button)``;

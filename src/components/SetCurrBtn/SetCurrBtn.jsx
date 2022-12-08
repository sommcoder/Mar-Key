import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import { Button } from "../../styles/Button.styled";

export default function SetCurrBtn({ dispatchRowState, keysArr, formName }) {
  function submitMarquee(ev) {
    console.log("ev:", ev);
    console.log("ev:", ev);

    if (ev === undefined) return;

    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);

    // dispatch:
    dispatchRowState({
      type: "update",
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

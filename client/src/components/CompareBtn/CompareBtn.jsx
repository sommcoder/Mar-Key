import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import { Button } from "../../styles/Button.styled";

export default function CompareBtn({ formName, keysArr, dispRowState }) {
  function compareMarquee(ev) {
    console.log("compare ev:", ev);
    console.log("keysArr:", keysArr);
    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);

    dispRowState({
      type: "compare",
      payload: updatedRowValuesObj,
    });

    /*
     
    BOTH set and compare have some common funcionality, but will update different properties on AppState

    This function should perhaps be performed INSIDE the button components and THEN passed to the Marquee component via the dispatch function where the rowReducer and update state and trigger an appState update as well 

    After the end of "set" & "compare" we need to update appState by MarqName and setInput/compareInput respectively!
   
     
    */

    ev.preventDefault();
  }
  return (
    <StyledCompareBtn
      form={formName}
      type="submit"
      onClick={compareMarquee}
      title="Compares to set marquee"
    >
      Compare
    </StyledCompareBtn>
  );
}

const StyledCompareBtn = styled(Button)``;

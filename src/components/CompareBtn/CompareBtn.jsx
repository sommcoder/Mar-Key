import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";
import { Button } from "../../styles/Button.styled";

export default function CompareBtn({ formName, keysArr, dispRowState }) {
  function compareMarquee(ev) {
    console.log("compare ev:", ev);
    console.log("keysArr:", keysArr);
    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);

    /*
 
rethought our Marquee state. Going to access MarqState in CompareBtn and use that state to dispatch the reduce fn for AppState. CompareBtn will updates the setInput and the CompareInput, this will trigger a rendering of the Modal Component popup
 
*/

    /*
    
1) get a tally of the COUNT of each ltr: currMarquee
2) get a tally of the COUNT of each ltr: newMarquee
3) use dispAppState to update the Marquee
4) this triggers the modal popup!




5) display NEW marquee, use the dispRowState update as the NEW current marqRowState
*/
    dispRowState({
      type: "set",
      payload: updatedRowValuesObj,
    });

    /*
     
    BOTH set and compare have some common funcionality, perhaps I can create ANOTHER separate function that is used on both updatedRowValuesObj to get the properly formatted rowState that is used to update the view by allowing the Block components to be iterated from the array.

    This function should perhaps be performed INSIDE the button components and THEN passed to the Marquee component via the dispatch function where the rowReducer and update state and trigger an appState update as well 

    After the end of "set" & "compare" we need to update appState by MarqName and setInput/compareInput respectively!
   
     
    */
    dispRowState({
      type: "compare",
      payload: updatedRowValuesObj,
    });

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

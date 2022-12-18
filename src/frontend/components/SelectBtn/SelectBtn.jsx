import styled from "styled-components";
import { Button } from "../../frontend/styles/Button.styled";

export default function SelectBtn({ marqName }) {
  function toggleDisplay(ev) {
    /*
     
    the select button toggles WHICH marquee is able to be receive input from the Keyboard component and what the user presses
     
    */
  }

  return (
    <StyledSelectBtn
      onClick={toggleDisplay}
      data-id={marqName}
      title="Select Marquee(s) to work with"
    >
      {`${marqName} Marquee`}
    </StyledSelectBtn>
  );
}

const StyledSelectBtn = styled(Button)`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 25rem;
  margin-bottom: 1rem;
`;

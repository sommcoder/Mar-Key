import styled from "styled-components";

export default function ErrorMsg(props) {
  const err_size = "Your text blocks are too large for this marquee row";
  const err_input = "This particular symbol was not found in our database";

  /*
   
  theres an errorMsg component for each marquee component.

  The error msg is triggered through logic in the SetCurrBtn or ResetBtn components

  It needs to appear ONLY on the marquee that contains the error
   
  */

  //   function showMsg() {}
  return (
    <StyledErrorMsg>
      Your text blocks are too large for this marquee row
    </StyledErrorMsg>
  );
}

const StyledErrorMsg = styled.div`
  border: 0.05rem solid black;
  margin: 1rem auto;
  max-width: fit-content;
  padding: 0.5rem;
  border-radius: 3px;
  border-color: red;
  color: red;
`;

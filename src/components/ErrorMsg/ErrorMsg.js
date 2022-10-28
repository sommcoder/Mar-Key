import styled from "styled-components";

export default function ErrorMsg(props) {
  //   function showMsg() {}
  // display props.errMessage in the StyledErrorMsg Component after state update when an error is detected in the other components
  return <StyledErrorMsg></StyledErrorMsg>;
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

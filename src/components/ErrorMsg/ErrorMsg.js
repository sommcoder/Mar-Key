import styled from "styled-components";

export default function ErrorMsg(props) {
  const errorMessages = {
    err_size: "The size of your letters are too large for this marquee",
    err_unknown_input: "This particular symbol was not found in our database",
    err_missing_input: `There are not enough ____ in inventory`,
  };

  console.log("ErrorMSG props:", props);
  let stockErrorStr = props.stockError.split("");

  console.log("errorMsgStr", stockErrorStr);
  //   function showMsg() {}
  // display props.errMessage in the StyledErrorMsg Component after state update when an error is detected in the other components
  return <StyledErrorMsg>${stockErrorStr}</StyledErrorMsg>;
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

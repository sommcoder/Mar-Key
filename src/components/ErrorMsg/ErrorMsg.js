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
    <div className="error-message">
      Your text blocks are too large for this marquee row
    </div>
  );
}

import data from "../../data/blockData.json";
import styled from "styled-components";

export default function SetCurrBtn(props) {
  console.log("Set CurrBtn props:", props);
  const marqState = props.marqState;
  const marqName = props.marqName;
  let disabled = true;

  function setCurrMarquee(ev) {
    ev.preventDefault();
    const updatedRowValuesObj = {};
    let targetFormEl = ev.target.form; // form Element
    let sizeError = false;
    let validEntry = 0;

    // TEXTROW LOOP: Populates the targetValueArr
    for (let i = 0; i < 3; i++) {
      let targetValueStr = targetFormEl[i].value.trim(); // user input string
      validEntry++; // valid entry check
      let rowTargetId = targetFormEl[i].dataset.rowid;
      let rowInputArr = []; // a 2d array containing [ltr, size]
      // if the string is blank, skip and simply add to
      if (targetValueStr) {
        // spread string into individual letters in an array, trime edges
        let targetValueArr = [...targetValueStr]; // form the array
        console.log("rowTargetid:", rowTargetId);
        console.log("targetValueArr pre loop:", targetValueArr);

        // DATA EXTRACTION LOOP:
        // goes left to right across the strings indices
        for (let j = 0; j < targetValueStr.length; j++) {
          if (!data[targetValueStr[j]]) continue; // !exist clause
          // form our 2d array PER user character entry, push to inputArr
          rowInputArr.push([
            data[targetValueStr[j]].blockSymbol,
            data[targetValueStr[j]].size,
          ]);
        }
      }
      // every row gets committed to the rowState
      updatedRowValuesObj[rowTargetId] = rowInputArr;
    }
    console.log("updatedRowValuesObj POST loop:", updatedRowValuesObj);
    console.log("did we get a value?:", validEntry);

    ///////// conditional Marquee RowStateObj updates: /////////////
    // needs to be at least ONE valid row:
    if (validEntry) {
      props.setRow((rowValuesObj) => ({
        ...rowValuesObj,
        ...updatedRowValuesObj,
      }));

      ////////// condition MarqueeStateObj updates: ///////////
      // ref of marqState prop for updating
      let updatedMarqueeStateObj = marqState;
      updatedMarqueeStateObj[marqName].isSet = true;
      if (sizeError) updatedRowValuesObj[marqName].isError = true;

      console.log("updatedMarqueeStateObj", updatedMarqueeStateObj);
      props.setMarquee((marqueeState) => ({
        ...marqueeState,
        ...updatedMarqueeStateObj,
      }));
      // reset the textRows afterSubmit
      for (let i = 0; i < 3; i++) ev.target.form[i].value = "";
    }
    console.log("marqObj POST toggleMarquee():", marqState);
  }
  return (
    <StyledSetCurrBtn
      form={props.form}
      disabled={disabled}
      onClick={setCurrMarquee}
    >
      {marqState[marqName].isSet ? "set new" : "set current"}
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button`
  &:hover {
    background-color: white;
    background: none;
    color: "powderblue";
    border: 0.2rem solid "powderblue";
    cursor: pointer;
    transition: ease-in-out;
  }
`;

/*
 
got the setCurrBtn to ALSO update the Marquee State Object so that it toggles its isSet property to true


now we need to update the ResetBtn component to do the opposite!
 
*/

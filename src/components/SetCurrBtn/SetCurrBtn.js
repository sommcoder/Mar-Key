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
      {marqState[marqName].isSet ? "Compare" : "Set"}
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button`
  color: black;
  background-color: powderblue;
  font-weight: 600;
  border-radius: 2.5px;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  border: none;
  height: 3.5rem;
  width: 10rem;
  padding: 0.5rem;
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  animation: fadeInAnimation ease-in-out 1s;
  animation-iteration-count: 1;

  @keyframes fadeInAnimation {
    start {
      opacity: 0;
    }
    end {
      opacity: 1;
    }
  }
  &:hover {
    background-color: white;
    background: none;
    color: black;
    border: 0.2rem solid powderblue;
    transition: ease-in-out;
    cursor: pointer;
  }
`;

/*
 
got the setCurrBtn to ALSO update the Marquee State Object so that it toggles its isSet property to true


now we need to update the ResetBtn component to do the opposite!
 
*/

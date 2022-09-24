import data from "../../data/blockData.json";

export default function SetCurrBtn(props) {
  console.log("marqWidth:", props.marqWidth);
  console.log("marq state obj prerender:", props.marqState);
  console.log("set btn:", props.marqName);
  console.log("marq is set?", props.marqState[props.marqName].isSet);

  function setCurrMarquee(ev) {
    ev.preventDefault();
    const updatedRowValuesObj = {};
    let atLeastOneValue = 0; // a counter to check if AT LEAST one of the rows contains a string
    console.log("ev:", ev);
    // have a red text warning message below the buttons that will inform the user that they need to have at LEAST one 3 letter word on the Marquee BEFORE they can set it!

    // TEXTROW LOOP: Populates the row content to the updatedRowValuesObj state object
    for (let i = 0; i < 3; i++) {
      let targetFormEl = ev.target.form;
      let targetValueStr = targetFormEl[i].value; // our user input as a string
      if (!targetValueStr) continue; // empty row clause
      atLeastOneValue++; // row value check, increment
      let rowTargetId = targetFormEl[i].dataset.rowid; // the rowId that corresponds to our STATE obj
      let targetValueArr = [];
      let rowInputArr = [];
      let totalSizeBlocks = 0;
      // spread string into individual letters in an array, trime edges
      targetValueArr = [...targetValueStr.trim()]; // form the array
      console.log("rowTargetid:", rowTargetId);
      console.log("targetValueArr pre loop:", targetValueArr);

      // JSON DATA EXTRACTION LOOP: pairs the size property value with its corresponding
      // if the rowTargetId in the state obj HASN'T already been populated, perform the loop
      // otherwise, it will be assumed that the row is empty, as it will also render empty

      let marqueeWidth = props.marqWidth.split("rem").splice(0, 1);
      console.log("marq:", marqueeWidth);

      for (let j = 0; j < targetValueStr.length; j++) {
        if (!data[targetValueStr[j]]) continue; // can't find user input clause

        // removes rem and converts to a number which we can use to sum all of the numbers in each row
        totalSizeBlocks += +data[targetValueStr[j]].size
          .split("rem")
          .splice(0, 1);

        /*
         
        if the total size of all of the blocks is >= than the width of that particular marquee's text rows, then we need to throw an error to the user!

        each Marquee's setCurrBtn will contain the prop for the marquees width
         
        */

        //push the size along with each corresponding letter in a 2D array inside our rowInputArr
        rowInputArr.push([
          data[targetValueStr[j]].blockSymbol,
          data[targetValueStr[j]].size,
        ]);
      }
      console.log("totalSizeOfBlocks:", totalSizeBlocks);
      console.log("rowInputArr:", rowInputArr);
      updatedRowValuesObj[rowTargetId] = rowInputArr;

      //sets the marquee state
      // we use this property of the state object to render the button in the return statement
    }
    console.log("updatedRowValuesObj POST loop:", updatedRowValuesObj);
    console.log("did we get a value?:", atLeastOneValue);

    // atleastOneValue MUST be set to true
    if (atLeastOneValue) {
      // this is how to update an Object instead of a value with the useState re-render function:
      props.setRow((rowValuesObj) => ({
        ...rowValuesObj,
        ...updatedRowValuesObj,
      }));
      console.log("marq state method:", props.toggleMarquee);

      // ref of marqState prop
      let updatedMarqueeStateObj = props.marqState;
      // set the is.Set key to True
      updatedMarqueeStateObj[props.marqName].isSet = true;
      console.log("updatedMarqueeStateObj", updatedMarqueeStateObj);
      // update the marquee object we've set
      props.toggleMarquee((marqueeState) => ({
        ...marqueeState,
        ...updatedMarqueeStateObj,
      }));
    }
    console.log("marqObj POST toggleMarquee():", props.marqState);
  }
  return (
    <button
      form={props.form}
      onClick={setCurrMarquee}
      className="set-current-marquee-btn"
    >
      {props.marqState[props.marqName].isSet ? "set new" : "set current"}
    </button>
  );
}

/*
 
got the setCurrBtn to ALSO update the Marquee State Object so that it toggles its isSet property to true


now we need to update the ResetBtn component to do the opposite!
 
*/

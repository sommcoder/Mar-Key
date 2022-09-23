import data from "../../data/blockData.json";

// data is importing
console.log(data[0]);

export default function SetCurrBtn(props) {
  // function checkMarqueeObj() {
  //   let rowObj = props.rowValuesObj;
  //   console.log("rowValuesObj Check:", rowObj);
  //   let keysArr = Object.keys(rowObj);
  //   console.log("keysArr", keysArr);

  //   // check if each array in the rowObject has a value already
  //   for (let i = 0; i < keysArr.length; i++) {
  //     // remember! empty objects and arrays are technically TRUTHY in JavaScript!
  //     // if length returns 0, 0 is of course FALSEY
  //     if (rowObj[keysArr[i]].length)
  //       console.log("has value:", rowObj[keysArr[i]]);
  //     else console.log("no currValue yet!", rowObj[keysArr[i]]);
  //   }
  // }

  function setCurrMarquee(ev) {
    ev.preventDefault(); // prevents the form from submitting to a server
    // checkMarqueeObj(); // check the current value of the marquee. If each row is blank, proceed, else return with user message!
    const updatedValueObj = {};
    console.log("ev:", ev);

    // have this button NOT work if there isn't at LEAST one 3 letter word on at LEAST one row
    // have a red text warning message below the buttons that will inform the user that they need to have at LEAST one 3 letter word on the Marquee BEFORE they can set it!

    let atLeastOneValue = 0; // a counter to check if AT LEAST one of the rows contains a string

    // iterates through each textRow component & Populate the row content to the updatedValueObj
    for (let i = 0; i < 3; i++) {
      let targetFormEl = ev.target.form;
      let targetValue = targetFormEl[i].value; // our input string
      let targetSizeArr = [];
      let rowInput;
      console.log("targetValue:", targetValue);

      // loop through the string, lookup based on key, if doesn't exist continue to next iteration.
      // How do we get this value to be associated with the
      for (let j = 0; j < targetValue.length; j++) {
        console.log("letters from data:", data[targetValue[i]]);

        // if doesn't exist, create and show() popup to user
        if (!data[targetValue[i]]) continue;

        targetSizeArr.push(data[targetValue[i]]);

        /*
 
We need to add the ["letter", "size"] as a 2d array within the greater array, with the rowTarget still as the key


// gotta figure out how to add the targetSize to the row Input's value, ensuring that the 0 index is the "ltr" and the 1 index is the "size"
 
*/
      }
      // we need to ensure that the letter EXISTS in the blockData.json!

      if (targetValue) atLeastOneValue++; // increments when we have a targetVal that isn't an empty string
      let rowTarget = targetFormEl[i].dataset.rowid; // the rowId that corresponds to our STATE obj
      rowInput = [...targetValue.trim()]; // spread string into individual letters in arr

      updatedValueObj[rowTarget] = rowInput;
    }
    console.log("object post loop:", updatedValueObj);
    console.log("did we get a value?:", atLeastOneValue);
    // atleastOneValue MUST be set to true
    if (atLeastOneValue) {
      // this is how to update an Object instead of a value with the useState re-render function:
      props.setRow((rowValuesObj) => ({
        ...rowValuesObj,
        ...updatedValueObj,
      }));
    }
  }
  return (
    <button
      form={props.form}
      onClick={setCurrMarquee}
      className="set-current-marquee-btn"
    >
      set current
    </button>
  );
}

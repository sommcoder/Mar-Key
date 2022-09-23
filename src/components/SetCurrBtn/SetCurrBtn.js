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
    ev.preventDefault();
    const updatedValueObj = {};
    let atLeastOneValue = 0; // a counter to check if AT LEAST one of the rows contains a string
    console.log("ev:", ev);
    // have a red text warning message below the buttons that will inform the user that they need to have at LEAST one 3 letter word on the Marquee BEFORE they can set it!

    // TEXTROW LOOP: Populates the row content to the updatedValueObj state object
    for (let i = 0; i < 3; i++) {
      let targetFormEl = ev.target.form;
      let targetValueStr = targetFormEl[i].value; // our user input as a string
      if (!targetValueStr) continue; // if there's no value continue to next iteration
      atLeastOneValue++; // row value check, increment
      let rowTargetId = targetFormEl[i].dataset.rowid; // the rowId that corresponds to our STATE obj
      let targetValueArr = [];
      let rowInputArr = [];
      // spread string into individual letters in an array, trime edges
      // form the array FIRST, then push the sizes to each letter array to form a 2D structure
      targetValueArr = [...targetValueStr.trim()];
      console.log("rowTargetid:", rowTargetId);
      console.log("targetValueArr pre loop:", targetValueArr);

      // JSON DATA EXTRACTION LOOP: pairs the size property value with its corresponding
      // if the rowTargetId in the state obj HASN'T already been populated, perform the loop
      // otherwise, it will be assumed that the row is empty, as it will also render empty
      if (!updatedValueObj[rowTargetId]) {
        // this check ^^^ may cause issues since a user may be inclined to simply rewrite their input for a particular row!
        for (let j = 0; j < targetValueStr.length; j++) {
          if (!data[targetValueStr[j]]) continue;
          rowInputArr.push([
            data[targetValueStr[j]].blockSymbol,
            data[targetValueStr[j]].size,
          ]);
        }
      }
      console.log("rowInputArr:", rowInputArr);
      updatedValueObj[rowTargetId] = rowInputArr;
    }
    console.log("updatedValueObj POST loop:", updatedValueObj);
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

import data from "../data/blockData.json";

export default function setCurrMarquee(ev, keysArr) {
  ev.preventDefault();
  const newMarqObj = {
    view: {}, // {row0: [[ltr, size],[ltr, size]] }
    output: {}, // {ltr: count, ltr: count}
  };
  let form = ev.target.form; // form Element

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    console.log("form[row].value:", form[row].value);

    // no value clause
    if (!form[row].value) {
      console.log(`row: "${row}" had no value!`);
      continue;
    }
    let inputStr = form[row].value.trim();
    let rowName = form[row].dataset.rowid;
    let rowArr = [];

    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      if (!data[inputStr[ltr]]) {
        console.log("error: cannot find letter in database");
        continue;
      }
      // if we don't already have the ltr/key in our output object, add it
      if (!newMarqObj.output[inputStr[ltr]])
        newMarqObj.output[inputStr[ltr]] = 1;
      else newMarqObj.output[inputStr[ltr]]++;

      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }
    form[row].value = ""; // reset row El's value
    newMarqObj.view[rowName] = rowArr;
    console.log("newMarqObj.output:", newMarqObj.output);
  }
  return newMarqObj;
}

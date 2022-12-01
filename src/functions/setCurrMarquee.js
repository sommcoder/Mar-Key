import data from "../data/blockData.json";

export default function setCurrMarquee(ev, keysArr) {
  ev.preventDefault();
  console.log("keysArr:", keysArr, "ev:", ev);
  const updatedRowValuesObj = {}; // to populate as payload
  let form = ev.target.form; // form Element

  console.log("form:", form);
  // Form Row Loop:
  for (let row = 0; row < keysArr.length; row++) {
    console.log("form[row].value:", form[row].value);
    if (!form[row].value) {
      console.log("form[row].value:", form[row].value);
      continue;
    } // no value clause
    let targetValueStr = form[row].value.trim(); // input

    let rowTargetId = form[row].dataset.rowid; // name of row
    let rowInputObj = { values: [], sizes: [] }; // rowObj
    console.log("targetValueStr:", targetValueStr);
    // Row Input Loop:
    for (let ltr = 0; ltr < targetValueStr.length; ltr++) {
      if (!data[targetValueStr[ltr]]) {
        console.log("error: cannot find letter in database");
        continue;
      }
      let inputData = data[targetValueStr[ltr]];
      rowInputObj.values.push(inputData.blockSymbol);
      rowInputObj.sizes[ltr] = inputData.size;
      console.log("rowInputObj:", rowInputObj);
    }
    updatedRowValuesObj[rowTargetId] = rowInputObj;
  }

  console.log("updatedRowValuesObj:", updatedRowValuesObj);

  // reset textRow Components afterSubmit
  for (let i = 0; i < keysArr.length; i++) form[i].value = "";

  return updatedRowValuesObj;
}

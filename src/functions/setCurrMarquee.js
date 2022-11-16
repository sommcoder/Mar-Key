export default function setCurrMarquee(ev, data, keysArr) {
  ev.preventDefault();
  const updatedRowValuesObj = {};
  let form = ev.target.form; // form Element

  // Form Row Loop:
  for (let row = 0; row < keysArr.length; row++) {
    if (!form[row].value) continue; // no value clause
    let targetValueStr = form[row].value.trim();
    let rowTargetId = form[row].dataset.rowid;
    let rowInputObj = { values: [], sizes: [] };

    // Row Input Loop:
    for (let ltr = 0; ltr < targetValueStr.length; ltr++) {
      let inputData = data[targetValueStr[ltr]]; // lookup!
      if (!inputData) continue;
      // add error msg here! "cannot find ltr!"
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

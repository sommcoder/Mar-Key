import data from "../../data/blockData.json";
import { useRef } from "react";

export default function TextRow(props) {
  const textRowInputContainer = useRef(null);

  // global component variables:
  const currMarqWidth = props.marqWidth;
  console.log("currMarqWidth:", currMarqWidth);
  let totalSizeBlocks = 0; // tracks curr size of the input field based on the key's size in our data
  let currInputArr = []; // tracks what's inside the input field for EACH TextRow component
  let disabled = false;
  let selected = false;

  // onFocus, switches the input selected value to true
  function activateTextRow() {
    selected = true;
    console.log(selected);
  }

  // onBlur, switches the input selected value to false
  function deactivateTextRow() {
    selected = false;
    console.log(selected);
  }

  function validateEntry(ev) {
    if (!selected) return true; // input must be selected 1st as input is readOnly
    let key = ev.key;
    console.log("ev:", ev);
    console.log("key:", key);

    if (
      key === "Tab" ||
      key === "CapsLock" ||
      key === "Shift" ||
      key === "Unidentified" ||
      key === "Alt" ||
      key === "Meta"
    )
      return true;

    if (key === "Backspace" || key === "Delete") {
      if (currInputArr.length === 0) return true;
      let adjustedStrArr = textRowInputContainer.current.value.split("");
      console.log(adjustedStrArr);
      textRowInputContainer.current.value = adjustedStrArr
        .slice(0, adjustedStrArr.length - 1)
        .join(""); // join returns A NEW STRING
      return true;
    }

    /*
     
    LOOK INTO WHY THE SPACE BAR MIGHT BE CAUSING THE BROWSER TO SCROLL DOWN THE PAGE????
     
    */

    // handle too large of an input:
    if (totalSizeBlocks >= currMarqWidth) {
      console.log("input too big");
      disabled = true;
      return false;
    }

    // when user adds VALID input:
    let prevStr = ev.target.value; // what is already in the input field
    console.log("prevStr:", prevStr);

    // we have made the input field readOnly, thus disabling the ability for the user to select where they would like to edit/input
    // the users only options are to add, delete, clear and submit the input fields
    textRowInputContainer.current.value += key;

    console.log(
      "textRowInputContainer.current:",
      textRowInputContainer.current.value
    );

    let currInputStr = `${prevStr}${key}`.toLowerCase().trim();
    currInputArr = [...currInputStr];
    totalSizeBlocks += +data[key].size.split("rem").splice(0, 1);

    console.log("totalSizeBlocks:", totalSizeBlocks);
    console.log("post: totalSizeBlocks:", totalSizeBlocks);

    return true;
  }

  return (
    <input
      readOnly
      ref={textRowInputContainer}
      selected={selected}
      onFocus={activateTextRow}
      onBlur={deactivateTextRow}
      className="text-row"
      data-rowid={props.rowId}
      type="text"
      onKeyDown={validateEntry}
      disabled={disabled}
    />
  );
}

// subtract the currInputArr's last element's size value from the totalSizeBlock Counter
// b
// totalSizeBlocks -= +data[currInputArr.at(-1)].size
//   .split("rem")
//   .splice(0, 1);
// currInputArr.splice(-1); // remove from array

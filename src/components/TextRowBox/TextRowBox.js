import data from "../../data/blockData.json";
import { useRef } from "react";

export default function TextRow(props) {
  const textRowRef = useRef(null);
  // now we need to iterate through them

  function changeFocus(rowId) {
    const map = getMap();
    const node = map.get(rowId);
  }

  function getMap() {
    if (!textRowRef.current) textRowRef.current = new Map();
    return textRowRef.current;
  }

  // validation state (no need for storing in a useState etc, because the state is active since the component is an input field)
  let disabled = false;
  let selected = false;

  // global component variables:
  const currMarqWidth = props.marqWidth;
  console.log("props.rowArr:", props.rowArr);
  console.log("currMarqWidth:", currMarqWidth);
  let totalSizeBlocks = 0; // tracks curr size of the input field based on the key's size in our data
  let currInputArr = []; // tracks what's inside the input field for EACH TextRow component

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
    // input must be selected 1st as input is readOnly to prevent full user input modification
    if (!selected) return true;
    let key = ev.key;
    console.log("ev:", ev);
    console.log("key:", key);

    console.log("did we make it?");
    // on enter, get the data-rowId of the next sibling
    if (key === "Enter") {
      const nextSibling = ev.target.nextSibling;
      console.log(nextSibling);

      // get first sibling of first child of the form element???
      changeFocus(nextSibling);
    }

    // prevent user holding down a key:
    if (key !== "Backspace" && ev.repeat) return false;
    // prevent auto-scrolling of the spacebar
    if (key === " " || ev.target === document.body) ev.preventDefault();

    // CLEAR:
    if (key === "Backspace" || key === "Delete") {
      if (currInputArr.length === 0) return true;
      let adjustedStrArr = textRowRef.current.value.split("");

      // result of the deletion in Arr:
      console.log(adjustedStrArr.slice(0, adjustedStrArr.length - 1));

      textRowRef.current.value = adjustedStrArr
        .slice(0, adjustedStrArr.length - 1)
        .join(""); // join returns A NEW STRING
      return true;
    }

    // prevents special buttons, however we may need to adjust this when we incorporate emoji
    if (key.length > 1 && key !== " ") return false;

    /*
     props.arr = [row0, row1, row2]

     This is our refernce to the NAMES of the row
     
    - looks like space is not working for some reason.
    - how do we get our code to 
     
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
    // textRowRef.current.value += key;

    console.log("textRowRef.current:", textRowRef.current.value);

    textRowRef.current.value = `${prevStr}${key}`.toLowerCase().trim();

    currInputArr = [...textRowRef.current.value];
    console.log(currInputArr);
    totalSizeBlocks += +data[key].size.split("rem").splice(0, 1);

    console.log("totalSizeBlocks:", totalSizeBlocks);
    console.log("post: totalSizeBlocks:", totalSizeBlocks);

    return true;
  }

  return (
    <form id="user-input-form" className="text-box-container">
      {props.keysArr.map((row) => (
        <input
          key={row}
          ref={(node) => {
            const map = getMap();
            node ? map.set(row.id, node) : map.delete(row.id);
          }}
          readOnly
          selected={selected}
          // onSubmit={}
          onFocus={activateTextRow}
          onBlur={deactivateTextRow}
          className="text-row"
          data-rowid={props.rowId}
          type="text"
          onKeyDown={validateEntry}
          disabled={disabled}
        />
      ))}
    </form>
  );
}
// subtract the currInputArr's last element's size value from the totalSizeBlock Counter
// b
// totalSizeBlocks -= +data[currInputArr.at(-1)].size
//   .split("rem")
//   .splice(0, 1);
// currInputArr.splice(-1); // remove from array

// <TextRow
//   setRow={setRow}
//   rowId={row}
//   rowIdArr={arr}
//   key={row}
//   marqState={props.state}
//   marqWidth={currMarqWidth}
// />;

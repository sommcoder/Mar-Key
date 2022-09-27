import data from "../../data/blockData.json";

export default function TextRow(props) {
  const currMarqWidth = props.marqWidth;
  console.log("currMarqWidth:", currMarqWidth);
  let totalSizeBlocks = 0; // tracks curr size of the input field based on the key's size in our data
  let currInputArr = []; // tracks what's inside the input field for EACH TextRow component
  let disabled = false;

  function validateEntry(ev) {
    let key = ev.key.toLowerCase(); // consistency check
    if (key === "tab") return true; // tab guard
    console.log(ev.target.form);
    console.log("key:", key);
    console.log("currInputArr pre-delete:", currInputArr);

    console.log(currInputArr.at(-1));
    // handle deletions:
    if (key === "backspace" || key === "delete") {
      // empty array with deletion guard clause:
      if (currInputArr.length === 0) return true;

      // subtract the currInputArr's last element's size value from the totalSizeBlock tracker
      console.log("delete: data lookup:", data[currInputArr.at(-1)]);
      console.log(currInputArr.at(-1));
      // 0.2 accounts for the border on boths sides:
      totalSizeBlocks = currInputArr.length * 0.2;
      totalSizeBlocks -= +data[currInputArr.at(-1)].size
        .split("rem")
        .splice(0, 1);
      currInputArr.splice(-1); // remove from array
      console.log("totalSizeBlocks", totalSizeBlocks);
      return true; // exit the execution
    }

    // handle too large of an input:
    if (totalSizeBlocks >= currMarqWidth) {
      console.log("input too big");
      disabled = true; // not working!!
      return false;
    }

    // guard against special btns
    if (
      key === "capslock" ||
      key === "shift" ||
      key === "unidentified" ||
      key === "alt" ||
      key === "meta"
    )
      return false;

    // push to the input array:
    console.log("data[key]:", data[key]);
    currInputArr.push(key);
    console.log("currInputArr end", currInputArr);

    // this will need to be updated when we start working with symbols and other ASCII bs:
    totalSizeBlocks += +data[key].size.split("rem").splice(0, 1);

    console.log("totalSizeBlocks:", totalSizeBlocks);
    // if the size of the inputted blocks is larger than the width of the marquee, remove

    console.log("post: totalSizeBlocks:", totalSizeBlocks);

    // don't allow the user to enter anything into the textRow once the limit is reached!
  }

  return (
    <input
      className="text-row"
      data-rowid={props.rowId}
      type="text"
      onKeyDown={validateEntry}
      disabled={disabled}
    />
  );
}

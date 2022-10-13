import data from "../../data/blockData.json";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import ErrorMsg from "../ErrorMsg/ErrorMsg";

export default function TextRowForm(props) {
  console.log("TextRowForm props:", props);
  // global component variables:
  const marqName = props.name;
  const marqState = props.marqueeState;
  const marqWidth = props.marqWidth;
  let disabled = false;
  let selected = false;
  let totalSizeBlocks = 0;
  let currInputArr = [];

  function validateEntry(ev) {
    // input must be selected 1st as input is readOnly to prevent full user input modification
    if (!selected) return true;
    let key = ev.key;
    console.log("ev:", ev);
    console.log("key:", key);

    console.log("did we make it?");
    // on enter, get the data-rowId of the next sibling
    // prevent user holding down a key unless it's the Backspace key
    if (key !== "Backspace" && ev.repeat) return false;
    // prevent auto-scrolling of the spacebar
    if (key === " " || ev.target === document.body) ev.preventDefault();
    // CLEAR:
    if (key === "Backspace" || key === "Delete") {
    }
    // prevents special buttons, however we may need to adjust this when we incorporate emoji
    if (key.length > 1 && key !== " ") return false;

    // handle too large of an input:
    if (totalSizeBlocks >= marqWidth) {
      console.log("input too big");
      disabled = true;
      return false;
    }

    // when user adds VALID input:
    let prevStr = ev.target.value; // what is already in the input field
    console.log("prevStr:", prevStr);

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
          key={`${marqName}-${row}`}
          // ref={(node) => {
          //   const map = getMap();
          //   node ? map.set(row.id, node) : map.delete(row.id);
          // }}
          readOnly
          selected={selected}
          // onFocus={activateTextRow}
          // onBlur={deactivateTextRow}
          className="text-row"
          data-rowid={props.rowId}
          type="text"
          onKeyDown={validateEntry}
          disabled={disabled}
        />
      ))}
      <SetCurrBtn
        form="user-input-form"
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        rowState={props.rowState}
        setMarquee={props.setMarquee}
        setRow={props.setRow}
      />
      <ResetBtn
        marqName={marqName}
        marqState={marqState}
        marqWidth={marqWidth}
        setMarquee={props.setMarquee}
        initRowState={props.initRowState}
        setRow={props.setRow}
      />
      {marqState[marqName].isError === true ? <ErrorMsg /> : ""}
    </form>
  );
}

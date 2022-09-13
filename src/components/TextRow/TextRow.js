export default function TextRow(props) {
  function submitRow(ev) {
    console.log("ev target:", ev.target);
    console.log("ev data:", ev.target.dataset);
    let rowTarget = ev.target.dataset.rowid;
    // turns string into an array of letters as strings!:
    console.log("rowTarget:", rowTarget);

    // rowInput is an array of each inputted letter as strings
    let rowInput = [...ev.target.value];
    console.log("rowValues:", rowInput);
    console.log("ev:", ev.target.dataset.rowid);

    // this is the "new" object to update the curr state object with
    const updatedValue = {};
    updatedValue[rowTarget] = rowInput;
    console.log("updatedValue TextRow:", updatedValue);

    // this is how to update an Object instead of a value with the useState re-render function:
    props.setRow((rowValuesObj) => ({
      ...rowValuesObj,
      ...updatedValue,
    }));
  }

  return (
    <input
      className="text-row"
      data-rowid={props.rowId}
      type="text"
      onKeyDown={(ev) => {
        if (ev.key === "Enter" || ev.key === "Tab") submitRow(ev);
      }}
      onBlur={submitRow}
    />
  );
}

/*
 
make it so that an ENTER moves to the next input field
 
*/

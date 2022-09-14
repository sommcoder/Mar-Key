export default function TextRow(props) {
  const updatedValue = {};

  function submitRow(ev) {
    let rowTarget = ev.target.dataset.rowid;
    let rowInput = [...ev.target.value.trim()]; // trims excess whitespace from ends

    updatedValue[rowTarget] = rowInput;

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

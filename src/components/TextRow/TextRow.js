export default function TextRow(props) {
  console.log("props.rowId:", props.rowId);

  function submitRow(ev) {
    // turns string into an array of letters as strings!:
    console.log("ev:", ev.target.dataset.rowid);
    let rowTarget = ev.target.dataset.rowid;
    let rowValues = [...ev.target.value];
    console.log("rowValues:", rowValues);
    console.log("ev:", ev.target.dataset.rowid);

    // pass in the object to setRow
    props.setRow({ [rowTarget]: [rowValues] });
  }

  return (
    <input
      className="text-row"
      data-rowid={props.rowId}
      type="text"
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          submitRow(ev);
        }
      }}
    />
  );
}

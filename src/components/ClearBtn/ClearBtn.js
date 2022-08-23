export default function ClearBtn(props) {
  function clearRows(ev) {
    console.log(ev.target);
    console.log(props.setRow);
    props.setRow([]); // set to empty array
  }
  return (
    <button onClick={clearRows} className="text-box-form-clear-btn">
      clear
    </button>
  );
}

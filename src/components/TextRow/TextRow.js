export default function TextRow(props) {
  console.log("props.rowId:", props.rowId);
  return <input className="text-row" data-rowid={props.rowId} type="text" />;
}

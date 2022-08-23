export default function Block(props) {
  // is the row value carrying over?
  // console.log("props.rowValue:", props.rowValue);
  const blockWidth = {
    width: "4rem",
  };

  return (
    <input
      className="marquee-block"
      // readOnly
      maxLength="1"
      size="1"
      type="text"
      style={blockWidth}
      value={props.block}
    />
  );
}

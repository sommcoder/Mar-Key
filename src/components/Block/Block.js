export default function Block(props) {
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

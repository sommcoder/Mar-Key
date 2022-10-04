export default function Block(props) {
  const blockWidth = {
    width: props.style,
  };

  return (
    <>
      <input
        className="marquee-block"
        // readOnly
        maxLength="1"
        type="text"
        style={blockWidth}
        value={props.block}
      />
    </>
  );
}

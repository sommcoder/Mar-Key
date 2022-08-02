export default function Block(props) {
  return (
    <input
      className={`marquee-block block-${props.block}`}
      // readOnly
      maxLength="1"
      size="1"
      type="text"
    />
  );
}

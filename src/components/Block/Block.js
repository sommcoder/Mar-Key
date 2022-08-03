import Key from "../Key/Key";
console.log(Key.submittedLetter);

// HOW DO WE CONNECT THE VALUE OF AN ONCLICK EVENT TO

export default function Block(props) {
  return (
    <input
      className={`marquee-block block-${props.block}`}
      // readOnly
      maxLength="1"
      size="1"
      type="text"
      // name={props} this should be what is clicked on the Key component
    />
  );
}

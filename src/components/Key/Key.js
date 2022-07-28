export default function Key(props) {
  const letter = props.letter;
  return <input className="input_block">{letter}</input>;
}

export default function Key(props) {
  console.log(props);
  const letter = props.letter;
  return <input className="keyboard-key">{letter}</input>;
}

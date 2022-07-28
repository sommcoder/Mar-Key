export default function Key(props) {
  console.log(props);
  const letter = props.letter;
  return <input>{letter}</input>;
}

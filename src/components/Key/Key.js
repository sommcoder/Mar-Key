export default function Key(props) {
  const ltr = props.letter;
  // console.log(ltr);
  function submitLetter(ev) {
    console.log(ev.target);
  }

  if (ltr !== "ENTER" && ltr !== "<==") {
    return (
      <button onClick={submitLetter} className="keyboard-key" value={ltr}>
        {ltr}
      </button>
    );
  } else
    return (
      <button
        onClick={submitLetter}
        className="keyboard-key keyboard-key-special"
        value={ltr}
      >
        {ltr}
      </button>
    );
}

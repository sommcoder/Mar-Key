export default function Key(props) {
  const ltr = props.letter;
  // console.log(ltr);
  let submittedLetter;

  function submitLetter(ev) {
    ev.preventDefault();
    submittedLetter = ev.target.value;
    console.log(ev.target.value);
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

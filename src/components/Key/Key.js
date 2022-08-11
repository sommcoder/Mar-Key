import { useState } from "react";

export default function Key(props) {
  const ltr = props.letter;

  // function submitLetter(ev) {
  //   ev.preventDefault();
  //   submittedLetter = ev.target.value;
  //   console.log(ev.target.value);
  //   // console.log("letter:", ltr);
  //   setLetter(ev.target.value);
  // }

  if (ltr !== "ENTER" && ltr !== "<==") {
    return (
      <button
        onClick={props.addKeyToBlock}
        className="keyboard-key"
        value={ltr}
      >
        {ltr}
      </button>
    );
  } else
    return (
      <button
        // onClick={props.submitLetter(ltr)}
        className="keyboard-key keyboard-key-special"
        value={ltr}
      >
        {ltr}
      </button>
    );
}

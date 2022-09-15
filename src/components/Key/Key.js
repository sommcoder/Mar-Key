import { useState } from "react";

export default function Key(props) {
  const ltr = props.letter;

  if (ltr !== "ENTER" && ltr !== "<==") {
    return (
      <button className="keyboard-key" value={ltr}>
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

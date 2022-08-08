import Key from "../Key/Key";
import { useState } from "react";
console.log(Key.submittedLetter);

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

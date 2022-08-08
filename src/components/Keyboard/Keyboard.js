import Key from "../Key/Key";
import "./Keyboard.css";

export default function Keyboard(props) {
  // the letters to be rendered:
  const letterSet = props.letterSet;

  return (
    <div id="keyboard-container">
      {letterSet.map((obj) => (
        <div className="keyboard-row" key={obj.rowNum}>
          {obj.letters.map((ltr) => (
            <Key
              letter={ltr}
              key={`${obj.rowNum}-${ltr}`}
              addKeyToBlock={props.addKeyToBlock}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// how can be conditionally add the SPECIAL KEY components to the THIRD keyboard row ONLY and also specify the respective side of the third row each component should be on!

// row-3-v

// once done ^^^ add Synthetic Event: onClick="" this will

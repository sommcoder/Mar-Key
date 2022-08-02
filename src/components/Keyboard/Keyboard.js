import Key from "../Key/Key";
import "./Keyboard.css";

export default function Keyboard() {
  const letterSet = [
    {
      rowNum: "row-1",
      letters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    },
    { rowNum: "row-2", letters: ["a", "s", "d", "f", "g", "h", "j", "k", "l"] },
    {
      rowNum: "row-3",
      letters: ["ENTER", "z", "x", "c", "v", "b", "n", "m", "<=="],
    },
  ];

  return (
    <div id="keyboard-container">
      {letterSet.map((obj) => {
        return (
          <div className="keyboard-row" key={obj.rowNum}>
            {obj.letters.map((ltr) => {
              return <Key letter={ltr} key={`${obj.rowNum}-${ltr}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

// how can be conditionally add the SPECIAL KEY components to the THIRD keyboard row ONLY and also specify the respective side of the third row each component should be on!

// row-3-v

// once done ^^^ add Synthetic Event: onClick="" this will

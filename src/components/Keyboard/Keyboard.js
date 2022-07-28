import Key from "../Key/Key";

export default function Keyboard() {
  const letterSet = [
    {
      row: "row-1",
      letters: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    },
    { row: "row-2", letters: ["a", "s", "d", "f", "g", "h", "j", "k", "l"] },
    { row: "row-3", letters: ["z", "x", "c", "v", "b", "n", "m"] },
  ];

  return (
    <div>
      {letterSet.map((el) => {
        return (
          <div key={el.row}>
            {el.letters.map((ltr) => {
              return <Key letter={ltr.letters} row={ltr.row} key={el.row} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

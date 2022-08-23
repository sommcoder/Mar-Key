import Block from "../Block/Block";

export default function MarqueeRow(props) {
  console.log("marq row:", props.rowId);
  let userInput = props.rowValues;

  console.log("userInput:", userInput);

  // dictates the size of the row. Drilled down from the
  let rowSize = {
    width: props.size,
  };

  return (
    <div style={rowSize} data-rowid={props.rowId} className="marquee-row">
      {userInput.map((block, i) => (
        <Block key={`row-${props.row}-block-${i}`} block={block} />
      ))}
    </div>
  );
}

/*
 
the Marquee row will render the Block component when there is a state provided to the Marquee component 'lifted up' from the TextBox Component. default state is "".
 
*/

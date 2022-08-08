import Block from "../Block/Block";
import DisplayBtn from "../DisplayBtn/DisplayBtn";
import "./Marquee.css";

export default function Marquee(props) {
  const rows = 3;

  const eastWestBlocks = 14;
  const marqueeArr = [];

  const southBlocks = 22;
  const southMarqueeArr = [];

  // the double for-loops construct the array:
  function createMarqueeArr(arr, blks) {
    for (let r = 0; r < rows; r++) {
      arr[r] = [];
      for (let b = 0; b < blks; b++) {
        arr[r][b] = b;
      }
    }
  }
  createMarqueeArr(marqueeArr, eastWestBlocks);
  createMarqueeArr(southMarqueeArr, southBlocks);

  console.log("marqueeArr:", marqueeArr);
  console.log("southMarqueeArr:", southMarqueeArr);

  return (
    <div className="marquee-container" key={props.name}>
      <DisplayBtn name={props.name} />
      {(props.name !== "South" ? marqueeArr : southMarqueeArr).map(
        (row, ind) => (
          <div key={`row-${ind}`} className={`marquee-row row-${ind}`}>
            {row.map((block) => (
              <Block key={`row-${ind}-block-${block}`} block={block} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

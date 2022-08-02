import Block from "../Block/Block";
import "./Marquee.css";

export default function Marquee(props) {
  const rows = 3;
  const blocks = 14;

  const marqueeArr = [];
  // the double for-loops construct the array:
  for (let r = 0; r < rows; r++) {
    marqueeArr[r] = [];
    for (let b = 0; b < blocks; b++) {
      marqueeArr[r][b] = b;
    }
  }
  console.log("marqueeArr:", marqueeArr);

  return (
    <div className="marquee-container" key={props.name}>
      <h5 className="marquee-title">{props.name}</h5>
      {marqueeArr.map((row, ind) => {
        return (
          <div key={`row-${ind}`} className={`marquee-row row-${ind}`}>
            {row.map((block) => {
              return <Block key={`row-${ind}-block-${block}`} block={block} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

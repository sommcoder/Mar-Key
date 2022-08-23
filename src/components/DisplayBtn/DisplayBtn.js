export default function DisplayBtn(props) {
  console.log(props.setMarquee);
  return (
    <button onClick={props.setMarquee} className="marquee-title-btn">
      {props.name}
    </button>
  );
}

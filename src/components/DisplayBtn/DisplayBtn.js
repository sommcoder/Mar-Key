import { DisplayBtn } from "../Styled";

export default function DisplayBtn(props) {
  function toggleDisplay(ev) {
    // console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // toggle Marquee visibility:
    if (props.marqueeState[marqueeToUpdate].isVisible === true)
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    else updatedMarqueeState[marqueeToUpdate] = { isVisible: true };

    props.setMarquee((currState) => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  return (
    <DisplayBtn
      onClick={toggleDisplay}
      className="marquee-title-btn"
      data-id={props.name}
    >
      {props.name}
    </DisplayBtn>
  );
}

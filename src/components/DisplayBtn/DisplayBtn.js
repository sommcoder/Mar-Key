export default function DisplayBtn(props) {
  function toggleDisplay(ev) {
    console.log("ev id:", ev.target.dataset.id);
    let marqueeToUpdate = ev.target.dataset.id;
    const updatedMarqueeState = {};

    // conditional toggle
    console.log("curr state prop val:", props.state[marqueeToUpdate]);

    if (props.state[marqueeToUpdate].isVisible === true) {
      updatedMarqueeState[marqueeToUpdate] = { isVisible: false };
    } else {
      updatedMarqueeState[marqueeToUpdate] = { isVisible: true };
    }

    console.log("obj after condition:", updatedMarqueeState);
    props.toggleMarquee((currState) => ({
      ...currState,
      ...updatedMarqueeState,
    }));
  }

  console.log(props.setMarquee);
  return (
    <button
      onClick={toggleDisplay}
      className="marquee-title-btn"
      data-id={props.name}
    >
      {props.name}
    </button>
  );
}

export default function SetCurrBtn(props) {
  function setCurrMarquee(ev) {
    // have this button NOT work if there isn't at LEAST one 3 letter word on at LEAST one row
    // have a red text warning message below the buttons that will inform the user that they need to have at LEAST one 3 letter word on the Marquee BEFORE they can set it!
  }
  return (
    <button onClick={setCurrMarquee} className="set-current-marquee-btn">
      set current
    </button>
  );
}

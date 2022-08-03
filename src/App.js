import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  const appTitle = "Mar-Key";
  // have a radio input to select the marquee sides the user would like to use
  const EAST_MARQUEE = true;
  const WEST_MARQUEE = true;
  const SOUTH_MARQUEE = true;

  return (
    <div id="app-container">
      <Header title={appTitle} />
      {EAST_MARQUEE === true ? <Marquee name="East" /> : ""}
      {WEST_MARQUEE === true ? <Marquee name="West" /> : ""}
      {SOUTH_MARQUEE === true ? <Marquee name="South" /> : ""}
      <Keyboard />
    </div>
  );
}

export default App;

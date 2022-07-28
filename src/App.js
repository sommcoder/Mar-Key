import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  // const marqueeNums = 3;
  const blocksPerRow = 10;
  const rowNums = 6;
  const appTitle = "Mar-Key";
  return (
    <>
      <Header title={appTitle} />
      {/* <Marquee rows={rowNums} blocks={blocksPerRow} /> */}
      {/* <Marquee />
      <Marquee /> */}
      <Keyboard />
    </>
  );
}

export default App;

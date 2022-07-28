import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  const appTitle = "Mar-Key";
  return (
    <>
      <Header title={appTitle} />
      <Keyboard />
    </>
  );
}

export default App;

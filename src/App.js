import "./App.css";
import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";
import Keyboard from "./components/Keyboard/Keyboard";

function App() {
  const appTitle = "Mar-Key";
  return (
    <div id="app-container">
      <Header title={appTitle} />
      <Keyboard />
    </div>
  );
}

export default App;

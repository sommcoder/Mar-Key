import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const StyleVar = {
  btnColor: "powderblue",
  boxShadow: `0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2)`,
};

root.render(
  <React.StrictMode>
    <ThemeProvider theme={StyleVar}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

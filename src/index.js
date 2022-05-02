import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const StartApp = () => {
  return (
    <>
      <App />
    </>
  );
};

ReactDOM.render(<StartApp />, document.getElementById("root"));

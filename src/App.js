import React from "react";
import "./App.css";
import {Title, ButtonAddNew, Invoices} from "./components/invoices";

function App() {
  return (
    <div className="App">
      <Title />
      <ButtonAddNew />
      <Invoices />
    </div>
  );
}

export default App;

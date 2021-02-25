import React from "react";
import "./App.css";
import { ButtonAddNew, Invoices, Form } from "./components/invoices";

function App() {
  return (
    <div id="app">
      <div className="container main">
        <h1 className="heading">
          <span>Invoices</span>
        </h1>
        <div className="content-block">
          <ButtonAddNew />
        </div>
        <div className="content-block">
          <Invoices />
        </div>
      </div>
      <div className="container form" style={{ display: "none" }}>
        <h1 className="heading">
          <span>Create invoice</span>
        </h1>
        <div className="content-block">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import { ButtonAddNew, Invoices, Form } from "./components/invoices";

function App() {
  return (
    <div id="App">
      <div className="main-page layout">
        <div className="title">
          <h2>Invoices</h2>
        </div>
        <ButtonAddNew />
        <Invoices />
      </div>
      <div className="add-invoice-page layout">
        <div className="title">
          <h2>Create invoice</h2>
        </div>
      </div>
      <Form />
    </div>
  );
}

export default App;

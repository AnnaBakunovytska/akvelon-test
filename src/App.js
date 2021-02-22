import React from "react";
import "./App.css";
import { ButtonAddNew, Invoices, Form } from "./components/invoices";

function App() {
  return (
    <div className="App">
      <div className="main-page">
        <div>
          <h2>Invoices</h2>
        </div>
        <ButtonAddNew />
        <Invoices />
      </div>
      <div className="add-invoice-page">
        <div>
          <h2>Create invoice</h2>
        </div>
      </div>
      <Form />
    </div>
  );
}

export default App;

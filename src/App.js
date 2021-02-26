import React from "react";
import "./App.css";
import { ButtonAddNew, Invoices, Form } from "./components/invoices";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      showForm: false
    };
  }

  componentDidMount() {
    this.getRequest();
  }

  getRequest = () => {
    fetch("http://localhost:3001/invoices", null)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  triggerForm = () => {
    if (!this.state.showForm) {
      this.setState({ showForm: true });
    }
  }

  triggerMain = () => {
    if (this.state.showForm) {
      this.setState({ showForm: false });
    }
  }

  render() {
    return (
    <div id="app">
      {!this.state.showForm ? (<div className="container main">
        <h1 className="heading">
          <span>Invoices</span>
        </h1>
        <div className="content-block">
            <ButtonAddNew triggerForm={this.triggerForm }/>
        </div>
        <div className="content-block">
            <Invoices
              isLoaded={this.state.isLoaded}
              items={this.state.items}
              error={this.state.error} />
        </div>
      </div>) :
      (<div className="container form">
        <h1 className="heading">
          <span>Create invoice</span>
        </h1>
        <div className="content-block">
              <Form update={this.getRequest} triggerMain={ this.triggerMain}/>
        </div>
      </div>)}
    </div>
  );}
}

export default App;

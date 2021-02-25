import React from "react";

export const ButtonAddNew = () => {
  const btnShowForm = () => {
    document.getElementsByClassName("container main")[0].style.display = "none";
    document.getElementsByClassName("container form")[0].style.display =
      "block";
  };

  return (
    <div className="contauner-add-inv">
      <h2>Actions</h2>
      <button className="btn" onClick={btnShowForm}>
        Add new
      </button>
    </div>
  );
};
export class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
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
  };

  componentDidMount() {
    this.getRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length !== this.state.items.length) {
      this.getRequest();
    }
  }

  render() {
    if (this.state.error) {
      return <div>Ошибка: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="main-div">
          <div className="div-titles"></div>
          <h2>Invoices</h2>
          <div className="invoices-table">
            <div className="parameter-name header">Create</div>
            <div className="parameter-name header">No</div>
            <div className="parameter-name header">Supply</div>
            <div className="parameter-name header">Comment</div>
          </div>
          {this.state.items.map((item) => (
            <div key={item.id}>
              <div className="invoices-table">
                <div className="parameter-name item">{item.date_created}</div>
                <div className="parameter-name item number">{item.number}</div>
                <div className="parameter-name item">{item.date_supplied}</div>
                <div className="parameter-name item">{item.comment}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export class Form extends React.Component {
  submit = (event) => {
    event.preventDefault();

    const inputNumber = event.target.elements.number.value;
    const inputDateSupply = event.target.elements.date_supplied.value;
    const inputDateCreate = event.target.elements.date_created.value;
    const inputComment = event.target.elements.comment.value;

    let validInputNumber = true;
    let validInputComment = true;

    if (inputNumber.length < 3) {
      validInputNumber = false;
    }

    if (inputComment.length > 160) {
      validInputComment = false;
    }

    if (validInputNumber && validInputComment) {
      fetch("http://localhost:3001/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: inputNumber,
          date_supplied: inputDateSupply,
          date_created: inputDateCreate,
          comment: inputComment,
        }),
      });
      document.getElementsByClassName("container main")[0].style.display =
        "block";
      document.getElementsByClassName("container form")[0].style.display =
        "none";
    }
  };

  render() {
    return (
      <form className="invoice-form" onSubmit={this.submit}>
        <div className="form-row">
          <div className="form-item">
            <label>Number:</label>
            <input type="number" name="number" />
          </div>
          <div className="form-item">
            <label>Invoice Date:</label>
            <input type="date" name="date_created" placeholder="Select date" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-item">
            <label>Supply Date:</label>
            <input type="date" name="date_supplied" placeholder="Select date" />
          </div>
        </div>
        <div className="form-block">
          <label>Comment:</label>
          <textarea type="text" name="comment" />
        </div>
        <div className="form-btn">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    );
  }
}

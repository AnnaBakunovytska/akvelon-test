import React from "react";

export const ButtonAddNew = () => {
  return (
    <div className="contauner-add-inv">
      <h2>Actions</h2>
      <button className="add-new-button">Add new</button>
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

  componentDidMount() {
    fetch("http://localhost:3001/invoices", null)
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
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

  render() {
    const { error, isLoaded, items } = this.state;
    console.log(this.state);
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className="main-div">
          <div className="div-titles">
            <h2>Invoices</h2>
          </div>
          <div className="invoices-table">
            <div className="parameter-name header">Create</div>
            <div className="parameter-name header">No</div>
            <div className="parameter-name header">Supply</div>
            <div className="parameter-name header">Comment</div>
          </div>
          {items.map((item) => (
            <div key={item._id}>
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
    }
  };

  render() {
    return (
      <form className="layout" onSubmit={this.submit}>
        <div className="left-rows">
          <label>Number:</label>
          <input type="number" name="number" />
          <label>Supply Date:</label>
          <input type="text" name="date_supplied" placeholder="Select date" />
        </div>
        <div className="right-rows">
          <label>Invoce Date:</label>
          <input type="text" name="date_created" placeholder="Select date" />
        </div>
        <div className="bottom-row">
          <label>Comment:</label>
          <input type="text" name="comment" />
        </div>
        <div className="button">
          <button type="submit">Save</button>
        </div>
      </form>
    );
  }
}

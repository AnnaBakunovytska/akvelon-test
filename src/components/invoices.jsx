import React from 'react';


export const Title = () => <h2>Invoices</h2>;

export const ButtonAddNew = () => {
  return (
    <div className='contauner-add-inv'>
      <h2>Actions</h2>
      <button className='add-new-button'>Add new</button>
    </div>
  );
}
export class Invoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/invoices', null)
      .then(res => {
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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
        <div className='main-div'>
          <div className='div-titles'>
            <h2>Invoices</h2>
          </div>
          {items.map(item => (
            <div key={item._id}>
              <div className='invoices-table'>
              <div className='parameter-name'>Create</div>
              <div className='parameter-name'>No</div>
              <div className='parameter-name'>Supply</div>
              <div className='parameter-name'>Comment</div>
            </div>
            <div className='invoices-table'>
              <div className='parameter-name'>{item.date_created}</div>
              <div className='parameter-name'>{item.number}</div>
              <div className='parameter-name'>{item.date_supplied}</div>
              <div className='parameter-name'>{item.comment}</div>
          </div>
            </div>
          ))}
       </div> 
      );
    }
  }
}

// export const 


import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    cards: []
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

const Card = (props) => {
  return (
    <div style={{ margin: 20 }}>
      <img width="100" src={props.avatar_url} />
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}> {props.name} </div>
        <div> {props.company} </div>
      </div>
    </div>
  )
}


const CardList = (props) => {
  return (
    <div>
      { props.cards.map(card => <Card key={card.id} {... card} />) }
    </div>
  )
}

class Form extends React.Component {
  state = {userName: ''}

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(`https://api.github.com/users/${this.state.userName}`);
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({userName: ''});
      }); 

  };

  render(){
    return(
      <div style={{margin: 20}}>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
          value={this.state.userName}
          onChange={(event)=> this.setState({userName: event.target.value})}
          placeholder="Enter github username.." required />
          <button type="submit"> Add Card </button>
        </form>  
      </div>
    );
  }
}

export default App;

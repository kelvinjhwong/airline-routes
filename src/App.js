import React, { Component } from 'react';
import './App.css';
import data from './data.js';
import Routes from './Routes.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Routes routes={data.routes}/>
        </section>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Search from './components/search';
import Results from './components/results';
import Product from './components/product';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div><Search/></div>
        </header>
        <Router>
          <Switch>
          <Route exact path="/items" component={Results}/>
          <Route exact path="/items/:id" component={Product}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;

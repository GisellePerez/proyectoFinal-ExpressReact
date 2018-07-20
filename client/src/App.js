import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/search';
import Results from './components/results';
import Product from './components/product';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 

//let search = queryString.parse(this.props.location.search);
class App extends Component {

  render() {
    return (
       
      <div className="App">    
      <div className="SearchBox"><Search/></div>  
      <Router>
        <Switch>
          <Route path="/items" component={Results}/>
          <Route exact path="/items/:id" component={Product}/>        
        </Switch> 
        
      </Router>
      </div>
    )
  }
}

export default App;

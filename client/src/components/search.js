import React, { Component } from 'react';
import './../App.css';

class Search extends Component {
    
    render() {
        return (    
          <div className='SearchBox'>  
            <form action="/items" method="get">
                <input id="search" type="text" name="search" placeholder="Explorar"></input>
                <input type="submit"></input>
            </form>
          </div>
        ); 
    }
}

export default Search;

import React, { Component } from 'react';
import Results from '../components/results'
import './../App.css';

class Search extends Component {

    constructor (props) {
        super(props);
        this.state = {items:[]}

    }

    getItems (e) {
        e.preventDefault()

        fetch(`/items?q=${document.getElementById('search').value}`)
          .then(res => res.json())
          .then(items => this.setState({ items }));
    }


    render() {
        const items = this.state.items.map(i => <p key={i.id}>{i.title}</p>)
        return (
          <div className='SearchBox'>  
    
            <form>
                <input id="search" type="text" name="search" placeholder="Explorar"></input>
                <input onClick={e => this.getItems(e)} type="submit"></input>
            </form>
    
            {items}

          </div>
        ); 
    }
}

export default Search;

import React, { Component } from 'react'; 
import queryString from 'query-string';
import './../App.css';


class Results extends Component {
    
    constructor (props) {
        super(props);
        this.state = { items:[] }
    }
    
    // getItems (e) {
        //     e.preventDefault();
        //     fetch(`/items?q=${document.getElementById('search').value}`)
        //       .then(res => res.json())
        //       .then(items => this.setState({ items }));
        // }
        
    componentDidMount() {
        const searchQuery = queryString.parse(this.props.location.search)
        console.log('searchQuery',searchQuery)
        fetch(`/items?search=${searchQuery.search}`)
        //fetch(`/items?q=${document.getElementById('search').value}`)
            .then(res => res.json())
            .then(items => this.setState({ items }))
    }

    render() {
        
        const items = this.state.items.map(i => 
            
            <p key={i.id}>{i.title}<span>({i.id})</span></p>
        )
        return (
          <div className='Results'>  
    
            <p>Results</p>
            {items}

          </div>
        ); 
    }
}

export default Results;
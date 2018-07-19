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
        const a='1';
        //const search = queryString.parse(this.props.location.search)
        //console.log('search',search)
        fetch(`/items?search=${a}`)
        //fetch(`/items?q=${document.getElementById('search').value}`)
            .then(res => res.json())
            .then(items => this.setState({ items }))
    }

    render() {
        const items = this.state.items.map(i => <p key={i.id}>{i.title}</p>)
        return (
          <div className='Results'>  
    
            <p>hola</p>
            {items}

          </div>
        ); 
    }
}

export default Results;
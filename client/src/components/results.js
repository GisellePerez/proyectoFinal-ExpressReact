import React, { Component } from 'react'; 
import queryString from 'query-string';
import './../App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 

class Results extends Component {
    
    constructor (props) {
        super(props);
        this.state = { 
            search:[],
            data:{
                items:[] 
            }
        };
    }
    
    componentDidMount() {
        const searchQuery = queryString.parse(this.props.location.search)
        console.log('searchQuery',searchQuery)
        fetch(`/items?search=${searchQuery.search}`)
            .then(res => res.json())
            .then(data => this.setState({ data }))
            .catch(err => console.log('error',err))
    }

    render() {
        
        let items = this.state.data.items.map(i => 
        
            <div key={i.id} className="product">
                <figure>
                    <img src={i.picture}/>
                </figure>
                <div className="product_info">
                    <p>{i.price.currency}{i.price.amount}</p>
                </div>           
            </div>
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
import React, { Component } from 'react'; 
import queryString from 'query-string';
import './../App.css';
import './results.css';
import {Link} from 'react-router-dom'; 

class Results extends Component {
    
    constructor (props) {
        super(props);
        this.state = { 
            categories:[],
            items:[] 
        };
    }
    
    componentDidMount() {
        const searchQuery = queryString.parse(this.props.location.search)
        console.log('searchQuery',searchQuery)
        fetch(`/items?search=${searchQuery.search}`)
            .then(res =>  res.json()) 
            .then(data => this.setState({ items: data.items, categories:data.categories }))
            .catch(err => console.log('error',err))
    }

    render() {

        let cat = this.state.categories.map(c => 
            <p key={c} className="breadcrumb-categories">{c}</p>
        )

        let items = this.state.items.map(i => 
            <Link key={i.id} to={`/items/${i.id}`}>
                <div  className="product">
                    <figure>
                        <img src={i.picture} alt={i.title} />
                    </figure>
                    <p>{i.title}</p>
                    {i.price &&
                    <div className="product_info">                    
                        <p>{i.price.currency}{i.price.amount}</p>
                    </div>
                    }           
                </div>
            </Link>
        )
    
        return (
            <div className='Results'>      
                <p>Results</p>
                <div className="breadcrumb">
                    {cat}
                </div>
                <div className="list">
                    {items}
                </div>
            </div>

        ); 
    }
}

export default Results;
import React, { Component } from 'react'; 
import queryString from 'query-string';
import './../App.css';
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
            .then(data => this.setState({ items: data.items, categories:data.categories.path }))
            .catch(err => console.log('error',err))
    }

    render() {

        let items = this.state.items.map(i => 

            <Link key={i.id} to={`/items/${i.id}`}>
                <div  className="product">
                    <figure>
                        <img src={i.picture}/>
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
            {items}

          </div>

        ); 
    }
}

export default Results;
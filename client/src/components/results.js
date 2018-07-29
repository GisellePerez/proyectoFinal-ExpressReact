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
            <p key={c} className="breadcrumb-categories">{c} <span>></span> </p>
        )

        let items = this.state.items.map(i => 
            <Link class="link-div" key={i.id} to={`/items/${i.id}`}>
                <div  className="product">
                    <figure className="img">
                        <img src={i.picture} alt={i.title} />
                    </figure>
                    <div className="product_info">
                        {i.price &&
                        <div>                    
                            <p className="price">{i.price.currency}{i.price.amount}</p>
                            <p className="title">{i.title}</p>
                        </div>
                        }    
                        <div>
                            <p className="location">{i.location}</p>
                        </div> 
                    </div>      
                </div>
            </Link>
        )
    
        return (
            <div className='Results'> 
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
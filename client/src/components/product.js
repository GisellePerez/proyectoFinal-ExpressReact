import React, { Component } from 'react';
import './../App.css';

class Product extends Component {

    constructor (props) {
        super(props);
        this.state = {items:[]}
    }

    // componentDidMount() {
    //     const idQuery = queryString.parse(this.props.location.search)
    //     console.log('searchQuery',searchQuery)
    //     fetch(`/items?search=${searchQuery.search}`)
    //     //fetch(`/items?q=${document.getElementById('search').value}`)
    //         .then(res => res.json())
    //         .then(items => this.setState({ items }))
    // }

    render() {
        return(
            <div className='Product'>  
    
                <p>Product</p>
            </div>
        )
    }
}

export default Product;
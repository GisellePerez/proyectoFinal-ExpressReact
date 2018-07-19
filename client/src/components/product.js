import React, { Component } from 'react';
import './../App.css';

class Product extends Component {

    constructor (props) {
        super(props);
        this.state = {items:[]}

    }
    render() {
        return(
            <div className='Product'>  
    
                <p>Product</p>
            </div>
        )
    }
}

export default Product;
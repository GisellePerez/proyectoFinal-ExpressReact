import React, { Component } from 'react';
import './../App.css';

class Product extends Component {

    constructor (props) {
        super(props);
        this.state = { item: {} };
    }

    componentDidMount(){
        var id= this.props.match.params.id;
        console.log(id);

        fetch(`/items/${id}`)
        .then(res => res.json())
        .then(resp => {this.setState({item:resp.items}) })   
        .catch(err => console.log('error', err))
    }

    render() {
        
        return(
            <div className='Product'> 
                 
                <p>Product</p>
                <figure>
                    <img src={this.state.item.picture}/>    
                </figure>                
                <h3>{this.state.item.title}</h3>
                {this.state.item.price && 
                    <p><span>{this.state.item.price.currency}</span>{this.state.item.price.amount}</p>
                }
                <p>{this.state.item.condition}</p>
                <p>{this.state.item.description}</p>
                
            </div>
        )
    }
}

export default Product;
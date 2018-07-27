import React, { Component } from 'react';
import './../App.css';

class Product extends Component {

    constructor (props) {
        super(props);
        this.state = { item: {}, categories:[] };
    }

    componentDidMount(){
        var id = this.props.match.params.id;
        console.log(id);

        fetch(`/items/${id}`)
        .then(res => res.json())
        .then(resp => {this.setState({item:resp.items})})   
        .catch(err => console.log('error', err))
    }

    render() {

        let cate = this.state.categories.map(c => 
            <p key={c} className="breadcrumb-categories">{c}</p>
        )

        return(
            <div className='Product'> 
                
                <p>Product</p>

                <div className="breadcrumb">
                {this.state.item.categories &&
                   <p>{this.state.item.categories[0]}</p>
                   //<p>{cate}</p>
                }
                </div>

                <figure>
                    <img src={this.state.item.picture} alt={this.state.item.title} />    
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
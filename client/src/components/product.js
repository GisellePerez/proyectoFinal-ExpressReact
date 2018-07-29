import React, { Component } from 'react';
import './../App.css';
import './product.css'

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
        .then(resp => {this.setState({item:resp.items,categories:resp.items.categories}); console.log(this.state)})   
        .catch(err => console.log('error', err))
    }

    render() {

        let categ = this.state.categories.map((c,i) => 
            <p key={i} className="breadcrumb-categories">{c}<span> > </span></p>
             
        )
        
        return(
            <div className='Product'> 

                <div className="breadcrumb">
                
                {this.state.categories &&
                   <p>{categ}</p>
                }
                </div>
                <div className="prod-div">
                    <div className="first-row">
                        <figure className="product-pic">
                            <img src={this.state.item.picture} alt={this.state.item.title} />    
                        </figure>
                        <div className="info">
                            <p className="product-condition">{this.state.item.condition} {this.state.item.sold_quantity} vendidos</p> 
                            <h3 className="product-title">{this.state.item.title}</h3>
                            {this.state.item.price && 
                                <p className="product-price"><span>{this.state.item.price.currency}</span>{this.state.item.price.amount}</p>
                            }
                            <input id="buy-btn" type="button" value="Comprar"></input>                    
                        </div>                
                    </div>
                    <div className="second-row">
                        <h5>Descripción del producto</h5>
                        <p>{this.state.item.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product;
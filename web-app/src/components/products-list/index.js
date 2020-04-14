import React, {Component} from 'react';
import ProductService from '../../services/product-service';
import './styles.css'

class ProductsList extends Component {
    state = {
        products: [],
        productsCount: 0
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        let response = await ProductService.get('/products');
        this.setState({ 
            productsCount: response.data.length,
            products: response.data
        });
        console.log(this.state.products);
        console.log(this.state.productsCount);
    }

    currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }

    render() {
        return (
            <div className="ProductsList">
                {this.state.products.map(product => (
                    <article key={product._id}>
                        <strong id="product-name">{product.name}</strong>
                        <p id="product-description">{product.description}</p>
                        <p id="product-price">R{this.currencyFormat(product.price)}</p>
                    </article>                    
                ))}
            </div>
        );
    }
}

export default ProductsList;
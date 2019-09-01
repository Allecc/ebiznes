import React, {Component} from "react";
import axios from "axios";
import ProductItem from "./ProductItem";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {
        axios.get("/products")
            .then(response => {
                const products = response.data;
                const expandProduct = products.length > 0 ? products[0].id : null;
                this.setState({
                    products,
                    expandProduct
                });
            })
            .catch(error => {
                this.setState({
                        error
                    }
                );
                console.log(error);
            });
    };

    setExpanded = id => {
        this.setState({expandProduct: id});
    };

    buyFunc(car) {
    };

    render() {
        let products =
            this.state.products && this.state.products.length > 0 ? (
                this.state.products.map(products => (
                    <ProductItem
                        key={products.id}
                        product={products}
                        expanded={products.id === this.state.expandProduct}
                        expandFunc={this.setExpanded}
                        buyFunc={this.buyFunc}
                    />
                ))
            ) : (
                <p className="collection-item">There is no product left!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Products</h3>
                    </div>
                    {products}
                </ul>
            </div>
        );
    }
}

export default ProductList;
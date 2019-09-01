import React, {Component} from "react";
import PropTypes from "prop-types";

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let product = this.props.order;

        return this.props.expanded ? (
            <li className="collection-item row">
                <div className="title col s3" onClick={() => this.props.expandFunc(null)}>
                    <h4>{product.name}</h4>
                </div>
                <div className="col s3 light-blue-text">
                    {product.description}
                </div>
                <div className="col s3 light-blue-text">
                    Price: {product.price}
                </div>
            </li>
        ) : (
            <a href="#!" className="collection-item" onClick={() => this.props.expandFunc(product.id)}>
                <li>
                    {product.name}
                    <div className="secondary-content mr-10">{product.price} $</div>
                </li>
            </a>
        );
    };


}

OrderItem.propTypes = {
    expanded: PropTypes.bool,
    order: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
    expandFunc: PropTypes.func.isRequired
};

export default OrderItem;
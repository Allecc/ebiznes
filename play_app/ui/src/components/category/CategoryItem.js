import React, {Component} from "react";
import PropTypes from "prop-types";

class CategoryItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let product = this.props.category;

        return (
            <li className="collection-item row">
                <div className="col s4">
                    {product.name}
                </div>
                <div className="col s4">
                    <span>Id: {product.id}</span>
                </div>
            </li>

        )
    };
}

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
};

export default CategoryItem;
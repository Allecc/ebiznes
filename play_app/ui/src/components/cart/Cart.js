import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addQuantity, subQuantity} from '../../actions/cartActions'
import Recipe from '../layout/Recipe'

class Cart extends Component {

    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    };

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    };

    render() {
        let buttonsAlign = {
            marginLeft: '10%',
            marginTop: '5%'
        };

        let listTitle = {
            width: '100%'
        };

        let addedItems = this.props.cartItems.length ?
            (
                this.props.cartItems.map(item => {
                    return (
                        <li className="collection-item avatar" key={item.id}>
                            <div className="item-img">
                                <img src={'http://localhost:9000/assets/images/products/' + item.image} alt={item.name}/>
                            </div>

                            <div className="item-desc">
                                <h3>{item.name}</h3>
                                <h6>{item.description}</h6>
                                <h7>
                                    <span className="left">Price: {item.regular_price}$</span>
                                    <span className="right">Quantity: {item.localQuantity}</span>
                                </h7>
                            </div>

                            <div className="right add-remove mdc-layout-grid" style={buttonsAlign} >
                                <div className="mdc-layout-grid__cell"><Link to="/cart"><i className="material-icons" onClick={() => {this.handleAddQuantity(item.id)}}>add</i></Link></div>
                                <div className="mdc-layout-grid__cell"><Link to="/cart"><i className="material-icons" onClick={() => {this.handleSubtractQuantity(item.id)}}>remove</i></Link></div>
                            </div>
                        </li>
                    )
                })
            ) : ( <p>Nothing here :(</p> );
        return (
            <div className="container">
                <div className="cart">
                    <div style={listTitle}>
                        <h5 className="left">Cart:</h5>
                    </div>
                    <div className="collection" style={listTitle}>
                        {addedItems}
                    </div>
                </div>
                <Recipe/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.cartItems,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addQuantity: (id) => {
            dispatch(addQuantity(id))
        },
        subtractQuantity: (id) => {
            dispatch(subQuantity(id))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart)

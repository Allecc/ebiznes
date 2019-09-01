import React, {Component} from 'react';
import {connect} from 'react-redux'
import {addToCart} from '../../actions/cartActions'
import {fetch_items} from "../../actions/itemsActions";

class Home extends Component {

    componentDidMount() {
        this.props.fetch_items();
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    };

    render() {
        let marginForPrice = {
            margin: '15px 10px 5px 10px'
        };

        let itemList = this.props.items && this.props.items.length > 0 ? this.props.items.map(item => (
                <div className="card" key={item.id}>
                    <div className="card-image" >
                        <img src={'http://localhost:9000/assets/images/products/' + item.image} alt={item.name}/>
                    </div>
                    <div className="card-title">{item.name}</div>
                    <div className="card-content">
                            <span className="flow-text">{item.description}</span>
                    </div>
                    <div className="right" style={marginForPrice}>
                        <b>Price: {item.regular_price} $ </b>
                        <span className="btn-floating light-blue" onClick={() => {this.handleClick(item)}}><i className="material-icons">add_shopping_cart</i></span>
                    </div>
                </div>
        )) : (
            <div className="card" key='1'>
                {"No items :("}
            </div>
        );

        return (
            <div className="container row">
                <h2 className="center">{"Hand-Made:"}</h2>
                <div className="box s9">
                    {itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items
    }
};
const mapDispatchToProps = (dispatch) => ({
    addToCart: (id) => {
        dispatch(addToCart(id))
    },
    fetch_items: () => {
        dispatch(fetch_items())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)

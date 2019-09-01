import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkout} from '../../actions/cartActions.js'
import {getUser, setUser} from "../../actions/userActions";

class Recipe extends Component{

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    };

    checkCheckout = () => {
        if(!this.props.user){
            alert("You are not logged in!");
        } else if(this.props.cartItems && this.props.cartItems.length === 0){
            alert("Add something to your cart!");
        } else {
            this.props.checkout(this.props.user.user.userID, this.props.total, this.props.cartItems)
            alert("Your order was received!");
        }
    };


    render(){
        let login = this.props.user.isAuthenticated? "btn blue": "btn blue disabled"

        console.log(login);
        return(
            <div className="right">
                <span className="collection-item"><b>Total: {this.props.total}$ </b></span>
                <span className="checkout">
                    <button className={login} onClick={this.checkCheckout}>Checkout</button>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        cartItems: state.cart.cartItems,
        total: state.cart.total,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch)=>{

    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})},
        checkout: (userId, total, cartItems) => {
            dispatch(checkout(userId, total, cartItems))
        },
        getUser: () => {
            dispatch(getUser())
        },
        setUser: () => {
            dispatch(setUser())
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)

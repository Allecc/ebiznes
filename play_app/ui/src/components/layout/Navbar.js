import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {FaCarrot, FaFacebookF, FaGoogle} from 'react-icons/fa';
import {getUser, setUser} from "../../actions/userActions";

class Navbar extends Component {
    render() {
        let branding = <Link to="/" className="brand-logo"> <FaCarrot/> Kusia Shop</Link>;

        let login = this.props.user.isAuthenticated ? "" : <React.Fragment>
            <li><a href="http://localhost:9000/authenticate/google"><FaGoogle/> Google</a></li>
            <li><a href="http://localhost:9000/authenticate/facebook"><FaFacebookF/>Facebook</a></li>
        </React.Fragment>;

        let shoppingCart = <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>;

        let adminList = !this.props.user.isAdmin ? "" :
            <div className="nav-content">
                <ul className="tabs tabs-transparent">
                    <li className="tab"><Link to="/users">users</Link></li>
                    <li className="tab"><Link to="/orders">orders</Link></li>
                    <li className="tab"><Link to="/categories">categories</Link></li>
                    <li className="tab"><Link to="/users/form">add user</Link></li>
                    <li className="tab"><Link to="/products/form">add product</Link></li>
                    <li className="tab"><Link to="/categories/form">add category</Link></li>
                </ul>
            </div>;

        let brandStyles = {
            paddingLeft: '5px'
        };

        return (
            <nav className="light-blue nav-extended">
                <div className="nav-wrapper">
                    <ul className="left" style={brandStyles}>
                        {branding}
                    </ul>
                    <ul className="right hide-on-med-and-down">
                        {login}
                        {shoppingCart}
                    </ul>
                </div>
                {adminList}
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser())
    },
    setUser: () => {
        dispatch(setUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


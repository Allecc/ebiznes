import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({component: Component, user, ...rest}) => {
    console.log(
        user);
    return (
    <Route
        {...rest}
        render={props =>
            (user.isAuthenticated === true && user.isAdmin === true) ? (
                <Component {...props} />
            ) : (
                <Redirect to="/"/>
            )
        }
    />
    )
};

AdminRoute.propTypes = {
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminRoute);

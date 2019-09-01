import React, {Component} from "react";
import PropTypes from "prop-types";

class UserItem extends Component {
    constructor(props) {
        super(props);
        this.state = {role: {}};
    }

    render() {
        let user = this.props.user;

        return (
            <li className="collection-item row">
                <div className="title left col s6">{user.fullName} - {user.email}</div>
                <div className="right col s2 offset-s4">
                    <button className="waves-effect waves-light btn-small secondary-content"  onClick={() => this.props.Func(user.id)}>
                        Delete <i className="material-icons right">delete</i>
                    </button>
                </div>
            </li>
        );
    };
}

UserItem.propTypes = {
    expanded: PropTypes.bool,
    user: PropTypes.object.isRequired,
    Func: PropTypes.func.isRequired,
    expandFunc: PropTypes.func.isRequired
};

export default UserItem;
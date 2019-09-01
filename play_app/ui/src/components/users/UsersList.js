import React, {Component} from "react";
import axios from "axios";
import UserItem from "./UserItem";

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {
        axios.get("/users")
            .then(response => {
                const users = response.data;
                const expand = users.length > 0 ? users[0].id : null;
                this.setState({
                    users,
                    expand
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
        this.setState({expand: id});
    };

    Func(car) {
        console.log("Actually nothing.")
    };

    render() {
        let products =
            this.state.users && this.state.users.length > 0 ? (
                this.state.users.map(user => (
                    <UserItem
                        key={user.id}
                        user={user}
                        expanded={user.id === this.state.expand}
                        expandFunc={this.setExpanded}
                        Func={this.Func}
                    />
                ))
            ) : (
                <p className="collection-item">There is no users!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Users</h3>
                    </div>
                    {products}
                </ul>
            </div>
        );
    }
}

export default UsersList;

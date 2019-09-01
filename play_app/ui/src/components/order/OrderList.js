import React, {Component} from "react";
import axios from "axios";
import OrderItem from "./OrderItem";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {
        axios.get("/orders")
            .then(response => {
                const orders = response.data;
                const expand = orders.length > 0 ? orders[0].id : null;
                this.setState({
                    orders,
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
            this.state.orders && this.state.orders.length > 0 ? (
                this.state.orders.map(order => (
                    <OrderItem key={order.id} order={order} expanded={order.id === this.state.expand} expandFunc={this.setExpanded}
                        Func={this.Func}
                    />
                ))
            ) : (
                <p className="collection-item">There is no orders!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Orders</h3>
                    </div>
                    {products}
                </ul>
            </div>
        );
    }
}

export default OrderList;

import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.css";
import ProductList from "./products/ProductList";
import UsersList from "./users/UsersList";
import OrderList from "./order/OrderList";
import CategoryList from "./category/CategoryList";
import CategoryForm from "./forms/CategoryForm";
import ProductForm from "./forms/ProductForm";
import UserForm from "./forms/UserForm";
import {Provider} from 'react-redux';
import store from '../store';
import Navbar from "./layout/Navbar";
import Home from "./layout/Home";
import Cart from "./cart/Cart";
import AdminRoute from "./private-route/AdminRoute";
import Authenticate from "./layout/Authenticate";


function App() {
    return (
        <Provider store = {store}>
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/authenticate" component={Authenticate}/>
                    <Route exact path="/cart" component={Cart}/>

                    <Switch>
                        <AdminRoute exact path="/products" component={ProductList}/>
                        <AdminRoute exact path="/users" component={UsersList}/>
                        <AdminRoute exact path="/orders" component={OrderList}/>
                        <AdminRoute exact path="/categories" component={CategoryList}/>
                        <AdminRoute exact path="/categories/form" component={CategoryForm}/>
                        <AdminRoute exact path="/products/form" component={ProductForm}/>
                        <AdminRoute exact path="/users/form" component={UserForm}/>
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;

import React, {Component} from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadReports();
    }

    loadReports() {

        axios.get("/categories")
            .then(response => {
                const categories = response.data;
                this.setState({
                    categories
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

    Func(car) {
        console.log("Actually nothing.")
    };

    render() {
        let categories =
            this.state.categories && this.state.categories.length > 0 ? (
                this.state.categories.map(category => (
                    <CategoryItem key={category.id} category={category} Func={this.Func}/>
                ))
            ) : (
                <p className="collection-item">There is no category!</p>
            );
        return (
            <div className="container" style={{backgroundColor: "white"}}>
                <ul className="collection">
                    <div className="collection-item collection-header">
                        <h3>Categories</h3>
                    </div>
                    {categories}
                </ul>
            </div>
        );
    }
}

export default CategoryList;

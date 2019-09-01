import React, {Component} from 'react';
import axios from "axios";


class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                sku: "",
                name: "",
                description: "",
                regular_price: "",
                discount_price: "",
                quantity: "",
                image: "",
                taxable: true,
                category: "0"
            },
            errors: {
                sku: "",
                name: "",
                description: "",
                regular_price: "",
                discount_price: "",
                image: "",
                quantity: "",
                taxable: "",
                category: ""
            },
            loading: true
        };
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };

    componentDidMount() {
        axios.get("/categories")
            .then(response => {
                const categories = response.data;
                this.setState({
                    ...this.state,
                    categories: categories
                });
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch(error => {
            });
    }


    handleChange = e => {
        if(e.target.type !== 'checkbox'){
            e.preventDefault();
        }
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let errors = this.state.errors;
        switch (name) {
            case 'sku':
                errors.sku =
                    value.length < 5
                        ? 'Full Name must be 5 characters long!'
                        : '';
                break;
            case 'name':
                errors.name =
                    value.length < 1
                        ? 'Name must not be empty!'
                        : '';
                break;
            case 'description':
                errors.description =
                    value.length < 1
                        ? 'Description must not be empty!'
                        : '';
                break;
            case 'regular_price':
                errors.regular_price =
                    value.length < 1
                        ? 'Regular_price must not be empty!'
                        : '';
                break;
            case 'discount_price':
                errors.discount_price =
                    value.length < 1
                        ? 'Discount_price must not be empty!'
                        : '';
                break;
            case 'quantity':
                errors.quantity =
                    value.length < 1
                        ? 'Quantity must not be empty!'
                        : '';
                break;
            case 'image':
                errors.image =
                    value.length < 1
                        ? 'Image must not be empty!'
                        : '';
                break;
            case 'taxable':
                errors.taxable =
                    value.length < 1
                        ? 'Taxable must not be empty!'
                        : '';
                break;
            case 'category':
                errors.category =
                    value === 0
                        ? 'Taxable must not be empty!'
                        : '';
                break;

            default:
                break;
        }

        this.setState({
            errors,
            ...this.state,
            data: {
                ...this.state.data,
                [name]: value
            },
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.data);
        if (this.validateForm(this.state.errors)) {
            axios
                .post('/products', this.state.data)
                .then(() => {
                    this.setState({
                        data: {
                            sku: "",
                            name: "",
                            description: "",
                            regular_price: "",
                            discount_price: "",
                            quantity: "",
                            image: "",
                            taxable: true,
                            category: "0"
                        },
                        errors: {
                            sku: "",
                            name: "",
                            description: "",
                            regular_price: "",
                            discount_price: "",
                            image: "",
                            quantity: "",
                            taxable: "",
                            category: ""
                        },
                    });
                })
                .catch(postError => {
                    this.setState({
                        ...this.state,
                            postError
                        }
                    );
                    console.log(postError);
                });

        }
    };

    render() {

        if (this.state.loading) {
            return (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"/>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"/>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
            )
        }

        const {errors} = this.state;

        let containerStyles = {
            marginTop: '25px'
        };
        let select = <select name="category" defaultValue="0" className="browser-default" onChange={this.handleChange}><option value="0">Choose category</option>{this.state.categories.map((category) => <option key={category.id} name="category" id="category" value={category.id}>{category.name}</option>)}</select>;
        return (
            <div className="container" style={containerStyles}>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="sku" name="sku" type="text" className={errors.sku.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="sku">Sku</label>
                            {errors.sku.length > 0 &&
                            <span className="helper-text" data-error={errors.sku}> </span>}
                        </div>
                        <div className="input-field col s6">
                            <input id="name" name="name" type="text" className={errors.name.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="name">Name</label>
                            {errors.name.length > 0 &&
                            <span className="helper-text" data-error={errors.name}> </span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="description" name="description" type="text" className={errors.description.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="description">Description</label>
                            {errors.description.length > 0 &&
                            <span className="helper-text" data-error={errors.description}> </span>}
                        </div>
                        <div className="input-field col s6">
                            <input id="regular_price" name="regular_price" type="text" className={errors.regular_price.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="regular_price">Regular_price</label>
                            {errors.regular_price.length > 0 &&
                            <span className="helper-text" data-error={errors.regular_price}> </span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="discount_price" name="discount_price" type="text" className={errors.discount_price.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="discount_price">Discount_price</label>
                            {errors.discount_price.length > 0 &&
                            <span className="helper-text" data-error={errors.discount_price}> </span>}
                        </div>
                        <div className="input-field col s6">
                            <input id="quantity" name="quantity" type="text" className={errors.quantity.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="quantity">Quantity</label>
                            {errors.quantity.length > 0 &&
                            <span className="helper-text" data-error={errors.quantity}> </span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="image" name="image" type="text" className={errors.image.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="image">Image</label>
                            {errors.image.length > 0 &&
                            <span className="helper-text" data-error={errors.image}> </span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s3">
                            <label>
                                <input type="checkbox" name="taxable" checked={this.state.data.taxable} value={this.state.data.taxable} className="filled-in" onChange={this.handleChange}/>
                                <span>Taxable</span>
                            </label>
                        </div>
                        <div className="input-field col s3" >
                            {select}
                            {errors.category.length > 0 &&
                            <span className="helper-text" data-error={errors.category}> </span>}
                        </div>
                    </div>
                    <div className="row">
                        <button className="right waves-effect waves-light btn-small" type="submit">
                            Save <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProductForm;


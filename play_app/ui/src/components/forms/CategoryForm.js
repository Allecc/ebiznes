import React, {Component} from 'react';
import axios from "axios";

class CategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: ""
            },
            errors: {
                name: ""
            }
        };
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };


    handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        let errors = this.state.errors;

        console.log(name);
        console.log(value);
        if (name === 'name') {
            errors.name =
                value.length < 2
                    ? "Name of category must be 2 characters long!"
                    : '';
        } else {
        }

        console.log(errors);

        this.setState({
            errors,
            ...this.state.data,
            data: {
                [name]: value
            }
        });
        console.log(this.state);
    };



    handleSubmit = e => {
        e.preventDefault();
        if (this.validateForm(this.state.errors)) {
            axios
                .post('/categories', this.state.data )
                .catch(errors => {
                    this.setState({
                            errors
                        }
                    );
                    console.log(errors);
                });
        }
        this.setState({
            data: {
                name: ""
            },
            errors: {
                name: ""
            }
        });

    };

    render() {
        const {errors} = this.state;

        return (
            <div className="container row">
                <form className="col s12" onSubmit={this.handleSubmit}>
                    <div className="input-field col s6">
                        <input id="name" name="name" type="text" className={errors.name.length > 0 ? 'invalid' : ''}
                               onChange={this.handleChange}/>
                        {errors.name.length > 0 &&
                        <span className="helper-text" data-error={errors.name}/>}
                        <label className="active" htmlFor="name">Category name</label>
                        <div className="row center">
                            <button
                                className="center waves-effect waves-light btn-small"
                                type="submit"
                            >
                                Save<i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CategoryForm;


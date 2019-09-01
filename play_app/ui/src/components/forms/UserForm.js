import React, {Component} from 'react';
import axios from "axios";


class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                email: "",
                role_id: "",
                active: true,
                first_name: "",
                last_name: "",
            },
            errors: {
                email: "",
                role_id: "",
                active: "",
                first_name: "",
                last_name: "",
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
    validEmailRegex = RegExp(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i);


    componentDidMount() {
        axios.get("/roles")
            .then(response => {
                const roles = response.data;
                this.setState({
                    ...this.state,
                    roles: roles
                });
                this.setState({
                    ...this.state,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleChange = e => {
        if(e.target.type !== 'checkbox'){
            e.preventDefault();
        }
        console.log(this.state);
        const {name} = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let errors = this.state.errors;
        switch (name) {
            case 'email':
                errors.email =
                    !this.validEmailRegex.test(value)
                        ? 'Email is not valid!'
                        : '';
                break;
            case 'first_name':
                errors.first_name =
                    value.length < 1
                        ? 'Regular_price must not be empty!'
                        : '';
                break;
            case 'last_name':
                errors.last_name =
                    value.length < 1
                        ? 'Discount_price must not be empty!'
                        : '';
                break;
            case 'role_id':
                errors.role_id =
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
                .post('/users', this.state.data)
                .then(() => {
                    this.setState({
                        data: {
                            email: "",
                                role_id: "",
                                active: true,
                                first_name: "",
                                last_name: "",
                        },
                        errors: {
                            email: "",
                                role_id: "",
                                active: "",
                                first_name: "",
                                last_name: "",
                        }
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
        let select = <select name="role_id" defaultValue="0" className="browser-default" onChange={this.handleChange}><option value="0">Role</option>{this.state.roles.map((role) => <option key={role.id} name="role_id" id="role_id" value={role.id}>{role.role}</option>)}</select>;
        return (
            <div className="container" style={containerStyles}>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="first_name" name="first_name" type="text" className={errors.first_name.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="first_name">First name</label>
                            <span className="helper-text" data-error={errors.first_name}> </span>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" name="last_name" type="text" className={errors.last_name.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="last_name">Last name</label>
                            <span className="helper-text" data-error={errors.last_name}> </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="email" name="email" type="text" className={errors.email.length > 0 ? 'invalid' : ''}
                                   onChange={this.handleChange}/>
                            <label className="active" htmlFor="email">Email</label>
                            <span className="helper-text" data-error={errors.email}> </span>
                        </div>
                        <div className="input-field col s3" >
                            {select}
                            <span className="helper-text" data-error={errors.role_id}> </span>
                        </div>
                        <div className="input-field col s3">
                            <label>
                                <input type="checkbox" name="active" checked={this.state.data.active} value={this.state.data.active} className="filled-in" onChange={this.handleChange}/>
                                <span>Active</span>
                            </label>
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

export default UserForm;


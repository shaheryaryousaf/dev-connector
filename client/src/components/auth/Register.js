import React, { Fragment, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import Alert from "../layout/Alert"

// For connecting Redux
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';


// ({setAlert}) == (props.setAlert)
const Register = ({ setAlert, register, isAuthenticated }) => {

    // formData has all form values
    // setFormData is a function with which we'll update the state of input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => {
        // This will make copy of formData (original Data) and update the value
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        // Check if passwords are not same
        if (password !== password2) {
            setAlert("Passwords are not same", "danger");
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    } else {

        return (
            <Fragment>
                <div className="col-md-8 m-auto">
                    <h1>SIGN UP</h1>
                    <Alert />
                    <form className="mt-4" onSubmit={e => onSubmit(e)}>
                        <div className="mb-4">
                            <input type="text" className="form-control" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} />
                        </div>
                        <div className="mb-4">
                            <input type="email" className="form-control" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                            <p className="text-secondary"><small>This site uses Gravatar so if you want a profile image, use
                                    a Gravatar email</small></p>
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
                        </div>
                        <div className="mb-4">
                            <input type="password" className="form-control" placeholder="Confirm Password" name="password2" value={password2} onChange={e => onChange(e)} />
                        </div>
                        <div className="mb-4">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <p className="text-secondary">Already have an account? <Link to="/login">Sign In</Link></p>
                </div>
            </Fragment>
        );
    }
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

// connect needs 2 things, 1st is any state, and 2nd is object of action we're gonna use
// setAlert is gonna allow use to use props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);

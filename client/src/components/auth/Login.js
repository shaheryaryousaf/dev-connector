import React, { Fragment, useState } from 'react';
import Alert from "../layout/Alert"
import { Link, Redirect } from "react-router-dom";

// REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: [e.target.value] });
    }

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    // Redirect if Logged In
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <div className="col-md-8 m-auto">
                <h1>SIGN IN</h1>
                <Alert />
                <form className="mt-4" onSubmit={e => onSubmit(e)}>
                    <div className="mb-4">
                        <input type="text" className="form-control" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-4">
                        <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} />
                    </div>
                    <div className="mb-4">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="text-secondary">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

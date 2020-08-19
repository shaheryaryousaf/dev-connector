import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

    // Logged In User Links
    const authLinks = (
        <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/profiles">Developers</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link active" href="#!" onClick={logout}>Logout</a>
            </li>
        </ul>
    );

    // Guest Links
    const guestLinks = (
        <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" to="/profiles">Developers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <section id="header">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><i className="fa fa-code"></i> Dev Connector</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto mb-2 mb-lg-0"></ul>
                            {!loading && (<Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>)}
                        </div>
                    </div>
                </nav>
            </header>
        </section>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
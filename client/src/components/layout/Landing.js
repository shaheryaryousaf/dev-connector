import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
// REDUX
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";

const Landing = ({ logout, auth: { isAuthenticated, loading } }) => {

    // AUTHENTICATED LINKS
    const authLinks = (
        <Fragment>
            <a href="#!" className="btn btn-primary btn-block mt-4" onClick={logout}>Logout</a>
        </Fragment>
    );

    // GUEST LINKS
    const guestLinks = (
        <Fragment >
            <Link to="/register" className="btn btn-primary btn-block mt-4">Register</Link>
            <Link to="/login" className="btn btn-primary btn-block mt-2">Login</Link>
        </Fragment>
    );

    return (
        <section id="main-content">

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8 m-auto text-center">

                        <h1 style={{ fontSize: '84px' }}><i className="fa fa-code"></i></h1>
                        <h1>WELCOME TO DEVCONNECTOR</h1>
                        <h4>A social network for developers</h4>
                        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                    </div>
                </div>
            </div>

        </section>
    );
}

Landing.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Landing);

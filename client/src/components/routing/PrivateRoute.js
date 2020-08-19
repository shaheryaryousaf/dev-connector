import React from 'react';
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

// REDUX
import { connect } from "react-redux";

// We will pass this component from the App.js
// ...rest is anything other than component, like custom props, e.g to=""
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props =>
        !isAuthenticated && !loading ? (
            <Redirect to="/login" />
        ) : (
                <Component {...props} />
            )} />
)


PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);

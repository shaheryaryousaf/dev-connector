import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from "react-redux";
import { deleteAccount } from "../../actions/profile";

const DeleteAccount = ({ deleteAccount }) => {
    return (
        <Fragment>
            <div className="mt-3 mb-5">
                <button className="btn btn-danger mt-4" onClick={() => deleteAccount()}>Delete My Account</button>
            </div>
        </Fragment>
    );
};


DeleteAccount.propTypes = {
    deleteAccount: PropTypes.func.isRequired,
};

export default connect(null, { deleteAccount })(DeleteAccount);

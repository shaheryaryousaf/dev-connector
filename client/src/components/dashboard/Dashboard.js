import React, { useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import Alert from "../layout/Alert";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";
import DeleteAccount from "./DeleteAccount";

// REDUX
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";


const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    // We will use this hook to get Profile data as soon as we come to dashboard
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1>Dashboard</h1>
        <h4>Welcome {user && user.name}</h4>
        {profile !== null ?
            <Fragment>
                <Alert />
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <DeleteAccount />
            </Fragment>
            : <Fragment>
                <div id="add-info-buttons" className="mt-3">
                    <p>You don't have any profile yet, please add your profile</p>
                    <Link to="create-profile" className="btn btn-primary">
                        <i className="fa fa-user-circle"></i>&nbsp;Create Profile
                    </Link>
                </div>
            </Fragment>}
    </Fragment>
};


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);

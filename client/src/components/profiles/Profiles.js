import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

// REDUX
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";


const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? <Spinner /> :
                <Fragment>
                    <h1>Developers</h1>
                    <span id="custom-heading">Browse and connect with developers</span>
                    <div className="profiles mt-4">
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {
                                profiles.length > 0 ? (profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                                ) : <Fragment><h4>No Profile Found</h4></Fragment>
                            }
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    );
};


Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);

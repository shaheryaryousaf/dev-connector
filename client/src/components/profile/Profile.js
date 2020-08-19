import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';


const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id]);

    return (
        <Fragment> {profile === null || loading ? (<Spinner />) :
            (<Fragment>
                <div>
                    <Link to="/profiles" className="btn btn-info">Back To Profiles</Link> &nbsp;
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
                    )}
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />

                    <div id="education-experience" className="mt-4">
                        <div className="row row-cols-1 row-cols-md-2 g-4">

                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Experience</h3>
                                        <hr />
                                        {profile.experience.length > 0 ? (
                                            <Fragment>{
                                                profile.experience.map(experience => (
                                                    <ProfileExperience key={experience._id} experience={experience} />
                                                ))
                                            }</Fragment>
                                        ) :
                                            <Fragment>There are no Experience Credentials for this User.</Fragment>}
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">Education</h3>
                                        <hr />
                                        {profile.education.length > 0 ? (
                                            <Fragment>
                                                {profile.education.map(education => (
                                                    <ProfileEducation key={education._id} education={education} />
                                                ))}
                                            </Fragment>
                                        ) : (
                                                <Fragment>There is no education for this user, right now.</Fragment>
                                            )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div id="github-repos" className=" mt-4">
                        <h4>Github Repos</h4>
                        <ProfileGithub username={profile.githubusername} />
                    </div>

                </div>
            </Fragment>)
        } </Fragment>
    );
};


Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);

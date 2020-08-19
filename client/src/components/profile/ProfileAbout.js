import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) => {
    return (
        <Fragment>
            <div className="card mt-4" id="bio-card">
                <div className="card-body">
                    {bio && (
                        <Fragment>
                            <h3>{name}'s Bio</h3>
                            <p>{bio}</p>
                            <hr />
                        </Fragment>
                    )}
                    <h3 className="mt-5">Skill Set</h3>
                    <ul>
                        {skills.map((skill, index) => (
                            <li key={index}><i className="fa fa-check"></i> {skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};


ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
};


export default ProfileAbout;

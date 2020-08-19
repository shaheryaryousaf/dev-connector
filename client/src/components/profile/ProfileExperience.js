import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileExperience = ({ experience: { company, title, description, to, from } }) => {
    return (
        <Fragment>
            <div className="single-exp border-bottom mb-3">
                <div className="card-text">
                    <p><b>{company && company}</b></p>
                    <p><Moment format="DD/MM/YYYY">{from}</Moment> - {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}</p>
                    <p><b>Position: </b>{title && title}</p>
                    <p><b>Description: </b>{description && description}</p>
                </div>
            </div>
        </Fragment>
    );
};


ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
};


export default ProfileExperience;

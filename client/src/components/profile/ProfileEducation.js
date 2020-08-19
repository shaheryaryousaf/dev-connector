import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileEducation = ({ education: { school, degree, fieldofstudy, from, to, description } }) => {
    return (
        <Fragment>
            <div className="single-exp border-bottom mb-3">
                <div className="card-text">
                    <p><b>{school && school}</b></p>
                    <p><Moment format="DD/MM/YYYY">{from}</Moment> - {!to ? 'Now' : <Moment format="DD/MM/YYYY">{to}</Moment>}</p>
                    <p><b>Degree: </b>{degree && degree}</p>
                    <p><b>Field Of Study: </b>{fieldofstudy && fieldofstudy}</p>
                    <p><b>Description: {description && description}</b></p>
                </div>
            </div>
        </Fragment>
    );
};


ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
};


export default ProfileEducation;

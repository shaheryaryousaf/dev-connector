import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
    profile: {
        status, company, location, website, social, user: { name, avatar }
    }
}) => {
    return (
        <Fragment>
            <div className="card mt-4" id="top-card">
                <div className="card-body">
                    <img src={avatar} className="mb-3" alt={name} style={{ borderRadius: '100%' }} />
                    <h2>{name}</h2>
                    <h4>{status && status} at {company && company}</h4>
                    <p>{location && location}</p>
                    <ul>
                        {website && (
                            <li><a href={website} target="_blank" rel="noopener noreferrer"><i className="fa fa-globe"></i></a></li>
                        )}
                        {social && social.twitter && (
                            <li><a href={social.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a></li>
                        )}
                        {social && social.facebook && (
                            <li><a href={social.facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                        )}
                        {social && social.linkedin && (
                            <li><a href={social.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
                        )}
                        {social && social.youtube && (
                            <li><a href={social.youtube} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube"></i></a></li>
                        )}
                        {social && social.instagram && (
                            <li><a href={social.instagram} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li>
                        )}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
};


ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
};


export default ProfileTop;

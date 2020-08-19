import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ProfileItem = ({ profile:
    {
        user: { _id, name, avatar },
        status, company, location
    }
}) => {
    return (
        <div className="col">
            <div className="card">
                <img src={avatar} className="card-img-top" alt="" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text mb-1">{status && status} at {company && company}</p>
                    <p className="card-text">{location && location}</p>
                    <Link to={`/profiles/${_id}`} className="btn btn-primary btn-sm">View Detail</Link>
                </div>
            </div>
        </div>
    );
};


ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};


export default ProfileItem;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

// REDUX
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";


const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <div className="single-exp border-bottom mb-3" key={exp._id}>
            <div className="card-text">
                <h5>{exp.company}</h5>
            </div>
            <p className="mb-2"><Moment format="DD/MM/YYYY">{exp.from}</Moment> - {
                exp.to === null ? ('Now') : (<Moment format="DD/MM/YYYY">{exp.to}</Moment>)
            }</p>
            <p className="mb-2"><b>Position: </b>{exp.title}</p>
            <p><b>Description: </b>Description: {exp.description}</p>
            <p><button onClick={() => deleteExperience(exp._id)} className="btn btn-danger btn-sm">Delete</button></p>
        </div>
    ));
    return (
        <Fragment>
            <div id="experience" className="mt-4">
                <div className="card  mt-3">
                    <div className="card-body">
                        <h3 className="card-title">Experience</h3>
                        <hr />
                        {experiences}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
};


export default connect(null, { deleteExperience })(Experience);

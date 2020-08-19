import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

// REDUX
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {

    const educations = education.map(edu => (
        <div className="single-exp" key={edu._id}>
            <div className="card-text">
                <h5>{edu.school}</h5>
            </div>
            <p className="mb-2"><Moment format="DD/MM/YYYY">{edu.from}</Moment> - {
                edu.to === null ? ('Now') : (<Moment format="DD/MM/YYYY">{edu.to}</Moment>)
            }</p>
            <p className="mb-2"><b>Degree: </b>{edu.degree}</p>
            <p className="mb-2"><b>Field Of Study: </b>{edu.fieldofstudy}</p>
            <p><b>Description: {edu.description}</b></p>
            <p><button onClick={() => deleteEducation(edu._id)} className="btn btn-danger btn-sm">Delete</button></p>
        </div>
    ));

    return (
        <Fragment>
            <div id="education" className="mt-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Education</h3>
                        <hr />
                        {educations}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};


Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
};


export default connect(null, { deleteEducation })(Education);

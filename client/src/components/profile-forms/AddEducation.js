import React, { Fragment, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Alert from "../layout/Alert";

// REDUX
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";


const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: "",
        description: ""
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1>Add Your Education</h1>
            <span id="custom-heading"> Add any school, bootcamp, etc that you have attended</span>
            <Alert />
            <small className="d-block mt-3">* = required field</small>

            <form className="mt-4" onSubmit={e => onSubmit(e)}>
                <div className="mb-4">
                    <input type="text" className="form-control" placeholder="* School or Bootcamp" name="school" value={school} onChange={e => onChange(e)} />
                </div>
                <div className="mb-4">
                    <input type="text" className="form-control" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={e => onChange(e)} />
                </div>
                <div className="mb-4">
                    <input type="text" className="form-control" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="mb-4">
                    <label>From Date</label>
                    <input type="date" className="form-control" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="mb-4">
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="current" value={current} onChange={e => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} />
                    <label className="form-check-label" htmlFor="flexCheckDefault">{' '}Current School or Bootcamp</label>
                </div>
                <div className="mb-4">
                    <label>To Date</label>
                    <input type="date" className="form-control" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="mb-4">
                    <textarea type="text" className="form-control" placeholder="Program Description" rows="5" name="description" value={description} onChange={e => onChange(e)}></textarea>
                </div>
                <div className="mb-4">
                    <button className="btn btn-primary">Submit</button> &nbsp;
                    <Link to="/dashboard" className="btn btn-info">Go Back</Link>
                </div>
            </form>
        </Fragment>
    );
};


AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
};


export default connect(null, { addEducation })(withRouter(AddEducation));

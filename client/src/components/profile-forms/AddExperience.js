import React, { Fragment, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import Alert from "../layout/Alert";

// REDUX
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: "",
        title: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        addExperience(formData, history)
    }

    return (
        <Fragment>
            <h1>Add An Experience</h1>
            <span id="custom-heading">Add any developer/programming positions that you have had in the past</span>
            <Alert />
            <small class="d-block mt-3">* = required field</small>

            <form class="mt-4" onSubmit={e => onSubmit(e)}>
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} />
                </div>
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} />
                </div>
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                </div>
                <div class="mb-4">
                    <label>From Date</label>
                    <input type="date" class="form-control" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div class="mb-4">
                    <input class="form-check-input" type="checkbox" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} id="flexCheckDefault" />
                    <label class="form-check-label" htmlFor="flexCheckDefault">{' '}Current Job</label>
                </div>
                <div class="mb-4">
                    <label>To Date</label>
                    <input type="date" class="form-control" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div class="mb-4">
                    <textarea type="text" class="form-control" placeholder="Job Description" rows="5" name="description" value={description} onChange={e => onChange(e)}></textarea>
                </div>
                <div class="mb-4">
                    <button class="btn btn-primary">Submit</button> &nbsp;
                    <Link to="/dashboard" className="btn btn-info">Go Back</Link>
                </div>
            </form>
        </Fragment>
    );
};


AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
};


export default connect(null, { addExperience })(withRouter(AddExperience));

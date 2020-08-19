import React, { Fragment, useState } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from 'prop-types';

// REDUX
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {

    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
    });

    const [displaySocialLinks, toggleSocialLinks] = useState(false);

    // EXRACTING DATA FROM "formData"
    const { company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    }

    return (
        <Fragment>
            <h1>Create Your Profile</h1>
            <span id="custom-heading">Let's get some information to make your profile stand out</span>

            <small className="d-block mt-3">* = required field</small>

            <form className="mt-4" id="create-profile" onSubmit={e => onSubmit(e)}>
                <div className="mb-3">
                    <select className="form-control" name="status" value={status} onChange={e => onChange(e)}>
                        <option>* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student">Student</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="text-secondary">Give us an idea of where you are at in your career</small>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Company" name="company" value={company} onChange={e => onChange(e)} />
                    <small className="text-secondary">Could be your own company or one you work for</small>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Website" name="website" value={website} onChange={e => onChange(e)} />
                    <small className="text-secondary">Could be your own or a company website</small>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
                    <small className="text-secondary">City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="* Skills" name="skills" value={skills} onChange={e => onChange(e)} />
                    <small className="text-secondary">Please use comma separated values (eg.
                                HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Github Username" name="githubusername" value={githubusername} onChange={e => onChange(e)} />
                    <small className="text-secondary">If you want your latest repos and a Github link, include your
                                username</small>
                </div>
                <div className="mb-3">
                    <textarea type="text" className="form-control" placeholder="Your Bio" rows="5" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="text-secondary">Tell us a little about yourself</small>
                </div>

                <div className="mb-3">
                    <button type="button" className="btn btn-success" onClick={() => toggleSocialLinks(!displaySocialLinks)}>Add Social Links</button> <small> (Optional)</small>
                </div>

                {displaySocialLinks && <Fragment>
                    <div className="mb-3">
                        <div className="row">
                            <label className="col-sm-1 col-form-label"><i className="fa fa-twitter"></i></label>
                            <div className="col-sm-11">
                                <input type="text" className="form-control" placeholder="Twitter Link" name="twitter" value={twitter} onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <label className="col-sm-1 col-form-label"><i className="fa fa-facebook"></i></label>
                            <div className="col-sm-11">
                                <input type="text" className="form-control" placeholder="Facebook Link" name="facebook" value={facebook} onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <label className="col-sm-1 col-form-label"><i className="fa fa-youtube"></i></label>
                            <div className="col-sm-11">
                                <input type="text" className="form-control" placeholder="Youtube Link" name="youtube" value={youtube} onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <label className="col-sm-1 col-form-label"><i className="fa fa-linkedin"></i></label>
                            <div className="col-sm-11">
                                <input type="text" className="form-control" placeholder="Linkedin Link" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <label className="col-sm-1 col-form-label"><i className="fa fa-instagram"></i></label>
                            <div className="col-sm-11">
                                <input type="text" className="form-control" placeholder="Instagram Link" name="instagram" value={instagram} onChange={e => onChange(e)} />
                            </div>
                        </div>
                    </div>
                </Fragment>}

                <div className="mb-3 mt-4">
                    <button className="btn btn-primary">Submit</button> &nbsp;
                    <Link to="/dashboard" className="btn btn-info">Go Back</Link>
                </div>
            </form>
        </Fragment>
    );
};


CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

// To push history object, we used "withRouter" from Link
export default connect(null, { createProfile })(withRouter(CreateProfile));

import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
    return (
        <div id="add-info-buttons" className="mt-4">
            <Link to="/edit-profile" className="btn btn-primary"><i className="fa fa-user-circle"></i>&nbsp;EditProfile</Link>
            &nbsp;
            <Link to="/add-experience" className="btn btn-primary"><i className="fa fa-black-tie"></i> &nbsp;AddExperience</Link>
            &nbsp;
            <Link to="/add-education" className="btn btn-primary"><i className="fa fa-graduation-cap"></i>&nbsp;Add Education</Link>
        </div>
    )
}

export default DashboardActions;
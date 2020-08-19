import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";


const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div className={`alert alert-${alert.alertType} alert-dismissible fade show`} role="alert" key={alert.id}>
        {alert.msg}
    </div>
));


Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    alerts: state.alert // this is comming from alert reducer file 
});

export default connect(mapStateToProps)(Alert);

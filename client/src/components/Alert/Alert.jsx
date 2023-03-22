import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import "./Alert.css";
import successIcon from '../../assets/success_icon.png'
import warnIcon from '../../assets/warn_icon.png'
import crossIcon from '../../assets/cross_icon.png'

const Alert = ({ alerts }) =>

  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`common_msg ${alert.alertType}`}>
      {console.log(alert.alertType)}
      <img src={alert.alertType === 'success_mesg' ? successIcon :   warnIcon} className="img-fluid success_img" />
      <div className="forflex">
        <span className="com_msg"> {alert.msg}</span>
        <img
          src={crossIcon}
          className="img-fluid cross_icon"
          alt="cross icon"
        />
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

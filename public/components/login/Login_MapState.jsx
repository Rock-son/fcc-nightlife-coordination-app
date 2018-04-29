"use strict";

import Login from "Login_HOC";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_REGISTRATION, DISPATCH_IS_REGISTERING, OPEN_LOGIN_DIALOG, DISPATCH_LOGOUT } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		openLoginDialog: openState => dispatch(OPEN_LOGIN_DIALOG(openState)),
		isRegistering: state => dispatch(DISPATCH_IS_REGISTERING(state)),
		login: data => dispatch(DISPATCH_LOGIN(data)),
		register: data => dispatch(DISPATCH_REGISTRATION(data)),
		logout: () => dispatch(DISPATCH_LOGOUT()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

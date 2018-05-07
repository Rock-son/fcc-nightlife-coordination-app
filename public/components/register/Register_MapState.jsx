"use strict";

import Register from "Register_HOC";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_REGISTRATION, OPEN_LOGIN_DIALOG, DISPATCH_LOGOUT } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { auth: state.auth };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		openLoginDialog: openState => dispatch(OPEN_LOGIN_DIALOG(openState)),
		login: data => dispatch(DISPATCH_LOGIN(data)),
		register: data => dispatch(DISPATCH_REGISTRATION(data)),
		logout: () => dispatch(DISPATCH_LOGOUT()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

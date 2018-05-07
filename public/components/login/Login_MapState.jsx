"use strict";

import Login from "Login_HOC";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_LOCAL_LOGIN, OPEN_LOGIN_DIALOG, DISPATCH_LOGOUT } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { auth: state.auth };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		openLoginDialog: openState => dispatch(OPEN_LOGIN_DIALOG(openState)),
		login: data => dispatch(DISPATCH_LOGIN(data)),
		localLogin: data => dispatch(DISPATCH_LOCAL_LOGIN(data)),
		logout: () => dispatch(DISPATCH_LOGOUT()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

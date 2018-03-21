"use strict";

import { App } from "App";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../state/actionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = (state) => {
	return {...state};
};

const mapDispatchToProps = (dispatch) => {
	return {
		_login:  () => dispatch(loginUser()),
		_logout: (user) => dispatch(logoutUser(user))
	};
};

export const MainWrapper = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
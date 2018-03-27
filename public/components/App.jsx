"use strict";

import Home from "Home";
import { connect } from "react-redux";
import { DISPATCH_LOGIN_ACTION, DISPATCH_LOGOUT_ACTION, DISPATCH_SEARCH_ACTION } from "../state/actions";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		login: () => dispatch(DISPATCH_LOGIN_ACTION()),
		logout: user => dispatch(DISPATCH_LOGOUT_ACTION(user)),
		getBarsOnLocation: location => dispatch(DISPATCH_SEARCH_ACTION(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

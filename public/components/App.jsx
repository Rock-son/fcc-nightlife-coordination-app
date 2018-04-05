"use strict";

import Home from "Home";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_LOGOUT, FETCH_BUSINESSES } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		login: () => dispatch(DISPATCH_LOGIN()),
		logout: user => dispatch(DISPATCH_LOGOUT(user)),
		search: location => dispatch(FETCH_BUSINESSES(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

"use strict";

import Home from "Home";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_LOGOUT, DISPATCH_GOING, DISPATCH_NOT_GOING, FETCH_BUSINESSES } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		login: user => dispatch(DISPATCH_LOGIN(user)),
		logout: user => dispatch(DISPATCH_LOGOUT(user)),
		going: (id, user) => dispatch(DISPATCH_GOING(id, user)),
		notGoing: (id, user) => dispatch(DISPATCH_NOT_GOING(id, user)),
		search: location => dispatch(FETCH_BUSINESSES(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

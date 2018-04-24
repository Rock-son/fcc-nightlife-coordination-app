"use strict";

import Home from "Home";
import { connect } from "react-redux";
import { DISPATCH_LOGIN, DISPATCH_LOGOUT, DISPATCH_GOING, DISPATCH_NOT_GOING, INITIALIZE_LOCATION, LOCATION_INPUT_SRC, FETCH_BUSINESSES } from "ActionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = function a(state) {
	return { ...state };
};


const mapDispatchToProps = function b(dispatch) {
	return {
		login: user => dispatch(DISPATCH_LOGIN(user)),
		logout: user => dispatch(DISPATCH_LOGOUT(user)),
		going: (city, id, user) => dispatch(DISPATCH_GOING(city, id, user)),
		notGoing: (city, id, user) => dispatch(DISPATCH_NOT_GOING(city, id, user)),
		renderLocation: () => dispatch(INITIALIZE_LOCATION()),
		locationInput: input => dispatch(LOCATION_INPUT_SRC(input)),
		search: location => dispatch(FETCH_BUSINESSES(location))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

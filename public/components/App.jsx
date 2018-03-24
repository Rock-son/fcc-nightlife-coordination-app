"use strict";

import { Home } from "Home";
import { connect } from "react-redux";
import { DISPATCH_LOGIN_ACTION, DISPATCH_LOGOUT_ACTION, DISPATCH_SEARCH_ACTION } from "../state/actionCreators";


// Redux connect to props and dispatch actions
const mapStateToProps = (state) => {
	return {...state};
};

const mapDispatchToProps = (dispatch) => {
	return {
		_login:  () => dispatch(DISPATCH_LOGIN_ACTION()),
		_logout: ( user ) => dispatch(DISPATCH_LOGOUT_ACTION(user)),
		_getBarsOnLocation: ( location ) => dispatch(DISPATCH_SEARCH_ACTION(location))
	};
};

export const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
"use strict";

import { combineReducers } from "redux";
import { LOGIN, LOGOUT, SEARCH, INITIAL_AUTH, INITIAL_BARS, GET_BARS_ON_LOCATION } from "StateVariables";


const authReducer = (state = INITIAL_AUTH, action) => {
	switch (action.type) {
	case LOGIN:
		return { // TODO: REPLACE with function that will return true after successful login!
			...state,
			authenticated: true
		};
	case LOGOUT:
		return {// TODO: REPLACE with function that will return true after successful logout!
			...state,
			authenticated: false
		};
	default:
		return state;
	}
};

const searchReducer = (state = INITIAL_BARS, action) => {
	switch (action.type) {
	case SEARCH:
		return {
			results: GET_BARS_ON_LOCATION(action.location)
		};
	default:
		return state;
	}
};


export default combineReducers({
	auth: authReducer,
	bars: searchReducer
});

"use strict";

import { combineReducers } from "redux";
import { LOGIN, LOGOUT, FETCHING_START, FETCHING_FAILURE, FETCHING_RECEIVED } from "Actions";
import { INITIAL_AUTH_REDUCER, INITIALIZE_BAR_REDUCER } from "InitialState";


const authReducer = (state = INITIAL_AUTH_REDUCER, action) => {
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


const searchReducer = (state = INITIALIZE_BAR_REDUCER, action) => {
	switch (action.type) {
	case FETCHING_START:
		return {
			...state,
			isFetching: true,
			errorFetching: false,
			errorMsg: "",
			lastSrcLocation: action.location
		};
	case FETCHING_FAILURE:
		return {
			...state,
			isFetching: false,
			errorFetching: true,
			errorMsg: action.error

		};
	case FETCHING_RECEIVED:
		return {
			...state,
			isFetching: false,
			businesses: action.businesses
		};
	default:
		return state;
	}
};


export default combineReducers({
	auth: authReducer,
	bar: searchReducer
});

"use strict";

import { combineReducers } from "redux";
import { LOGIN, LOGOUT, GOING, NOT_GOING, FETCHING_START, FETCHING_FAILURE, FETCHING_RECEIVED } from "Actions";
import { INITIAL_AUTH_REDUCER, INITIAL_GOING_REDUCER, INITIALIZE_BAR_REDUCER } from "InitialState";

const defaultArr = [];


// TODO: REPLACE with function that will return true after successful login and logout!
const authReducer = (state = INITIAL_AUTH_REDUCER, action) => {
	switch (action.type) {
	case LOGIN:
		return {
			...state,
			user: action.user,
			authenticated: true
		};
	case LOGOUT:
		return {
			...state,
			user: action.user,
			authenticated: false
		};
	default:
		return state;
	}
};
// TODO: ADD TO DB
const goingReducer = (state = INITIAL_GOING_REDUCER, action) => {
	const removeElIdx = (state[action.id] || defaultArr).indexOf(action.user);
	const venueIdUserArray = state[action.id] || defaultArr;
	console.log(removeElIdx, venueIdUserArray);
	switch (action.type) {
	case GOING:
		return {
			...state,
			[action.id]: venueIdUserArray.concat(action.user)
		};
	case NOT_GOING:
		return {
			...state,
			[action.id]: venueIdUserArray.slice(0, removeElIdx).concat(venueIdUserArray.slice(removeElIdx + 1))
		};
	default:
		return state;
	}
};
// TODO: ADD TO DB
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
	bar: searchReducer,
	go: goingReducer
});

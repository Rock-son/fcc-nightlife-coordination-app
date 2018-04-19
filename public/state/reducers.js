"use strict";

import { combineReducers } from "redux";
import { LOGIN, LOGOUT, INITIALIZE_GOING, GOING_START, GOING_FAIL, GOING_RECEIVED, FETCHING_START, FETCHING_FAILURE, FETCHING_RECEIVED } from "Actions";
import { INITIAL_AUTH_REDUCER, INITIAL_GOING_REDUCER, INITIALIZE_BAR_REDUCER } from "InitialState";


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
// GOING REDUCER
const goingReducer = (state = INITIAL_GOING_REDUCER, action) => {
	let idx = null;
	let bar = null;
	let bars = null;
	switch (action.type) {
	case INITIALIZE_GOING:
		return {
			...state,
			bars: action.bars
		};
	case GOING_START:
		return {
			...state,
			errorGoing: false,
			errorMsg: ""
		};
	case GOING_FAIL:
		return {
			...state,
			errorGoing: true,
			errorMsg: action.error
		};
	case GOING_RECEIVED:
		// IF BAR EXISTS - change value, else concatenate it to state.bars
		idx = state.bars.map(e => e.bar.id).indexOf(action.id);
		bar = { bar: { id: action.id, users: action.users } };
		bars = idx > -1 ? state.bars.slice(0, idx).concat(bar).concat(state.bars.slice(idx + 1)) : state.bars.concat(bar);
		return {
			...state,
			bars
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
			isFetchingBusinesses: true,
			errorFetching: false,
			errorMsg: "",
			lastSrcLocation: action.location
		};
	case FETCHING_FAILURE:
		return {
			...state,
			isFetchingBusinesses: false,
			errorFetching: true,
			errorMsg: action.error.response.statusText

		};
	case FETCHING_RECEIVED:
		return {
			...state,
			isFetchingBusinesses: false,
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

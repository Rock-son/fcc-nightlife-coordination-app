"use strict";

import { LOGIN, LOGOUT, FETCHING_START, FETCHING_FAILURE, FETCHING_RECEIVED } from "Actions";
import { getBarsOnLocation } from "InitialState";


// AUTHENTICATION action creater
export function DISPATCH_LOGIN(user) {
	return {
		type: LOGIN,
		user
	};
}
export function DISPATCH_LOGOUT(user) {
	return {
		type: LOGOUT,
		user
	};
}

// ASYNC FETCH AC for Yelp API
function fetchStart() {
	return {
		type: FETCHING_START
	};
}

function fetchFail(error) {
	return {
		type: FETCHING_FAILURE,
		error
	};
}

function fetchReceived(json) {
	return {
		type: FETCHING_RECEIVED,
		businesses: json.businesses || [],
		receivedAt: Date.now()
	};
}

function shouldReturnResults(state, location) {
	if (state.lastSrcLocation === location) {
		return false;
	}
	return true;
}


// Thunk middleware
export function FETCH_BUSINESSES(location) {
	return (dispatch, getState) => {
		if (!shouldReturnResults(getState, location)) {
			return Promise.resolve;
		}
		dispatch(fetchStart());

		return getBarsOnLocation(location)
			.then(
				json => dispatch(fetchReceived(json.data)),
				error => dispatch(fetchFail(error))
			);
	};
}

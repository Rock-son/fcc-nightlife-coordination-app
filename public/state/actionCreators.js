"use strict";

import { LOGIN, LOGOUT, GOING, NOT_GOING, FETCHING_START, FETCHING_FAILURE, FETCHING_RECEIVED } from "Actions";
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

export function DISPATCH_GOING(id, user) {
	return {
		type: GOING,
		id,
		user
	};
}
export function DISPATCH_NOT_GOING(id, user) {
	return {
		type: NOT_GOING,
		id,
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
		businesses: json || {},
		receivedAt: Date.now()
	};
}

function shouldReturnResults(state, location) {
	if (state.lastSrcLocation === location) {
		return false;
	}
	return true;
}


// REDUX THUNK MIDDLEWARE
export function FETCH_BUSINESSES(location) {
	return (dispatch, getState) => {
		if (!shouldReturnResults(getState, location)) {
			return Promise.resolve;
		}
		// SYNC FUNC - can be dispatched immediately
		dispatch(fetchStart());
		// ASYNC FUNC - return a Promise
		return getBarsOnLocation(location)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(fetchFail(json.data));
				} else {
					dispatch(fetchReceived(json.data));
				}
			})
			.catch(error => dispatch(fetchFail(error)));
	};
}

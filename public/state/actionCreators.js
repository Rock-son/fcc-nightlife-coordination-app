"use strict";

import { LOGIN, LOGOUT, INITIALIZE_GOING, GOING_START, GOING_FAIL, GOING_RECEIVED, LOCATION_INPUT, FETCHING_START, FETCHING_FAIL, FETCHING_RECEIVED } from "Actions";
import { addGoingUsers, removeGoingUsers, initializeLocation, getBarsOnLocation } from "InitialState";


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


// ASYNC GOING
function initializeGoing(json) {
	return {
		type: INITIALIZE_GOING,
		bars: json || []
	};
}
function goingStart() {
	return {
		type: GOING_START
	};
}
function goingFail(error) {
	return {
		type: GOING_FAIL,
		error
	};
}
function goingReceived(json) {
	return {
		type: GOING_RECEIVED,
		users: json.users || [],
		id: json.id || ""
	};
}


// Redux Thunk
export function DISPATCH_GOING(city, id, user) {
	return (dispatch) => {
		dispatch(goingStart());

		return addGoingUsers(city, id, user)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(goingFail(json.data));
				} else {
					dispatch(goingReceived(json.data));
				}
			})
			.catch(error => dispatch(goingFail(error)));
	};
}
export function DISPATCH_NOT_GOING(city, id, user) {
	return (dispatch) => {
		dispatch(goingStart());

		return removeGoingUsers(city, id, user)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(goingFail(json.data));
				} else {
					dispatch(goingReceived(json.data));
				}
			})
			.catch(error => dispatch(goingFail(error)));
	};
}


// ASYNC SEARCH
function fetchStart() {
	return {
		type: FETCHING_START
	};
}

function fetchFail(error) {
	return {
		type: FETCHING_FAIL,
		error
	};
}

export function LOCATION_INPUT_SRC(input) {
	return {
		type: LOCATION_INPUT,
		input
	};
}

function fetchReceived(json) {
	return {
		type: FETCHING_RECEIVED,
		businesses: json || [],
		receivedAt: Date.now()
	};
}

function shouldReturnResults(state, location) {
	if (state.lastSrcLocation === location) {
		return false;
	}
	return true;
}


// REDUX THUNK
export function INITIALIZE_LOCATION() {
	return (dispatch) => {
		// SYNC FUNC - can be dispatched immediately
		dispatch(fetchStart());
		// ASYNC FUNC - return a Promise
		return initializeLocation()
			.then((json) => {
				if (json.status !== 200) {
					dispatch(fetchFail(json.data));
				} else {
					dispatch(LOCATION_INPUT_SRC(json.data.city));
				}
			})
			.catch(error => dispatch(fetchFail(error)));
	};
}


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
					dispatch(initializeGoing(json.data.bars));
					dispatch(fetchReceived(json.data.businesses));
				}
			})
			.catch(error => dispatch(fetchFail(error)));
	};
}

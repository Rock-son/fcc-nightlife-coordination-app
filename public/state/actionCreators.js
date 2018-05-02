"use strict";

import {
	REGISTER, IS_REGISTERING, REGISTER_FAIL, LOGIN_DIALOG, LOGIN, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL, INITIALIZE_GOING, GOING_START,
	GOING_FAIL, GOING_RECEIVED,	LOCATION_INPUT, FETCHING_START, FETCHING_FAIL, FETCHING_RECEIVED
} from "Actions";
import { addGoingUsers, removeGoingUsers, initializeLocation, getBarsOnLocation, login, localLogin, register, logout } from "Api";


// AUTHENTICATION action creater
export function OPEN_LOGIN_DIALOG(state) {
	return {
		type: LOGIN_DIALOG,
		state
	};
}
export function DISPATCH_IS_REGISTERING(state) {
	return {
		type: IS_REGISTERING,
		state
	};
}
	// REGISTER & LOGIN
function registerUser(data) {
	return {
		type: REGISTER,
		user: data.user
	};
}
function loginUser(data) {
	return {
		type: LOGIN,
		user: data.user
	};
}
function loginFail(error) {
	return {
		type: LOGIN_FAIL,
		error
	};
}
function registerFail(error) {
	return {
		type: REGISTER_FAIL,
		error
	};
}
	// LOGOUT
function logoutUser() {
	return {
		type: LOGOUT
	};
}
function logoutFail(error) {
	return {
		type: LOGOUT_FAIL,
		error
	};
}
// TODO: LOGOUT by deleteing the authentication cookie
export function DISPATCH_LOGOUT() {
	return (dispatch, getState) => {
		if (!getState().auth.authenticated) {
			return Promise.resolve;
		}

		return logout()
			.then((json) => {
				if (json.status !== 200) {
					dispatch(logoutFail(json.data.error));
				} else {
					dispatch(logoutUser());
				}
			})
			.catch(error => dispatch(logoutFail(error)));
	};
}
// Redux Thunk
export function DISPATCH_REGISTRATION(user, p1, p2) {
	return (dispatch, getState) => {
		if (getState().auth.authenticated) {
			return Promise.resolve;
		}

		return register(user, p1, p2)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(registerFail(json.data.error));
				} else {
					dispatch(registerUser(json.data));
				}
			})
			.catch(error => dispatch(registerFail(error)));
	};
}
export function DISPATCH_LOCAL_LOGIN(data) {
	return (dispatch, getState) => {
		if (getState().auth.authenticated) {
			return Promise.resolve;
		}

		return localLogin(data)
			.then((json) => {
				if (json.status !== 200) {
					dispatch(loginFail(json.data));
				} else {
					dispatch(loginUser(json.data));
				}
			})
			.catch(error => dispatch(loginFail(error)));
	};
}
export function DISPATCH_LOGIN(data) {
	return (dispatch, getState) => {
		if (getState().auth.authenticated) {
			return Promise.resolve;
		}

		return login(data)
			.then((json) => {
				if (json.status !== 200) {
					return dispatch(loginFail(json.data));
				}
				dispatch(loginUser(json.data));
			})
			.catch(error => dispatch(loginFail(error)));
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
		if (!shouldReturnResults(getState().bar, location)) {
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

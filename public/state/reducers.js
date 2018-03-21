"use strict";

import { combineReducers } from "redux";
import { LOGIN, LOGOUT, SEARCH, INITIAL_AUTH, INITIAL_SEARCH } from "StateVariables";


const authReducer = (state = INITIAL_AUTH, action) => {
	
	switch(action.type) {
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

const searchReducer = (state = INITIAL_SEARCH, action) => {
	switch(action.type) {
	case SEARCH:
		return {
			location: action.location
		};
	default:
		return state;
	}
};



export const rootReducer = combineReducers({
	auth: authReducer,
	search: searchReducer
});
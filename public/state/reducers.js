"use strict";

import { combineReducers } from "redux";
import { initialAuth, initialSearch } from "./initialState";
import { LOGIN, LOGOUT, SEARCH } from "./static_vars";


const authReducer = (state = initialAuth, action) => {
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

const searchReducer = (state = initialSearch, action) => {
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
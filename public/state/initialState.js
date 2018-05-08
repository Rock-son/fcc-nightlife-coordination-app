"use strict";

export default {
	INITIAL_AUTH_STATE: {
		authenticated: false,
		authType: "",
		openDialog: false,
		hasError: false,
		error: "",
		user: "",
		redirect: false
	},
	INITIAL_GOING_STATE: {
		errorGoing: false,
		errorMsg: "",
		bars: []
	},
	INITIALIZE_BAR_STATE: {
		isFetchingBusinesses: false,
		errorFetching: false,
		errorMsg: "",
		lastSrcLocation: "",
		inputSrc: "",
		businesses: []
	}
};

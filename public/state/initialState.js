"use strict";

import axios from "axios";

export default {
	INITIAL_AUTH_REDUCER: { authenticated: false },
	INITIALIZE_BAR_REDUCER: {
		isFetching: false,
		errorFetching: false,
		errorMsg: "",
		lastSrcLocation: "",
		businesses: []
	},
	getBarsOnLocation: location =>
		axios({
			method: "post",
			url: "api/searchBars",
			data: {
				location
			},
			headers: {
				"Content-Type": "application/json"
			},
			validateStatus: status => status < 500 // Reject if the status is > 500
		})
};

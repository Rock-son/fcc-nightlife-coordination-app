"use strict";

import axios from "axios";

export default {
	INITIAL_AUTH_REDUCER: { authenticated: false },
	INITIALIZE_BAR_REDUCER: {
		isFetching: false,
		errorFetching: false,
		errorMsg: "",
		lastSrcLocation: "",
		businesses: [
			{
				"name": "Four Barrel Coffee",
				"image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
				"location": {
					"city": "San Francisco",
					"country": "US",
					"address2": "",
					"address3": "",
					"state": "CA",
					"address1": "375 Valencia St",
					"zip_code": "94103"
				}
			}
		]
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

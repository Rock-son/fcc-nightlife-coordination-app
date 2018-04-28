"use strict";

export default {
	INITIAL_AUTH_STATE: {
		authenticated: false,
		openDialog: false
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
		businesses: [{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			tips: [{
				agreeCount: 9,
				canonicalUrl: "https://foursquare.com/item/5086458de4b07645f1beedad",
				createdAt: 1350976909,
				disagreeCount: 0,
				id: "5086458de4b07645f1beedad",
				likes: {
					count: 8,
					groups: [],
					summary: "8 likes"
				},
				logView: true,
				text: "A no brainer to enjoy an excellent night with some friends, without spending a fortune. Beware, the bar is often very crowded, book a table!",
				todo: {
					count: 1
				},
				type: "user",
				user: {
					id: "34655409",
					firstName: "Paris by wine",
					gender: "none",
					photo: {},
					type: "page"
				}
			}],
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941731",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: true,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be1",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Cheap",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: true,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be2",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Moderate",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			tips: [{
				agreeCount: 9,
				canonicalUrl: "https://foursquare.com/item/5086458de4b07645f1beedad",
				createdAt: 1350976909,
				disagreeCount: 0,
				id: "5086458de4b07645f1beedad",
				logView: true,
				text: "A no brainer to enjoy an excellent night with some friends, without spending a fortune. Beware, the bar is often very crowded, book a table!",
				todo: {
					count: 1
				},
				type: "user",
				user: {
					id: "34655409",
					firstName: "Paris by wine",
					gender: "none",
					photo: {},
					type: "page"
				}
			}],
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941733",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: false,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be3",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Cheap",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941734",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				id: "4b68a117f964a520c8832be4",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Expensive",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			tips: [{
				agreeCount: 9,
				canonicalUrl: "https://foursquare.com/item/5086458de4b07645f1beedad",
				createdAt: 1350976909,
				disagreeCount: 0,
				id: "5086458de4b07645f1beedad",
				likes: {
					count: 8,
					groups: [],
					summary: "8 likes"
				},
				logView: true,
				text: "A no brainer to enjoy an excellent night with some friends, without spending a fortune. Beware, the bar is often very crowded, book a table!",
				todo: {
					count: 1
				},
				type: "user",
				user: {
					id: "34655409",
					firstName: "Paris by wine",
					gender: "none",
					photo: {},
					type: "page"
				}
			}],
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941735",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: true,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be5",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Moderate",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			tips: [{
				agreeCount: 9,
				canonicalUrl: "https://foursquare.com/item/5086458de4b07645f1beedad",
				createdAt: 1350976909,
				disagreeCount: 0,
				id: "5086458de4b07645f1beedad",
				likes: {
					count: 8,
					groups: [],
					summary: "8 likes"
				},
				logView: true,
				text: "A no brainer to enjoy an excellent night with some friends, without spending a fortune. Beware, the bar is often very crowded, book a table!",
				todo: {
					count: 1
				},
				type: "user",
				user: {
					id: "34655409",
					firstName: "Paris by wine",
					gender: "none",
					photo: {},
					type: "page"
				}
			}],
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941736",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: true,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be6",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Moderate",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		},
		{
			reasons: {},
			referralId: "e-4-4b68a117f964a520c8832be3-0",
			tips: [{
				agreeCount: 9,
				canonicalUrl: "https://foursquare.com/item/5086458de4b07645f1beedad",
				createdAt: 1350976909,
				disagreeCount: 0,
				id: "5086458de4b07645f1beedad",
				likes: {
					count: 8,
					groups: [],
					summary: "8 likes"
				},
				logView: true,
				text: "A no brainer to enjoy an excellent night with some friends, without spending a fortune. Beware, the bar is often very crowded, book a table!",
				todo: {
					count: 1
				},
				type: "user",
				user: {
					id: "34655409",
					firstName: "Paris by wine",
					gender: "none",
					photo: {},
					type: "page"
				}
			}],
			venue: {
				allowMenuUrlEdit: true,
				beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
				categories: [{
					icon: {
						prefix: "https://ss3.4sqi.net/img/categories_v2/food/winery_",
						suffix: ".png"
					},
					id: "4bf58dd8d48988d123941737",
					name: "Wine Bar",
					pluralName: "Wine Bars",
					primary: true,
					shortName: "Wine Bar"
				}],
				contact: {
					phone: "+33148045759",
					formattedPhone: "+33 1 48 04 57 59",
					facebook: "158634264155651",
					facebookName: "Le Barav"
				},
				featuredPhotos: {
					count: 1,
					items: [{
						createdAt: 1380385747,
						height: 720,
						id: "524703d311d23c6132c7e400",
						prefix: "https://igx.4sqi.net/img/general/",
						suffix: "/9073671_cUjq5JBYBfd_2-o1urUANDZ4yQCRveOmf5tAmXHFouM.jpg",
						user: {
							id: "9073671",
							firstName: "archiguy",
							lastName: "archiguy",
							gender: "male",
							photo: {}
						},
						visibility: "public",
						width: 960
					}]
				},
				hereNow: { count: 0, summary: "Nobody here", groups: [] },
				hours: {
					status: "Open until Midnight",
					richStatus: {},
					isOpen: true,
					isLocalHoliday: false
				},
				id: "4b68a117f964a520c8832be7",
				location: {
					address: "6 rue Charles-François Dupuis",
					cc: "FR",
					city: "Paris",
					country: "France",
					crossStreet: "Rue de la Corderie",
					formattedAddress: [
						"6 rue Charles-François Dupuis (Rue de la Corderie)",
						"75003 Paris",
						"France"
					],
					labeledLatLngs: [{
						label: "display",
						lat: 48.86516646209463,
						lng: 2.363154888153076
					}],
					lat: 48.86516646209463,
					lng: 2.363154888153076,
					postalCode: "75003",
					state: "Île-de-France"
				},
				menu: {
					type: "Menu",
					label: "Menu",
					anchor: "View Menu",
					url: "https://www.lebarav.fr/menu.html",
					mobileUrl: "https://www.lebarav.fr/menu.html"
				},
				name: "Le Barav",
				photos: { count: 1, groups: [] },
				price: {
					tier: 2,
					message: "Cheap",
					currency: "€"
				},
				rating: 9.5,
				ratingColor: "00B551",
				ratingSignals: 352,
				stats: {
					tipCount: 83,
					usersCount: 1416,
					checkinsCount: 2398
				},
				url: "http://lebarav.fr",
				verified: false
			}
		}]
	}
};

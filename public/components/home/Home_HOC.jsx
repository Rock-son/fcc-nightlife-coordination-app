"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import Navbar from "Navbar";
import Footer from "Footer";
import Content from "Content";
import "../../style/Home/index";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(/* error, info */) {
		// Display fallback UI
		this.setState({ hasError: true });
	}
	/* eslint-disable react/jsx-indent-props */
	render() {
		return (
			<div>
				<Navbar
					authState={this.props.auth}
					openLoginDialog={this.props.openLoginDialog}
					isRegistering={this.props.isRegistering}
					login={this.props.login}
					logout={this.props.logout}
				/>
				<Content
					authState={this.props.auth}
					barState={this.props.bar}
					goState={this.props.go}
					search={this.props.search}
					goingReset={this.props.goingReset}
					going={this.props.going}
					notGoing={this.props.notGoing}
					openLoginDialog={this.props.openLoginDialog}
					renderLocation={this.props.renderLocation}
					locationInput={this.props.locationInput}
					error={this.state.hasError}
				/>
				<Footer />
			</div>
		);
	}
}
/* eslint-enable */
Home.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	bar: PropTypes.instanceOf(Object).isRequired,
	go: PropTypes.instanceOf(Object).isRequired,
	// DISPATCH FUNCTIONS
	// LOGIN
	openLoginDialog: PropTypes.func,
	isRegistering: PropTypes.func,
	login: PropTypes.func,
	logout: PropTypes.func,
	// GOING
	goingReset: PropTypes.func,
	going: PropTypes.func,
	notGoing: PropTypes.func,
	// LOCATION
	locationInput: PropTypes.func,
	renderLocation: PropTypes.func,
	// SEARCH
	search: PropTypes.func
};

Home.defaultProps = {
	openLoginDialog: () => false,
	isRegistering: () => false,
	login: () => {},
	logout: () => true,
	goingReset: () => "",
	going: () => ({ city: "", id: "", user: "" }),
	notGoing: () => ({ city: "", id: "", user: "" }),
	locationInput: () => "",
	renderLocation: () => "",
	search: () => {}
};

export default hot(module)(Home);

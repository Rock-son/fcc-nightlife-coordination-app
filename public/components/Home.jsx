"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import Navbar from "Navbar";
import Footer from "Footer";
import Content from "Content";

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
	render() {
		return (
			<div>
				<Navbar authState={this.props.auth} openLoginDialog={this.props.openLoginDialog} login={this.props.login} logout={this.props.logout} />
				<Content barState={this.props.bar} goState={this.props.go} search={this.props.search} going={this.props.going} notGoing={this.props.notGoing} renderLocation={this.props.renderLocation} locationInput={this.props.locationInput} error={this.state.hasError} />
				<Footer />
			</div>
		);
	}
}

Home.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	bar: PropTypes.instanceOf(Object).isRequired,
	go: PropTypes.instanceOf(Object).isRequired,
	// DISPATCH FUNCTIONS
	// LOGIN
	openLoginDialog: PropTypes.func.isRequired,
	login: PropTypes.func,
	logout: PropTypes.func,
	// GOING
	going: PropTypes.func,
	notGoing: PropTypes.func,
	// LOCATION
	locationInput: PropTypes.func,
	renderLocation: PropTypes.func,
	// SEARCH
	search: PropTypes.func
};

Home.defaultProps = {
	login: () => true,
	logout: () => true,
	going: () => ({ city: "", id: "", user: "" }),
	notGoing: () => ({ city: "", id: "", user: "" }),
	locationInput: () => "",
	renderLocation: () => "",
	search: () => {}
};

export default hot(module)(Home);

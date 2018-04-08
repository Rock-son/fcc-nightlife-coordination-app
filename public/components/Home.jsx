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

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
	}
	render() {
		return (
			<div>
				<Navbar auth={this.props.auth} login={this.props.login} logout={this.props.logout} />
				<Content bar={this.props.bar} search={this.props.search} error={this.state.hasError} />
				<Footer />
			</div>
		);
	}
}

Home.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	bar: PropTypes.instanceOf(Object).isRequired,
	// DISPATCHED FUNCTIONS
	login: PropTypes.func,
	logout: PropTypes.func,
	search: PropTypes.func
};

Home.defaultProps = {
	login: () => true,
	logout: () => true,
	search: () => {}
};

export default hot(module)(Home);

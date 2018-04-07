"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Navbar from "Navbar";
import Footer from "Footer";
import Content from "Content";


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
		if (this.state.hasError) {
			return (
				<div>
					<Navbar auth={this.props.auth} login={this.props.login} logout={this.props.logout} />
					<Content bar={this.props.bar} search={this.props.search} error={this.state.hasError} />
					<Footer />
				</div>
			);
		}
		return (
			<div>
				<Navbar auth={this.props.auth} login={this.props.login} logout={this.props.logout} />
				<Content bar={this.props.bar} search={this.props.search} error={false} />
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

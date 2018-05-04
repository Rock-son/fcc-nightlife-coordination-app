"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import Navbar from "Navbar";
import Register from "Register";
import Footer from "Footer";
import css from "../../style/Login/index";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Register_HOC extends React.Component {
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
				<Register authState={this.props.auth} login={this.props.login} register={this.props.register} error={this.state.hasError} />
				<Footer />
			</div>
		);
	}
}

Register_HOC.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	// DISPATCH FUNCTIONS - LOGIN
	openLoginDialog: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	logout: PropTypes.func
};

Register_HOC.defaultProps = {
	openLoginDialog: () => false,
	login: () => {},
	register: () => true,
	logout: () => true
};

export default hot(module)(Register_HOC);

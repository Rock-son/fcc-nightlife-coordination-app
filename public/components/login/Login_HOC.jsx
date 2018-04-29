"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import Navbar from "Navbar";
import Login from "Login";
import Footer from "Footer";
import css from "../../style/Login/index";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Login_HOC extends React.Component {
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
				<Navbar authState={this.props.auth} openLoginDialog={this.props.openLoginDialog} isRegistering={this.props.isRegistering} login={this.props.login} logout={this.props.logout} />
				<Login authState={this.props.auth} login={this.props.login} register={this.props.register} isRegistering={this.props.isRegistering} error={this.state.hasError} />
				<Footer />
			</div>
		);
	}
}

Login_HOC.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	// DISPATCH FUNCTIONS - LOGIN
	openLoginDialog: PropTypes.func,
	isRegistering: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	logout: PropTypes.func
};

Login_HOC.defaultProps = {
	openLoginDialog: () => false,
	isRegistering: () => false,
	login: () => {},
	register: () => true,
	logout: () => true
};

export default hot(module)(Login_HOC);

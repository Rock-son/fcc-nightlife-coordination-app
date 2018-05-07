"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";
import { whyDidYouUpdate } from "why-did-you-update";

import Navbar from "Navbar";
import Login from "Login";
import Footer from "Footer";
import "../../style/Login/index";

if (process.env.NODE_ENV !== 'production') {
	whyDidYouUpdate(React);
}


class Login_HOC extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}
	/* GET URL
	componentDidMount() {
		if (this.props.location.pathname === "/signup") {
			this.props.isRegistering(true);
		}
	}
	*/
	componentDidCatch(/* error, info */) {
		// Display fallback UI
		this.setState({ hasError: true });
	}
	render() {
		return (
			<div>
				<Navbar authState={this.props.auth} openLoginDialog={this.props.openLoginDialog} login={this.props.login} logout={this.props.logout} />
				<Login authState={this.props.auth} login={this.props.login} localLogin={this.props.localLogin} error={this.state.hasError} openLoginDialog={this.props.openLoginDialog} />
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
	login: PropTypes.func,
	localLogin: PropTypes.func,
	logout: PropTypes.func
};

Login_HOC.defaultProps = {
	openLoginDialog: () => false,
	login: () => {},
	localLogin: () => {},
	logout: () => true
};

export default hot(module)(Login_HOC);

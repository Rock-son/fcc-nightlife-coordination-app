"use strict";

import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "Navbar";
import { Footer } from "Footer";
import { Content } from "Content";


export class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<Navbar auth={this.props.auth} login={this.props._login} logout={this.props._logout} />
				<Content />
				<Footer />
			</div>
		);
	}
}

Home.propTypes = {

	auth: PropTypes.object,
	_login: PropTypes.func,
	_logout: PropTypes.func
};
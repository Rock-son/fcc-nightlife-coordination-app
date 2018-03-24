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
				<Content bars={this.props.bars} getBars={this.props._getBarsOnLocation} />
				<Footer />
			</div>
		);
	}
}

Home.propTypes = {
	
	// REDUCERS
	auth: PropTypes.object,
	bars: PropTypes.object,
	// DISPATCHED FUNCTIONS
	_login: PropTypes.func,
	_logout: PropTypes.func,
	_getBarsOnLocation: PropTypes.func
};
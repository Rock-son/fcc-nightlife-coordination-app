"use strict";

import React from "react";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader";

import Navbar from "Navbar";
import Footer from "Footer";
import Content from "Content";


function Home(props) {
	return (
		<div>
			<Navbar auth={props.auth} login={props.login} logout={props.logout} />
			<Content bars={props.bars} getBars={props.getBarsOnLocation} />
			<Footer />
		</div>
	);
}

Home.propTypes = {
	// REDUCERS
	auth: PropTypes.instanceOf(Object).isRequired,
	bars: PropTypes.instanceOf(Object).isRequired,
	// DISPATCHED FUNCTIONS
	login: PropTypes.func,
	logout: PropTypes.func,
	getBarsOnLocation: PropTypes.func
};

Home.defaultProps = {
	login: () => true,
	logout: () => true,
	getBarsOnLocation: () => {}
};

export default hot(module)(Home);

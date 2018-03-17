"use strict";

import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "Navbar";
import { Footer } from "Footer";

//import PropTypes from "prop-types";

export class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		
		return (
			<div>
				<Navbar state={this.props} />
				<Footer />
			</div>
		);
	}
}

Main.propTypes = {

	state: PropTypes.object
};
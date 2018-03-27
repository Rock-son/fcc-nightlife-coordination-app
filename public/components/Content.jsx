"use strict";

import React from "react";
import PropTypes from "prop-types";
// import { LOGIN, LOGOUT } from "StateVariables";


export default class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: "" };
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleSearch() {
		this.props.getBars(this.state.input);
	}

	handleInput(e) {
		this.setState({ input: e.target.value });
	}

	render() {
		const responseImg = "./assets/images/pexels-photo-260920.jpeg 640w, ./assets/images/pexels-photo-260921.jpeg 1280w, ./assets/images/pexels-photo-260922.jpeg 1920w";

		return (
			<section className="content">
				<img className="content__hero" srcSet={responseImg} alt="barcle" />
				<article className="content__main">
					<h2 className="content__main__header">Ready for a party night out?</h2>
					<div className="content__main__img-container">
						<i className="fa fa-thumbs-up content__main__img-container__img" />
						<i className="fa fa-glass content__main__img-container__img" />
						<i className="fa fa-coffee content__main__img-container__img" />
						<i className="fa fa-beer content__main__img-container__img" />
					</div>
					<input className="content__main__searchbar" onChange={this.handleInput} type="text" size="50" placeholder="Where are you at?" />
					<button className="content__main__search-button" onClick={this.handleSearch}>Search</button>
				</article>
				{Object.keys(this.props.bars).map((key, index) => <article key={index.toString()} className="content__results">{this.props.bars[key]}</article>)}
			</section>
		);
	}
}

Content.propTypes = {

	getBars: PropTypes.func.isRequired,
	bars: PropTypes.instanceOf(Object).isRequired
};


"use strict";

import React from "react";
import PropTypes from "prop-types";
import { LOGIN, LOGOUT } from "StateVariables";


export class Content extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: ""};
		this._handleSearch = this._handleSearch.bind(this);
		this._handleInput = this._handleInput.bind(this);
	}

	_handleSearch() {
		this.props.getBars(this.state.input);
	}

	_handleInput(e) {
		this.setState({ input: e.target.value });
	}

	render() {
		
		return (
			<section className="content">
				<img className="content__hero" srcSet="../public/assets/images/pexels-photo-260920.jpeg 640w, ../public/assets/images/pexels-photo-260921.jpeg 1280w, ../public/assets/images/pexels-photo-260922.jpeg 1920w" alt="barcle"/>
				<article className="content__main">
					<h2 className="content__main__header">Ready for a party night out?</h2>
					<div className="content__main__img-container">
						<i className="fa fa-thumbs-up content__main__img-container__img"></i>
						<i className="fa fa-glass content__main__img-container__img"></i>
						<i className="fa fa-coffee content__main__img-container__img"></i>
						<i className="fa fa-beer content__main__img-container__img"></i>
					</div>
					<input className="content__main__searchbar" onChange={this._handleInput} type="text" size="50" placeholder="Where are you at?"/>
					<button className="content__main__search-button" onClick={this._handleSearch}>Search</button>
				</article>
				{Object.keys(this.props.bars).map( (key, index) => <article key={index} className="content__results">{this.props.bars[key]}</article>)}
			</section>
		);
	}
}

Content.propTypes = {

	getBars: PropTypes.func,
	bars: PropTypes.object
};
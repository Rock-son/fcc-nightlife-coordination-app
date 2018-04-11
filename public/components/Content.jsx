"use strict";

import React from "react";
import PropTypes from "prop-types";


const defaultMenuObj = { url: "" };
const defaultHoursObj = { isOpen: false, status: "" };
const defaultPriceObj = { message: "Moderate", currency: "/" };
const defaultTipsArray = [{ text: "", user: { firstName: "" }, canonicalUrl: ""}];
const defaultCountObj = { count: 0 };
const defaultCategoryArray = [{ name: "No category" }];
const defaultContactObj = { phone: "", facebook: "" };
const defaultStatsObj = { tipCount: 0, usersCount: 0, checkinsCount: 0 };

export default class Content extends React.PureComponent {
	constructor(props) {
		super(props);
		this.input = "";
		this.searchBtn = React.createRef();
		this.textInput = React.createRef();

		this.handleEnterPress = this.handleEnterPress.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	componentDidMount() {
		this.textInput.current.focus();
	}

	handleEnterPress(e) {
		if (e.keyCode === 13) {
			this.searchBtn.current.click();
		}
	}
	handleSearch(e) {
		e.preventDefault();
		this.props.search(this.input);
	}

	handleInput(e) {
		e.preventDefault();
		this.input = e.target.value;
	}

	render() {
		const responseImg = "./assets/images/pexels-photo-260920.jpeg 640w, ./assets/images/pexels-photo-260921.jpeg 1280w, ./assets/images/pexels-photo-260922.jpeg 1920w";

		return (
			<section className="content">
				<img className="content__hero" srcSet={responseImg} alt="barcle" />
				<article className="content__search">
					<h2 className="content__search__header">Ready for a party night out?</h2>
					<div className="content__search__img-container">
						<i className="fa fa-thumbs-up content__search__img-container__img" />
						<i className="fa fa-glass content__search__img-container__img" />
						<i className="fa fa-coffee content__search__img-container__img" />
						<i className="fa fa-beer content__search__img-container__img" />
					</div>
					<div className="content__search__input-container">
						<input type="text" ref={this.textInput} className="content__search__input-container__input" name="location" size="50" onChange={this.handleInput} onKeyUp={this.handleEnterPress} placeholder="Where are you at?" />
						<button type="button" ref={this.searchBtn} className="content__search__input-container__button" onClick={this.handleSearch} >
							{this.props.bar.isFetching ? (<i className="fa fa-spinner fa-spin content__search__input-container__spinner" />) : "Search"}
						</button>
					</div>
					<a className="content__search__foursquare" href="https://foursquare.com/" target="_blank" rel="noreferrer noopener" >Powered by{" "}
						<i className="fa fa-foursquare" >OURSQUARE</i>
					</a>
				</article>
				<article className="content__cards">
					{/* ******************************************************* SEARCH RESULTS ********************************************************* */}
					{(this.props.error || this.props.bar.errorFetching) ?
						(<h2 className="content__cards__error">{this.props.bar.errorMsg || "Something went wrong, please try again later!"}</h2>) :

						(this.props.bar.businesses.map((business) => {
							let container = null;

							if (business) {
								try {
									const imagePath = `${business.venue.featuredPhotos.items[0].prefix}350x200${business.venue.featuredPhotos.items[0].suffix}`;
									const ratingColorStyle = { backgroundColor: `#${business.venue.ratingColor}` };
									const ratingCount = business.venue.ratingSignals;
									const { text: tip, user: { firstName: user }, canonicalUrl: fsqUrl } = (business.tips || defaultTipsArray)[0];
									const { count } = (business.tips || defaultTipsArray)[0].likes || defaultCountObj;
									const { name: category } = (business.venue.categories || defaultCategoryArray)[0];
									const { phone, facebook: fbNr } = business.venue.contact || defaultContactObj;
									const { url: menuUrl } = business.venue.menu || defaultMenuObj;
									const { isOpen, status } = business.venue.hours || defaultHoursObj;
									const { currency, message } = business.venue.price || defaultPriceObj;
									const { tipCount: tips, usersCount: users, checkinsCount: checkins } = business.venue.stats || defaultStatsObj;
									const { url: website, name: venueName, location: { address, city, country } } = business.venue;
									const formattedAddress = `${address} ${city} ${country}`;

									container = (
										<div key={business.venue.id} className="content__cards__card" >
											<div className="content__cards__card__header" >
												<div className="content__cards__card__header__container">
													<a className="content__cards__card__header__container__name" href={website} target="_blank" rel="noreferrer noopener" >{venueName}</a>
													<div className="content__cards__card__header__container__rating" data={`${message} - ${currency}`} title={`${ratingCount} votes`} style={ratingColorStyle}>{business.venue.rating}</div>
												</div>
												<a className="content__cards__card__header__address" href={`https://www.google.com/maps/place/${formattedAddress}`} target="_blank" rel="noreferrer noopener" >{address}</a>
											</div>
											<div className="content__cards__card__body" >
												<div style={{ display: "block" }}>
													<div className="content__cards__card__body__category">{category}</div>
													<div className={`content__cards__card__body__hours${isOpen ? "-open" : "-closed"}`} title={status || "No data!"} >{`${isOpen ? "open" : "closed"}`}</div>
												</div>
												<a href={fsqUrl} target="_blank" rel="noreferrer noopener" >
													<img src={imagePath} className="content__cards__card__body__image" alt={venueName} title="CONTINUE TO FOURSQUARE" />
												</a>
												<div className="content__cards__card__body__special" >
													<a className={`content__cards__card__body__special__menu${menuUrl ? "" : "-no-show"}`} href={menuUrl} target="_blank" rel="noreferrer noopener" >Menu</a>
													<a className={`content__cards__card__body__special__fb${fbNr ? "" : "-no-show"}`} href={`https://facebook.com/${fbNr}`} target="_blank" rel="noreferrer noopener" >
														<i className="fa fa-facebook-square fa-2x" />
													</a>
													<div className="content__cards__card__body__special__phone1" style={phone ? ({ display: 'block' }) : ({ display: 'none' })}>Phone:</div>
													<a className="content__cards__card__body__special__phone2" href={`callto://${phone}`} target="_blank" rel="noreferrer noopener" >{phone}</a>
												</div>
												<div className="content__cards__card__body__underImage" >
													Tips: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#2d5be3" }} >{ tips}</span>
													, Users: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#0732a2" }} >{ users}</span>
													, Checkins: <span className="content__cards__card__body__underImage__item" style={{ backgroundColor: "#f94877" }} >{ checkins}</span>
												</div>
												<hr className="content__cards__card__body__line" />
											</div>
											<div className="content__cards__card__footer" >
												<div className="content__cards__card__footer__tip" >{tip || `${venueName} has no user tips yet.`}</div>
												<div className="content__cards__card__footer__user">
													<div className="content__cards__card__footer__user__txt" >{`- ${user || ""} (${count} `}</div>
													<i className="fa fa-thumbs-up content__cards__card__footer__user__txt" />
													<div className="content__cards__card__footer__user__txt"> )</div>
												</div>

											</div>
										</div>
									);
								} catch (error) {
									container = <div key={error} className="content__cards__card" >{`No data available! ${error}`}</div>;
								}
							}
							return container;
						}))
					}
				</article>
			</section>
		);
	}
}

Content.propTypes = {

	search: PropTypes.func.isRequired,
	bar: PropTypes.instanceOf(Object).isRequired,
	error: PropTypes.bool.isRequired
};


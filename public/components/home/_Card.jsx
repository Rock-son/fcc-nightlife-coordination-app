"use strict";

import React from "react";
import PropTypes from "prop-types";
import waypoints from "../../../node_modules/waypoints/lib/noframework.waypoints";

const defaultObj = {};
const defaultArray = [];
const defaultMenuObj = { url: "" };
const defaultHoursObj = { isOpen: undefined, status: "" };
const defaultPriceObj = { message: "Moderate", currency: "/" };
const defaultTipsArray = [{ text: "", user: { firstName: "" }, canonicalUrl: "" }];
const defaultCountObj = { count: 0 };
const defaultCategoryArray = [{ name: "No category" }];
const defaultContactObj = { phone: "", facebook: "" };
const defaultStatsObj = { tipCount: 0, usersCount: 0, checkinsCount: 0 };


export default class Card extends React.Component {
	constructor(props) {
		super(props);
		this.container = null;
		this.element = React.createRef();
		this.handleGoing = this.handleGoing.bind(this);
	}

	componentDidMount() {
		const element = this.element.current;
		new Waypoint({
			element,
			handler: () => element.setAttribute("class", "content__cards__card reveal-item--is-visible"),
			offset: "65%"
		});
	}

	shouldComponentUpdate(nextProps) {
		// check if the bar's users stay the same or not
		if ((nextProps.barObj.bar && !this.props.barObj.bar) || (!nextProps.barObj.bar && this.props.barObj.bar)) {
			return true;
		} else if (nextProps.barObj.bar && this.props.barObj.bar) {
			return this.props.barObj.bar.users.length !== nextProps.barObj.bar.users.length;
		}
		return false;
	}

	handleGoing(e) {
		const city = e.currentTarget.getAttribute("data-city");
		const id = e.currentTarget.getAttribute("data-id");

		if ((e.keyCode || 0) === 13 || e.type === "click") {
			if (e.target.getAttribute("data-go").indexOf("no_go") > -1) {
				this.props.notGoing(city, id);
			} else {
				this.props.going(city, id);
			}
		}
	}
	render() {
		try {
			const imagePath = `${this.props.business.venue.featuredPhotos.items[0].prefix}350x200${this.props.business.venue.featuredPhotos.items[0].suffix}`;
			const ratingColorStyle = { backgroundColor: `#${this.props.business.venue.ratingColor}` };
			const ratingCount = this.props.business.venue.ratingSignals;

			const { text: tip, user: { firstName: user }, canonicalUrl: fsqUrl } = (this.props.business.tips || defaultTipsArray)[0];
			const { count } = (this.props.business.tips || defaultTipsArray)[0].likes || defaultCountObj;
			const { name: category } = (this.props.business.venue.categories || defaultCategoryArray)[0];
			const { phone, facebook: fbNr } = this.props.business.venue.contact || defaultContactObj;
			const { url: menuUrl } = this.props.business.venue.menu || defaultMenuObj;
			const { isOpen, status } = this.props.business.venue.hours || defaultHoursObj;
			const { currency, message } = this.props.business.venue.price || defaultPriceObj;
			const { tipCount: tips, usersCount: users, checkinsCount: checkins } = this.props.business.venue.stats || defaultStatsObj;
			const { id: businessID,	url: website, name: venueName } = this.props.business.venue;
			const { location: { address, city, country } } = this.props.business.venue;

			const formattedAddress = `${address} ${city} ${country}`;
			// handling going logic
			const barUsers = ((this.props.barObj || defaultObj).bar || defaultObj).users || defaultArray;
			const nrUsers = barUsers.length;
			const isGoing = barUsers.indexOf(this.props.authState.user) > -1;
			const classGoing = nrUsers ? "some" : "none";
			const usersGoingTitle = nrUsers ? barUsers.join("\n") : "0 going";
			const nrGoing = nrUsers.toString().concat(" going");
			const isActive = isGoing ? "active" : "";

			const formattedIsOpen = (() => {
				if (isOpen) {
					return "open";
				} else if (isOpen == null) {
					return "no-data";
				}
				return "closed";
			})();

			this.container = (
				<div className="content__cards__card reveal-item" ref={this.element} style={nrUsers ? { boxShadow: "-1px 1px 25px #21ef0e" } : {}} >
					<div className="content__cards__card__header" >
						<div className="content__cards__card__header__container">
							<a className="content__cards__card__header__container__name" href={website} target="_blank" rel="noreferrer noopener" >{venueName}</a>
							<div className="content__cards__card__header__container__rating" data={`${message} - ${currency}`} title={`${ratingCount} votes`} style={ratingColorStyle}>{this.props.business.venue.rating}</div>
						</div>
						<a className="content__cards__card__header__address" href={`https://www.google.com/maps/place/${formattedAddress}`} target="_blank" rel="noreferrer noopener" >{address}</a>
					</div>
					<div className="content__cards__card__body" >
						<div style={{ display: "block", paddingBottom: "1px" }}>
							<div className="content__cards__card__body__category">{category}</div>
							<div className={`content__cards__card__body__hours ${formattedIsOpen}`} title={status || "No data"} >{`${formattedIsOpen.replace("-", " ")}`}</div>
							<div className={`content__cards__card__body__going ${classGoing}`} title={usersGoingTitle} >{nrGoing}</div>
						</div>
						<a href={fsqUrl} target="_blank" rel="noreferrer noopener" >
							<img data-src={imagePath} className="content__cards__card__body__image lazyload" alt={venueName} title="CONTINUE TO FOURSQUARE" />
						</a>
						<div className="content__cards__card__body__special" >
							<a className={`content__cards__card__body__special__menu${menuUrl ? "" : "-no-show"}`} href={menuUrl} target="_blank" rel="noreferrer noopener" >Menu</a>
							<a className={`content__cards__card__body__special__fb${fbNr ? "" : "-no-show"}`} href={`https://facebook.com/${fbNr}`} target="_blank" rel="noreferrer noopener" >
								<i className="fa fa-facebook-square fa-2x" />
							</a>
							<div className="content__cards__card__body__special__phone1" style={phone ? ({ display: 'block' }) : ({ display: 'none' })} >Phone:</div>
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
							<div className="content__cards__card__footer__user__txt"> {")"}</div>
						</div>
					</div>
					<div className={`content__cards__card__footer__checkBox ${isActive}`} >
						<div data-go="go" data-city={city} data-id={businessID} role="button" tabIndex={0} className={`content__cards__card__footer__checkBox__btn go ${isActive}`} onClick={this.handleGoing} onKeyUp={this.handleGoing} />
						<div data-go="go" data-city={city} data-id={businessID} role="button" tabIndex={0} className={`content__cards__card__footer__checkBox__label go ${isActive}`} onClick={this.handleGoing} onKeyUp={this.handleGoing} >Going</div>
						<div data-go="no_go" data-city={city} data-id={businessID} role="button" tabIndex={0} className={`content__cards__card__footer__checkBox__btn nogo ${isActive}`} onClick={this.handleGoing} onKeyUp={this.handleGoing} />
						<div data-go="no_go" data-city={city} data-id={businessID} role="button" tabIndex={0} className={`content__cards__card__footer__checkBox__label nogo ${isActive}`} onClick={this.handleGoing} onKeyUp={this.handleGoing} >Not Going</div>
					</div>
				</div>
			);
		} catch (error) {
			this.container = <div key={error} className="content__cards__card" >{`No data available! (${error})`}</div>;
		}
		return this.container;
	}
}

Card.propTypes = {
	// STATES
	authState: PropTypes.instanceOf(Object).isRequired,
	business: PropTypes.instanceOf(Object).isRequired,
	// DISPATCHED FUNCTIONS
	going: PropTypes.func.isRequired,
	notGoing: PropTypes.func.isRequired,
	barObj: PropTypes.instanceOf(Object)
};

Card.defaultProps = {
	barObj: {}
};

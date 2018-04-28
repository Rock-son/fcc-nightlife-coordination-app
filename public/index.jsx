"use strict";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import rootReducer from "RootReducer";
import Home from "App";
import css from "./style/index";

// TODO: CHECK IF PRODUCTION!!

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

ReactDOM.render(
	<Provider store={createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)))}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={Home} />
				<Route exact path="/signup" component={Home} />
				<Redirect path="*" to="/" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);/* eslint-enable */

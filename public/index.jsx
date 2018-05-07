"use strict";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import rootReducer from "RootReducer";
import Home from "Home_MapState";
import Login from "Login_MapState";
import Register from "Register_MapState";
import { DISPATCH_GET_USER } from "ActionCreators";

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));


store.dispatch(DISPATCH_GET_USER());

// TODO: CHECK IF PRODUCTION - put out loggerMiddleware
ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signin" component={Login} />
				<Route exact path="/signup" component={Register} />
				<Redirect path="*" to="/" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);

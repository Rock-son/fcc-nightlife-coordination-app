"use strict";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import rootReducer from "RootReducer";
import Home from "App";
import css from "./style/index";

/* eslint-disable no-underscore-dangle */
ReactDOM.render(
	<Provider store={createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Redirect path="*" to="/" />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("root")
);/* eslint-enable */

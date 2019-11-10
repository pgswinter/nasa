import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from "react-redux";
import { Route } from "react-router-dom";
import {
    Switch,
} from "react-router-dom";
import routerConfig from "./configs/router";

import {
    HomePageLoader
} from './loadable';

import './styles/index.less';
import './styles/fontawesome/css/all.css';
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <Switch>
                    <Route
                        path={routerConfig["home"]}
                        exact
                        render={props => <HomePageLoader
                            {...props}
                        />}
                    />

                </Switch>
            </div>
        )
    }
}

export default App;
import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import MainPage from "./src/pages/0MainPage/index";
import InformationFillOut_B from "./src/pages/2BigBrother/1InfoFillOutPage";
import SplashScene from "./src/pages/0MainPage/SplashScene";
import LoginPage from "./src/pages/0MainPage/LoginPage";
import InitialBFPage from "./src/pages/0MainPage/InitialBFPage";
import GuideScene from "./src/pages/0MainPage/GuideScene";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <GuideScene/>
                {/*<InitialBFPage/>*/}
                {/*<LoginPage/>*/}
                {/*<SplashScene/>*/}
                {/*<MainPage/>*/}
                {/*<InformationFillOut_B/>*/}
            </View>
        );
    }
}

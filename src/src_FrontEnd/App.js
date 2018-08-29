import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';


import MainPage from "./src/pages/0MainPage/index";

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <MainPage/>
            </View>
        );
    }
}

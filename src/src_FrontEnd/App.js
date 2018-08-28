import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';


import TabBar from "./src/components/TabBar";

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TabBar/>
            </View>
        );
    }
}

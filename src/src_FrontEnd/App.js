import React, {Component} from 'react';
import {
    View
} from 'react-native'
import {SamplePage} from './src/pages/SamplePage/index';

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <SamplePage/>
            </View>
        );
    }
}
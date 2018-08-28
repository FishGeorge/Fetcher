/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ChooseArea from './ChooseArea';

type Props = {};
export default class FetcherHost extends Component<Props> {
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={styles.red}>开始接单</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'ChooseArea',
                component:ChooseArea,
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
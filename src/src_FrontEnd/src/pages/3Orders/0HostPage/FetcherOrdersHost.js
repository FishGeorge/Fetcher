/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FetcherOrderComplete from "../1Fetcher_OrderCompletePage/index";

type Props = {};
export default class FetcherOrdersHost extends Component<Props> {
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={{fontSize:40}}>跳转</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'FetcherOrderComplete',
                component:FetcherOrderComplete,
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:30,
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
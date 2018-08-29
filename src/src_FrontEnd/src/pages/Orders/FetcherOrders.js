/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};
export default class FetcherOrders extends Component<Props> {
    render(){
        return(
            <View style={styles.container}>
                    <Text>Fetcher订单</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop:30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
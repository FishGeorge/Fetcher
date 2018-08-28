/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView} from 'react-native';

type Props = {};
export default class BigBrotherHost extends Component<Props> {
    render() {
        return (
            <View>
                <ScrollView style={styles.scrollViewStyle}
                            horizontal={true}>
                    {this.renderItem()}
                </ScrollView>
            </View>
        );
    }

    renderItem() {
        // 数组
        var itemAry = [];
        // 颜色数组
        var colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
        // 遍历
        for (var i = 0; i<colorAry.length; i++) {
            itemAry.push(
                <View key={i} style={[styles.itemStyle, {backgroundColor: colorAry[i]}]}></View>
            );
        }
        return itemAry;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    top: {

    },
    scrollViewStyle: {
        backgroundColor:'red'
    },
    itemStyle: {
        // 尺寸
        width:1000,
        height:200
    },
});
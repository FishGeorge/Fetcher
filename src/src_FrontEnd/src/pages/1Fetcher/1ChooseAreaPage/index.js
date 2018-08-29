/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Fetcher_InfoFillOut from '../2InfoFillOutPage/index';
import {Constants} from "../../../common/Constants";

type Props = {};
var Img = require('../../../pic/icon_return.png');

export default class FetcherHost extends Component<Props> {
    _goBack() {
        //获取SampleComponent中创建的Navigator对象
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        //这里对navigator进行了判断  如果navigator(导航器)对象存在的情况下 在进行操作
        if (navigator) {
            navigator.pop();
        }
    }

    render(){
        return(
            <View style={styles.btn}>
                <TouchableOpacity onPress={this._goBack.bind(this)}
                                  style={styles.goback}>
                    <Image source={Img}/>
                </TouchableOpacity>
                <View style={styles.container}>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={styles.button}>地区1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={styles.button}>地区2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={styles.button}>地区3
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'Fetcher_InfoFillOut',
                component:Fetcher_InfoFillOut,
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'center',
    },
    goback:{
        flexDirection:'row',
        alignItems:'center',
    },
    btn:{
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    button: {
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
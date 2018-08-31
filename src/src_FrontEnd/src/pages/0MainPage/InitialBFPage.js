/**
 *
 * 初始分流页用户选择Fetcher或者BigBrother
 * Created by ChenYue on 2018/08/30.
 *
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import Screen from '../../utils/Screen'

//class loginView extends Component {
type Props = {};
export default class InitialBFPage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                {/*//页面欢迎&提示文字*/}
                <View >
                    <Text style={styles.welcomeStyle}>欢迎！请选择您的身份：</Text>
                </View>

                {/*//点击选择Fetcher身份按钮*/}
                <TouchableOpacity onPress={()=>this.clickFButtonEvent()} style={styles.button}>
                    <Text style={styles.btText}>Fetcher</Text>
                </TouchableOpacity>

                {/*//点击选择Big Brother身份按钮*/}
                <TouchableOpacity
                    onPress={()=>this.clickBButtonEvent()}//绑定点击事件
                    style={styles.button}>
                    <Text style={styles.btText}>BigBrother</Text>
                </TouchableOpacity>
            </View>
        );
    }

    clickFButtonEvent(){
        ToastAndroid.show('欢迎你 Fetcher！',ToastAndroid.SHORT);
        //跳转至Fetcher页面
        //……
    }

    clickBButtonEvent(){
        ToastAndroid.show('欢迎你 BigBrother！',ToastAndroid.SHORT);
        //跳转至Big Brother特面
        //……
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    //欢迎文字风格
    welcomeStyle:{
        marginTop:50,
        marginBottom:50,
        fontWeight: 'bold',
        fontSize: 20
    },
    //按钮风格
    button: {
        marginTop:50,
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#66f',
        marginBottom: 8,
    },
    //按钮文字风格
    btText: {
        color: '#fff',
        fontSize:17,
        fontWeight:'bold'
    },
});
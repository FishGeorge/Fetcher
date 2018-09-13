import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import Screen from '../../utils/Screen'

export default class InitialBFPage extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {/*//页面欢迎&提示文字*/}
                <View style={{justifyContent: 'center', alignItems: 'center', height: 0.5 * Screen.height}}>
                    <Text style={styles.welcomeStyle}>您是第一次使用Fetcher</Text>
                    <Text style={styles.welcomeStyle}>请选择您的身份</Text>
                </View>

                {/*//点击选择Fetcher身份按钮*/}
                <TouchableOpacity
                    onPress={() => this._clickFetcherBtn()}
                    style={styles.button}>
                    <Text style={styles.btnText}>Fetcher</Text>
                </TouchableOpacity>

                {/*//点击选择BigBrother身份按钮*/}
                <TouchableOpacity
                    onPress={() => this._clickBigBBtn()}// 绑定点击事件
                    style={styles.button}>
                    <Text style={styles.btnText}>BigBrother</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 12, position: 'absolute', bottom: 10}}>初始分流页 Beta 版</Text>
            </View>
        );
    }

    _clickFetcherBtn() {
        ToastAndroid.show('欢迎你 Fetcher！', ToastAndroid.SHORT);
        // 跳转至Fetcher页面
        this._goMainPage("fetcher");
    }

    _clickBigBBtn() {
        ToastAndroid.show('欢迎你 BigBrother！', ToastAndroid.SHORT);
        // 跳转至Big Brother特面
        this._goMainPage("bigbrother");
    }

    _goMainPage(page) {
        // 记录
        storage.save({
            key: 'initialPage',
            data: page,
            expires: null
        });
        // 跳转Main
        this.props.navigation.navigate('Main', {select: page});
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
        width: Screen.width
    },
    //欢迎文字风格
    welcomeStyle: {
        fontWeight: 'bold',
        fontSize: 22
    },
    //按钮风格
    button: {
        marginBottom: 50,
        height: 0.075 * Screen.height,
        width: 0.9 * Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#FFC750',
    },
    //按钮文字风格
    btnText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
});
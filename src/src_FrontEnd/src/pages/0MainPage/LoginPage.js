import React, {Component} from 'react';
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
import ChooseArea from "../1Fetcher/1ChooseAreaPage";

const img_userName = require('../../pic/个人.png');

type Props = {};
export default class LoginPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Image source={require('./img/Logo.png')} style={styles.tgIconStyle}/>*/}
                <View style={styles.welcomeStyle}>
                    <Text>Welcome to Fetcher!</Text>
                </View>
                <View
                    style={styles.inputBox}>
                    <Image
                        style={styles.img}
                        source={img_userName}
                        //source={{uri: './image/个人.png'}}
                    />
                    <TextInput
                        onChangeText={this.onUsernameChanged}//绑定文本变化的回调函数
                        style={styles.input}
                        placeholderTextColor={'#fff'}//提示文本的颜色
                        placeholder={'  请输入用户名'}//提示文本的内容
                        underlineColorAndroid={'transparent'}/>{/*设置下划线颜色为透明*/}
                </View>

                <View
                    style={styles.inputBox}>
                    <Image
                        style={styles.img}
                        source={require('../../pic/解锁.png')}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={this.onPasswordChanged}// 绑定文本变化的回调函数
                        secureTextEntry={true}
                        placeholderTextColor={'#fff'}// 提示文本的颜色
                        placeholder={'  请输入密码，6~16个字符'}// 提示文本的内容
                        underlineColorAndroid={'transparent'}/>{/*设置下划线颜色为透明*/}
                </View>

                <TouchableOpacity
                    onPress={() => this.login()}// 绑定点击事件
                    style={styles.button}>
                    <Text style={styles.btText}>登录</Text>
                </TouchableOpacity>


                <View style={styles.tgSettingStyle}>
                    <Text>忘记密码</Text>
                </View>
                <TouchableOpacity onPress={() => this.goRegister()}>
                    <View style={styles.tgSettingStyle}>
                        <Text style={styles.fontStyle}>新用户</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    //账号文本变化的回调函数，该回调函数接收的参数为 输入框的当前文本内容
    //通过绑定此函数给onChangeText就实现实时更新username变量
    onUsernameChanged = (newUsername) => {
        console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
        this.state.username = newUsername;
    };

    //密码框文本变化的回调函数，该回调函数接收的参数为：输入框当前文本内容
    // 通过绑定此函数给onChangeText就实现实时更新password变量
    onPasswordChanged = (newPassword) => {
        console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
        this.state.password = newPassword;
    };

    login(){
        if (this.state.username === 'admin' && this.state.password === '123') {
            ToastAndroid.show('登录成功！', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('用户名或密码错误！', ToastAndroid.SHORT);
        }
    };

    goRegister() {
        // const {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: 'RegisterPage',
        //         component: RegisterPage,
        //     });
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    //欢迎文字风格
    welcomeStyle: {
        marginTop: 50,
        marginBottom: 50,
    },
    //文本输入风格
    tgSettingStyle: {
        flexDirection: 'row',
        width: 0.8 * Screen.width,
        justifyContent: 'center',
        marginTop: 30,
        alignItems: 'center',
    },
    fontStyle: {
        textDecorationLine: 'underline'
    },
    img: {
        width: 30,
        height: 30,
    },
    button: {
        marginTop: 50,
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#66f',
        marginBottom: 8,
    },
    btText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#66f',
        marginBottom: 8,
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 13,
        color: 'white',//输入框输入的文本为白色
    },
});

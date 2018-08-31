import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';

import Screen from '../../utils/Screen'
// import HostPage from '../../0Hostpage/index'; //注册登录后跳转至HostPage

type Props = {};
export default class RegisterPage extends Component <Props> {
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
                <View
                    style={styles.backStyle}>
                    <Image
                        style={styles.backButtonStyle}
                        source={require('../../pic/返回.png')}
                    />
                    <Text
                        style={styles.registerStyle}> 注册账号</Text>
                </View>

                <View
                    style={styles.inputBox}>
                    <Image
                        style={styles.img}
                        source={require('../../pic/个人.png')}
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
                        source={require('../../pic/手机.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#fff'}//提示文本的颜色
                        placeholder={'  请输入常用手机号'}//提示文本的内容
                        underlineColorAndroid={'transparent'}/>{/*设置下划线颜色为透明*/}
                </View>

                <View
                    style={styles.inputBox}>
                    <Image
                        style={styles.img}
                        source={require('../../pic/验证码.png')}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={'#fff'}//提示文本的颜色
                        placeholder={'  请输入验证码'}//提示文本的内容
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
                        onChangeText={this.onPasswordChanged}//绑定文本变化的回调函数
                        secureTextEntry={true}
                        placeholderTextColor={'#fff'}//提示文本的颜色
                        placeholder={'  请输入密码，6~16个字符'}//提示文本的内容
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
                        secureTextEntry={true}
                        placeholderTextColor={'#fff'}//提示文本的颜色
                        placeholder={'  请再次输入密码，区分大小写'}//提示文本的内容
                        underlineColorAndroid={'transparent'}/>{/*设置下划线颜色为透明*/}
                </View>

                <TouchableOpacity
                    //onPress={this.login}//绑定点击事件
                    onPress={this._pressButton.bind(this)}//绑定点击事件
                    style={styles.button}>
                    <Text style={styles.btText}>完成注册并登录</Text>
                </TouchableOpacity>

                {/*
                <TouchableOpacity
                    style={styles.button}>
                    <Text
                        style={styles.btText}>注册</Text>
                </TouchableOpacity>
                */}
            </View>
        );
    }


    //账号文本变化的回调函数，该回调函数接收的参数为 输入框的当前文本内容
    //通过绑定此函数给onChangeText就实现实时更新username变量
    onUsernameChanged = (newUsername) => {
        console.log(newUsername);//运行后可以在输入框随意输入内容并且查看log验证！
        this.username = newUsername;
    };

    //密码框文本变化的回调函数，该回调函数接收的参数为：输入框当前文本内容
    // 通过绑定此函数给onChangeText就实现实时更新password变量
    onPasswordChanged = (newPassword) => {
        console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
        this.password = newPassword;
    };

    //跳转界面
    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                //name:'HostPage',
                //component:HostPage,
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    backButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginTop: 20
    },

    registerStyle: {
        fontSize: 33,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
        flexDirection: 'row'
    },

    backStyle: {
        width: 360,
        height: 80,
        backgroundColor: '#66f',
        marginBottom: 80,
        //borderRadius: 8,
        flexDirection: 'row'
    },

    img: {
        width: 30,
        height: 30,
    },

    input: {
        width: 200,
        height: 40,
        fontSize: 13,
        color: 'white',//输入框输入的文本为白色
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
    }
});

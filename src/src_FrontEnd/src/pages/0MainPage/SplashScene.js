import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
    Image, TouchableOpacity
} from 'react-native';
// import GuideScene from "./GuideScene";
// import GetSetStorge from "./GetSetStorge";
// import * as InteractionManager from "react-native";
// import {Navigator} from "react-native-deprecated-custom-components";
// import {Navigator} from 'react-native';

const splashImg = require('../../pic/loading.jpg');//加载图片
import Screen from '../../utils/Screen'

// create a component
export default class SplashScene extends Component {
    constructor(props) {
        super(props);
        this.state = {  //动画效果
            bounceValue: new Animated.Value(0),//设置初始值
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        width: Screen.width,
                        height: 0.7 * Screen.height,
                        opacity: this.state.bounceValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0] //线性插值
                        }),
                    }}
                >
                    <Image source={splashImg} style={{width: Screen.width, height: 0.9 * Screen.height}}/>
                </Animated.View>

                {/*//动画画面下方文字信息*/}
                <View style={styles.infoStyle}>
                    <Text style={styles.textStyle}>Welcome to Fetcher!</Text>
                </View>

                <TouchableOpacity onPress={() => this.skip()} style={styles.button}>
                    <Text style={styles.btText}>跳过</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        //判断用户是否首次登录
        this.timer = setTimeout(() => {
            //判断用户是否第一次登陆
            // GetSetStorge.getStorgeAsync('isFirst').then((result) => {
            //     if (result == null || result === '') {
            //         //第一次启动跳转至启动页
            //         this.props.navigation.navigate('GuideScene');
            //         GetSetStorge.setStorgeAsync('isFirst', 'true');
            //     } else {
            //         //第二次启动直接跳转至主页面，此为测试版
            //         //this.props.navigation.navigate('GuideScene');
            //     }
            //
            // }).catch((error) => {
            //     console.log('==========================');
            //     console.log('系统异常' + error);
            //     console.log('==========================');
            // });
            Animated.timing(
                this.state.bounceValue, //初始值
                {toValue: 1, duration: 500}//结束值
            ).start();//开始
        }, 3000);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    skip() {
        // 跳过逻辑
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: Screen.width,
        height: Screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    infoStyle: {
        width: Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        fontSize: 20,
    },
    //跳过按钮
    button: {
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#2bf2ff',
        marginBottom: 8,
    },
    //跳过文字按钮
    btText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
});
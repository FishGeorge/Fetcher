import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import Screen from '../../utils/Screen'

export default class SplashScene extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {  // 动画效果
            bounceValue: new Animated.Value(0),// 设置初始值
            time: 5,
            allowSkip: false,
            hasUsed: 0,
            hasLogined: 0,
            loginInfo: {},
            SplashPic: "http://i2.bvimg.com/661327/b08a88cab56f94d6s.jpg",
        };

        // // 下载（刷新）广告图+商品信息
        // storage.load({
        //     key: 'allItemsInfo',
        //     // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        //     autoSync: true,
        //     // syncInBackground(默认为true)意味着如果数据过期，
        //     // 在调用sync方法的同时先返回已经过期的数据。
        //     // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        //     syncInBackground: true,
        //     // 你还可以给sync方法传递额外的参数
        //     // syncParams: {
        //     //     extraFetchOptions: {
        //     //         // 各种参数
        //     //     },
        //     //     someFlag: true,
        //     // },
        // }).then(ret => {
        //
        // });
        // 获取广告页图片地址
        storage.load({
            key: 'SplashPicture',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,
        }).then(ret => {
            this.setState({
                SplashPic: ret,
            });
            // console.warn(ret);
        })
    }

    // 渲染前调用
    componentWillMount() {
        // 读取
        storage.load({
            key: 'hasUsed',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,
        }).then(ret => {
            // 发现有这个key，说明不是第一次使用
            this.state.hasUsed = 1;
        }).catch(err => {
            // do nothing
        });
        // 读取
        storage.load({
            key: 'hasLogined',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            // 发现有这个key，说明已登录过
            this.state.hasLogined = 1;
            this.state.loginInfo = ret;
        }).catch(err => {
            // 没有登陆过，do nothing
        });
    }

    render() {
        return (
            <Animated.View style={{
                width: Screen.width,
                height: Screen.height - Screen.STATUSBAR_HEIGHT,
                opacity: this.state.bounceValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0]
                })
            }}>
                <Image source={{uri: this.state.SplashPic}} style={{width: Screen.width, height: 0.7 * Screen.height}}/>
                <View style={styles.infoStyle}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFC750'}}>Fetcher</Text>
                    <Text style={{fontSize: 14}}>东南大学 校园C2C平台</Text>
                    <Text style={{fontSize: 10, position: 'absolute', bottom: 8}}>Copy right @ Fetcher 项目组</Text>
                </View>
                <TouchableOpacity onPress={() => this._pressSkip()} style={styles.button}>
                    <Text style={styles.btnText}>{"跳过 " + this.state.time}</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    componentDidMount() {
        // 5s后自动跳过
        this.timer1 = setTimeout(() => {
            Animated.timing(
                this.state.bounceValue, // 初始值
                {toValue: 1, duration: 300}// 结束值
            ).start();// 开始
            this._pressSkip();
        }, 5100);
        // 刷新倒计时数字
        this.timer2 = setInterval(() => {
            this.setState({
                time: this.state.time - 1
            });
        }, 1000);
        // 1.5s后使跳过可用
        this.timer3 = setTimeout(() => {
            this.state.allowSkip = true;
        }, 1500);
    }

    componentWillUnmount() {
        // clearTimeout(this.timer1);
        // clearInterval(this.timer2);
        // clearTimeout(this.timer3);
    }

    // 跳过逻辑
    _pressSkip() {
        if (this.state.allowSkip === true) {
            if (this.state.hasUsed === 1 && this.state.hasLogined === 1) {
                // alert(this.state.loginInfo.UserName);
                // 测试说明这是个Json
                // console.warn("0");
                this.props.navigation.navigate('Main',{selectedTab:'bigbrother'});
                ToastAndroid.show("欢迎回来，" + this.state.loginInfo.NickName, ToastAndroid.SHORT);
            }
            else if (this.state.hasUsed === 1 && this.state.hasLogined === 0) {
                this.props.navigation.navigate('LoginPage');
            }
            else
                this.props.navigation.navigate('GuideScene');
            clearTimeout(this.timer1);
            clearInterval(this.timer2);
            clearTimeout(this.timer3);
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    infoStyle: {
        width: Screen.width,
        height: 0.3 * Screen.height - Screen.STATUSBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    // 跳过按钮
    button: {
        paddingLeft: 7,
        paddingRight: 7,
        position: 'absolute',
        right: 5,
        top: 0.7 * Screen.height + 0.5 * Screen.STATUSBAR_HEIGHT,
        height: 30,
        // width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: '#cccccc',
    },
    // 跳过文字按钮
    btnText: {
        color: '#000000',
        fontSize: 15,
        // fontWeight: 'bold'
    },
});
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    Animated,
    Easing,
    TextInput,
} from 'react-native';
import Screen from '../utils/Screen'

const [DialogWidth, DialogHeight] = [Screen.width, (0.48) * Screen.height - Screen.STATUSBAR_HEIGHT];

export default class SearchDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
            searchTxt: "",
        };
        this.entityList = [];//数据源
        this.callback = function () {

        };//回调方法
    }

    render() {
        if (this.state.hide) {
            return (<View/>)
        } else {
            return (
                <View style={styles.container}>
                    <Animated.View style={[styles.mask,
                        {opacity: this.state.opacity}
                    ]}/>
                    <Animated.View style={
                        [styles.tip, {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [Screen.height, 0.52 * Screen.height]
                                }),
                            }]
                        }]
                    }>
                        <View style={styles.searchContainer}>
                            <TextInput
                                ref="textInput"
                                style={styles.textInput}
                                onChangeText={(text) => this.setState({searchTxt:text})}
                                placeholder={"搜索“冰镇可口可乐”"}
                                underlineColorAndroid='transparent'
                            />
                            <TouchableOpacity style={styles.textButton}
                                                onPress={this.choose.bind(this)}>
                                <Text style={styles.buttonText1}>搜 索</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableHighlight
                            style={styles.goBackBtn}
                            underlayColor='#CDCDCD'
                            onPress={this.iknow.bind(this)}>
                            <Text style={styles.goBackText}>返 回</Text>
                        </TouchableHighlight>
                    </Animated.View>
                </View>
            );
        }
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0.4,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start((finished) => this.setState({hide: true}));
    }

    //取消
    iknow(event) {
        if (!this.state.hide) {
            this.out();
        }
    }

    //选择
    choose() {
        if (!this.state.hide) {
            this.out();
            this.callback(this.state.text);
        }
    }

    /**
     * 弹出控件，最多支持3个选项
     * titile: 标题
     * entityList：选择项数据   数组
     * callback：回调方法
     */
    show(callback: Object) {
        this.callback = callback;
        if (this.state.hide) {
            this.setState({hide: false}, this.in);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        width: Screen.width,
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#000000",
        position: "absolute",
        width: Screen.width,
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
    },
    tip: {
        width: DialogWidth,
        height: DialogHeight,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
        justifyContent: "space-between",
    },
    // 搜索外框
    searchContainer: {
        height:0.075*Screen.height,
        width:Screen.width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFC750"
    },
    // 搜索框
    textInput: {
        height:0.058*Screen.height,
        width:0.81*Screen.width,
        marginLeft:0.03*Screen.width,
        marginRight:0.02*Screen.width,
        fontSize: 17,
        color: '#000000',
        backgroundColor:"#FFFFFF",
        borderRadius: 0.029*Screen.height,
    },
    textButton: {
        height:0.055*Screen.height,
        width:0.12*Screen.width,
        marginRight:0.02*Screen.width,
        justifyContent:"center",
        alignItems: 'center',
    },
    goBackBtn: {
        height: 40,
        backgroundColor: '#eeeeee',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    buttonText1: {
        fontSize: 17,
        color: "#000000",
        textAlign: "center",
    },
    goBackText: {
        fontSize: 18,
        color: "#000000",
        textAlign: "center",
    },
});

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';

type Props = {};
var Img = require('../../pic/icon_return.png');
import {Constants} from "../../common/Constants";
import Success from "./Success"

export default class InformationFillOut_B extends Component<Props> {
    constructor(props) {
        super(props);
        this._onChangeText = this._onChangeText.bind(this);
        this.state = {
            showValue: "",
        }
    }

    render() {
        return (
            <View style={styles.outer}>
                <TouchableOpacity onPress={this._goBack.bind(this)}
                                  style={styles.goback}>
                    <Image source={Img}/>
                </TouchableOpacity>
                <View style={{marginTop:36,position:'absolute'}}>
                    <View style={styles.mycontainer}>
                        <Text style={{fontSize: 30}}>地址</Text>
                        <TextInput
                            placeholder="请输入地址"
                            editable={true}//是否可编辑
                            style={styles.inputStyle}//input框的基本样式
                            onChangeText={this._onChangeText}//输入框改变触发的函数
                        />
                    </View>
                    <View style={styles.mycontainer}>
                        <Text style={{fontSize: 30}}>1</Text>
                        <TextInput
                            placeholder="请输入地址"
                            editable={true}//是否可编辑
                            style={styles.inputStyle}//input框的基本样式
                            onChangeText={this._onChangeText}//输入框改变触发的函数
                        />
                    </View>
                </View>
                <View style={styles.viewofbutton}>
                    <TouchableOpacity onPress={this.showData.bind(this)}>
                        <View style={styles.btn}>
                            <Text style={styles.wordC}>测试</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}
                                      style={styles.instructions}>
                        <Text style={styles.button}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    showData() {
        alert(this.state.showValue);//展示输入框的内容
    }

    _onChangeText(inputData) {
        console.log("输入的内容", inputData);
        //把获取到的内容，设置给showValue
        this.setState({showValue: inputData});
    }

    _goBack() {
        //获取SampleComponent中创建的Navigator对象
        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        //这里对navigator进行了判断  如果navigator(导航器)对象存在的情况下 在进行操作
        if (navigator) {
            navigator.pop();
        }
    }

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Success',
                component: Success
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems: 'center',
    },
    mycontainer: {
        height: 50,
        width: 0.96 * Constants.DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        width: 280,
        height: 30,
        borderColor: "black",
        borderWidth: 1,
        marginLeft: 5,
        justifyContent: 'center',
    },
    btn: {
        width: 85,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        // borderRadius:5
    },
    wordC: {
        color: "white",
        fontSize: 18,
    },
    goback: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    outer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    viewofbutton: {
        bottom:10,
        left: Constants.DEVICE_WIDTH - 110,
        position:'absolute'
    },
    button: {
        height: 50,
        width: 100,
        fontSize: 30,
        backgroundColor: '#FF8000',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 5
    },
    instructions: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8000',
        margin: 5
    },
    textStyle: {
        height: 100,
        width: 200,
        fontSize: 30,
        backgroundColor: 'gray',
        textAlign: 'center',
        justifyContent: 'center',
        margin: 5
    },
    ViewForTextStyle: {
        height: 100,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        margin: 5
    }
});
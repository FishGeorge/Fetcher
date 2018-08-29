import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

type Props = {};
var Img = require('../../../pic/icon_return.png');
import {Constants} from "../../../common/Constants";
import ChooseArea from "../1ChooseAreaPage/index";
import OrderComplete from "../7OrderCompletePage/index";

export default class Delivering extends Component<Props> {
    render() {
        return (
            <View style={styles.outer}>
                <TouchableOpacity onPress={this._goBack.bind(this)}
                                  style={styles.goback}>
                    <Image source={Img}/>
                </TouchableOpacity>
                <Text>正在派送界面</Text>
                <View style={styles.viewofbutton}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}
                                      style={styles.instructions}>
                        <Text style={styles.button}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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

    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'OrderComplete',
                component:OrderComplete,
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
    goback: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    outer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    viewofbutton: {
        top: Constants.DEVICE_HEIGHT - (Constants.IS_IOS ? 20 : 0)-140,
        left:Constants.DEVICE_WIDTH - 110
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
});
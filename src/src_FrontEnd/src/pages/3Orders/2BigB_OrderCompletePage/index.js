import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';

type Props = {};
var Img = require('../../../pic/icon_return.png');
import {Constants} from "../../../common/Constants";
import Orders from "../../../navigator/Orders_Navigator"

export default class BigBrotherOrderComplete extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            showValue: "",
        }
    }

    render() {
        return (
            <View style={styles.outer}>
                <View style={{height: 36, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this._goBack.bind(this)}
                                      style={styles.goback}>
                        <Image source={Img}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}
                                      style={{alignItems: 'center',left:Constants.DEVICE_WIDTH-90}}>
                        <Text style={{fontSize:28}}>完成</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 36, position: 'absolute'}}>
                    <View style={styles.mycontainer}>
                        <Text>支付完成</Text>
                    </View>
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

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Orders',
                component: Orders
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
        height: 100,
        width: 0.96 * Constants.DEVICE_WIDTH,
        flexDirection: 'column',
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
        bottom: 10,
        left: Constants.DEVICE_WIDTH - 110,
        position: 'absolute'
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
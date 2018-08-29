import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,Image} from 'react-native';
import FetcherOrderComplete from "../1Fetcher_OrderCompletePage/index";
import BigBrotherOrderComplete from "../2BigB_OrderCompletePage/index";
import {Constants} from "../../../common/Constants";

var Img = require('../../../pic/icon_return.png');
type Props = {};
export default class BigBrotherOrderInformation extends Component<Props> {
    render(){
        return(
            <View style={styles.outer}>
                <View style={{height: 36, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this._goBack.bind(this)}
                                      style={styles.goback}>
                        <Image source={Img}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{ flexDirection:'row', alignItems:'center' }}>
                    <Text style={{fontSize:40}}>跳转</Text>
                </TouchableOpacity>
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
                name:'BigBrotherOrderComplete',
                component:BigBrotherOrderComplete,
            });
        }
    }
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    container: {
        marginTop:30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    goback: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
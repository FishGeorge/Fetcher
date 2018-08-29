/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {Constants} from '../../common/Constants'
import InformationFillOut_B from "./InformationFillOut_B";

type Props = {};
var icon_person = require('../../pic/icon_personal.png');
var icon_address = require('../../pic/icon_address.png');
export default class BigBrotherHost extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            items: []
        }
    }

    componentDidMount() {
        var item;
        for (let i = 0; i < 3; i++) {
            switch (i) {
                case 0: {
                    item = require('../../pic/example1.jpg');

                    break;
                }
                case 1: {
                    item = require('../../pic/example2.jpg');
                    break;
                }
                default: {
                    item = require('../../pic/example3.jpg');
                    break;
                }
            }
            this.state.items.push(item);
        }
        this.setState({
            isShow: true,
            items: this.state.items
        })
    }

    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'InformationFillOut_B',
                component:InformationFillOut_B,
            });
        }
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={{height: 50, backgroundColor: '#F5FCFF', flexDirection:'row'}}>
                    <TouchableOpacity
                                      style={{flexDirection: 'row', alignItems: 'center',left:0}}>
                        <Image source={icon_address}/>
                    </TouchableOpacity>

                    <TouchableOpacity
                                      style={{flexDirection: 'row', alignItems: 'center',left:Constants.DEVICE_WIDTH-72}}>
                        <Image source={icon_person}/>
                    </TouchableOpacity>
                </View>
                <View style={{height: 200, alignItems: 'center', backgroundColor: 'blue'}}>
                    <Swiper autoplay={true} height={200} showsPagination={true} dotColor="white"
                            activeDotColor='yellow' horizontal={true}>
                        {
                            this.state.items.map((item, index) => {
                                console.log(item, index)
                                //cover: 等比例放大; center:不变; contain:不变; stretch:填充;
                                return (<Image style={{height: 200, width: Constants.DEVICE_WIDTH}} key={index}
                                               resizeMode='cover' source={item}/>)
                            })
                        }
                    </Swiper>
                </View>
                <View style={{height: 200, alignItems: 'center', backgroundColor: '#F5FCFF'}}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}
                                      style={{flexDirection: 'row', alignItems: 'center',left:0}}>
                        <Text>跳转</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        marginTop:0,
        height: Constants.DEVICE_HEIGHT - (Constants.IS_IOS ? 20 : 0),
        width: Constants.DEVICE_WIDTH
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    top: {},
    scrollViewStyle: {
        backgroundColor: 'red'
    },
    itemStyle: {
        // 尺寸
        width: 1000,
        height: 200
    },
});
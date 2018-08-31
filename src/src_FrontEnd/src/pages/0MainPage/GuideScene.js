import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import {Navigator} from "react-native-deprecated-custom-components";
import Screen from "../../utils/Screen";

let image1 = require('../../pic/splash.jpg');
let image2 = require('../../pic/splash.jpg');
let image3 = require('../../pic/splash.jpg');

export default class GuideScene extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                pagingEnabled={true}
                horizontal={true}>
                <Image source={image1} style={styles.backgroundImage}/>
                <Image source={image2} style={styles.backgroundImage}/>
                <Image source={image3} style={[styles.backgroundImage, styles.btnOut]}/>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    //跳转页面
                    //this.props.navigation.navigate('');
                }}
                >
                    <Text style={styles.btnText}>启动应用</Text>
                </TouchableOpacity>
            </ScrollView>);
    }
};
const styles = StyleSheet.create({
    contentContainer: {
        width: 3 * Screen.width,
        height: Screen.height,
    },
    backgroundImage: {
        width: Screen.width,
        height: Screen.height,
    },
    btnOut: {
        alignItems: 'center',
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#90ee90',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 550,
    },
    btnText: {
        fontSize: 18,
        color: '#fff'
    },
});
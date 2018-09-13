import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    View
} from 'react-native';

import Screen from "../../utils/Screen";
import LoginPage from "./LoginPage";

let image1 = require('../../pic/splash1.jpg');
let image2 = require('../../pic/splash2.jpg');
let image3 = require('../../pic/splash3.jpg');
let image4 = require('../../pic/splash4.jpg');

export default class GuideScene extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.outer}>
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    bounces={false}
                    pagingEnabled={true}
                    horizontal={true}>
                    <Image source={image1} style={styles.outer}/>
                    <Image source={image2} style={styles.outer}/>
                    <Image source={image3} style={styles.outer}/>
                    <View styles={styles.outer}>
                        <Image source={image4} style={styles.outer}/>
                        <View style={{
                            width: Screen.width,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0.08 * Screen.height,
                        }}>
                            <TouchableOpacity style={styles.btn} onPress={() => this._goLoginPage()}>
                                <Text style={styles.btnText}>启动应用</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _goLoginPage() {
        // 记录首次使用App
        storage.save({
            key: 'hasUsed',
            data: 'true',
            expires: null
        });

        // 跳转LoginPage
        this.props.navigation.navigate('LoginPage');
    }
};

const styles = StyleSheet.create({
    outer: {
        width: Screen.width,
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
    },
    contentContainer: {
        width: 4 * Screen.width,
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
    },
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#FFC750',
        borderWidth:2,
        borderColor:"#FFFFFF",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    btnText: {
        fontSize: 19,
        color: '#FFFFFF'
    },
});
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import Screen from "../utils/Screen";
import icon from "../common/icon"

export default class BRExpandableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnim: new Animated.Value(this.props.initialShowing),
            btnImg: this.props.initialShowing === 0 ? {uri:icon.down} : {uri:icon.up},
            moduleName:this.props.moduleName
        };
        this.isShowing = this.props.initialShowing;
    }

    render() {
        return (
            <Animated.View style={[{
                marginTop: 0.0075 * Screen.height,
                marginBottom: 0.0075 * Screen.height,
                height: this.state.showAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.06 * Screen.height, 0.06 * Screen.height + this.props.contentViewStyle.height]
                }),
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                width: 0.96 * Screen.width,
                borderRadius: 0.030 * Screen.width,
            }, this.props.color === 0 ? styles.border0 : styles.border1]}>

                <TouchableOpacity activeOpacity={0.7} onPress={this._btnOnClick.bind(this)}>
                    <View style={this.props.color === 0 ? styles.headerContainer0 : styles.headerContainer1}>
                        <Image source={this.props.moduleImg} style={styles.iconStyle}/>
                        <View style={{width: 0.02 * Screen.width}}/>
                        <Text style={styles.header}>{this.state.moduleName}</Text>
                        <Image source={this.state.btnImg} style={styles.btnStyle}/>
                    </View>
                </TouchableOpacity>
                <View style={this.props.contentViewStyle}>
                    {this.props.moduleContent}
                </View>
            </Animated.View>
        );
    }

    _btnOnClick() {
        Animated.timing(
            this.state.showAnim,
            {
                toValue: this.isShowing === 0 ? 1 : 0
            }
        ).start();
        this.isShowing = (this.isShowing === 0) ? 1 : 0;
        this.setState({
            btnImg: this.isShowing ? {uri:icon.up} : {uri:icon.down}
        });
    }
}

const styles = StyleSheet.create({
    headerContainer0: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        // borderRadius: 0.030 * Screen.width,
        justifyContent: 'center',
    },
    headerContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFC750',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        // borderRadius: 0.030 * Screen.width,
        justifyContent: 'center',
    },
    btnStyle: {
        height: 20,
        width: 20
    },
    header: {
        fontSize: 16,
        width: 0.75 * Screen.width
    },
    iconStyle: {
        height: 25,
        width: 25
    },
    border0: {},
    border1: {
        borderWidth: 2,
        borderColor: '#FFC750'
    }
});
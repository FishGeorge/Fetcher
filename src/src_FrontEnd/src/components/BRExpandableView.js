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

class BRExpandableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            showAnim: new Animated.Value(this.props.initialShowing),
            btnImg: this.props.initialShowing === 0 ? require('../pic/tab_下拉.png') : require('../pic/tab_收起.png')
        };
        this.isShowing = this.props.initialShowing;
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
            btnImg: this.isShowing ? require('../pic/tab_收起.png') : require('../pic/tab_下拉.png')
        });
    }

    render() {
        return (
            <Animated.View style={{
                height: this.state.showAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.06 * Screen.height, 0.06 * Screen.height + this.props.contentViewStyle.height]
                }),
                overflow: 'hidden',
                backgroundColor: '#F5FCFF',
                width: 0.96 * Screen.width,
                borderRadius: 0.030 * Screen.width,
            }}>

                    <View style={styles.headerContainer}>
                        <Image source={this.props.moduleImg} style={styles.iconStyle}/>
                        {/*<View style={{width: 5}}/>*/}
                        <Text style={styles.header}>{this.props.moduleName}</Text>
                        <TouchableOpacity onPress={this._btnOnClick.bind(this)}>
                        <Image source={this.state.btnImg} style={styles.btnStyle}/>
                        </TouchableOpacity>
                    </View>
                <View style={this.props.contentViewStyle}>
                    {this.props.moduleContent}
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
        justifyContent: 'space-around',
    },
    btnStyle: {
        height: 20,
        width: 20
    },
    header: {
        fontSize: 16,
        width: 0.7 * Screen.width
    },
    iconStyle: {
        height: 25,
        width: 25
    },
});

module.exports = BRExpandableView;
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Screen from "../utils/Screen";

export default class OrderState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: this.props.state,
        };
    }

    render() {
        return (
            <View style={{
                height: 0.026 * Screen.height,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <View style={{
                    height: 0.026 * Screen.height,
                    width: 0.026 * Screen.height,
                    borderRadius: 0.013 * Screen.height,
                    backgroundColor: this.state.state === 0 ? "#08aff0" : (this.state.state === 1 ? "#5beb20" : "#AAAAAA")
                }}/>
                <Text style={{fontSize:16}}>{this.state.state === 0 ? " 意向待匹配" : (this.state.state === 1 ? " 订单进行中" : " 订单已完成")}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle2: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
        marginRight: 0.01 * Screen.width,
    },
});
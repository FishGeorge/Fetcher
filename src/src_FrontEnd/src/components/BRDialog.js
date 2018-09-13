import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Modal,
} from 'react-native';
import Screen from "../utils/Screen";

export default class BRDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: this.props.visibility,
            leftBtnText: this.props.leftBtnText,
            rightBtnText: this.props.rightBtnText,
            content: this.props.content,
            contentStyle: this.props.contentStyle
        };
    }

    render() {
        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType={'fade'}
                onRequestClose={() => this.setState({visibility: false})}
            >
                <View style={styles.container}>
                    <View style={{
                        backgroundColor: "#FFFFFF",
                        alignItems: 'center',
                        width: 0.9 * Screen.width,
                        height: this.state.contentStyle.height + 0.08 * Screen.height + 0.5,
                        borderRadius: 0.030 * Screen.width
                    }}>
                        <View style={[this.state.contentStyle, {
                            borderTopLeftRadius: 0.030 * Screen.width,
                            borderTopRightRadius: 0.030 * Screen.width
                        }]}>
                            {this.state.content}
                        </View>
                        <View style={styles.horizonLine}/>
                        <View style={styles.btnRow}>
                            <TouchableHighlight
                                style={styles.leftBtn}
                                onPress={this.props.onLeftPress}// ...
                                underlayColor={'#C5C5C5'}>
                                <View>
                                    <Text style={styles.leftBtnText}>{this.state.leftBtnText}</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={styles.verticalLine}/>
                            <TouchableHighlight
                                style={styles.rightBtn}
                                onPress={this.props.onRightPress}// ...
                                underlayColor={'#C5C5C5'}>
                                <View>
                                    <Text style={styles.rightBtnText}>{this.state.rightBtnText}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    verticalLine: {
        backgroundColor: '#9f9fa3',
        width: 0.5,
        alignSelf: 'stretch'
    },
    horizonLine: {
        backgroundColor: '#9f9fa3',
        height: 0.5,
        alignSelf: 'stretch'
    },
    btnRow: {
        // width:0.9 * Screen.width,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftBtn: {
        width: 0.45 * Screen.width,
        height: 0.08 * Screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 0.030 * Screen.width
    },
    rightBtn: {
        width: 0.45 * Screen.width,
        height: 0.08 * Screen.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 0.030 * Screen.width
    },
    leftBtnText: {
        fontSize: 18,
        color: '#000000',
    },
    rightBtnText: {
        fontSize: 18,
        color: '#FFC750'
    }
});
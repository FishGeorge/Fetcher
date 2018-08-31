'use strict'
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Modal,
} from 'react-native';
import Screen from "../../../utils/Screen";

export default class CustomModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: false,
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.visibility}
                transparent={true}
                animationType={'fade'}//none slide fade
                onRequestClose={() => this.setState({visibility: false})}
            >
                <View style={styles.container}>
                    <View style={styles.modalContainer}>
                        <View style={styles.List}>
                            <View style={styles.itemTitle}>
                                <Text>{this.props.item1.Title}</Text>
                            </View>
                            <View style={styles.itemQuantity}>
                                <Text>{this.props.item1.Quantity}</Text>
                            </View>
                            <View style={styles.itemPrice}>
                                <Text>{this.props.item1.Price}</Text>
                            </View>
                        </View>

                        <View style={styles.horizonLine}/>
                        <View style={styles.row}>
                            <TouchableHighlight style={styles.leftBn} onPress={this.props.onLeftPress}
                                                underlayColor={'#C5C5C5'}>
                                <Text style={styles.leftBnText}>取消</Text>
                            </TouchableHighlight>
                            <View style={styles.verticalLine}/>
                            <TouchableHighlight style={styles.rightBn} onPress={this.props.onRightPress}
                                                underlayColor={'#C5C5C5'}>
                                <Text style={styles.rightBnText}>确定</Text>
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
        alignItems: 'center',
    },
    modalContainer: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 0.030 * Screen.width,
        height: 200,
        width: 200,
        flexDirection: 'column'
    },
    List: {
        height: 50,
        width: 200,
        flexDirection: 'row'
    },
    itemTitle: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        marginTop: 10,
        width: 100
    },
    itemQuantity: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        marginTop: 10,
        width: 50
    },
    itemPrice: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 10,
    },
    modalMessage: {
        color: '#8a8a8a',
        fontSize: 14,
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizonLine: {
        backgroundColor: '#9f9fa3',
        height: 0.5,
        alignSelf: 'stretch'
    },
    verticalLine: {
        backgroundColor: '#9f9fa3',
        width: 1,
        alignSelf: 'stretch'
    },
    leftBn: {
        borderBottomLeftRadius: 3,
        padding: 7,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftBnText: {
        fontSize: 16,
        color: '#8a8a8a',
    },
    rightBn: {
        borderBottomRightRadius: 3,
        padding: 7,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBnText: {
        fontSize: 16,
        color: '#00A9F2'
    }
})
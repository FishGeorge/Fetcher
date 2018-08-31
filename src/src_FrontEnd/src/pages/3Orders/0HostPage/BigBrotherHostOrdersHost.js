import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import BigBrotherOrderInformation from "../3BigB_OrderInformationPage/index"
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import Item from "../../../components/Item";

type Props = {};
export default class BigBrotherHostOrdersHost extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <BRExpandableView
                    initialShowing={0}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={this._setOrderNumber()}
                    moduleContent={
                        <View styles={{marginTop: 3, width: 0.95 * Screen.width}}>
                            <View style={{alignItems: 'flex-end', marginRight: 5, marginBottom: 10}}>
                                <Item
                                    Url={require('../../../pic/ItemExample.png')}
                                    Title="王帆1：1手办"
                                    Price="1.00元"
                                    Quantity="1"
                                    Type="摔跤用品"
                                    Address="梅园4B-319"
                                    Size="大"
                                />
                                <Item
                                    Url={require('../../../pic/ItemExample.png')}
                                    Title="李元亨1：1手办"
                                    Price="1.00元"
                                    Quantity="1"
                                    Type="摔跤用品"
                                    Address="梅园4B-319"
                                    Size="大"
                                />
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                                        <View style={styles.btn}>
                                            <Text style={{fontSize: 20}}>订单详情</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={styles.btn}>
                                            <Text style={{fontSize: 20}}>再次发布</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.30 * Screen.height
                    }}

                />
            </View>
        )
    }

    _pressButton() {
        const {navigator} = this.props;
        this.props.currentOrder="000001";
        if (navigator) {
            navigator.push({
                name: 'BigBrotherOrderInformation',
                component: BigBrotherOrderInformation,
            });
        }
    }

    _setOrderNumber() {
        return(

            <Text>
                订单编号：000001  交易成功
            </Text>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BEBEBE',
        height: 30,
        width: 120,
        borderRadius: 0.032 * Screen.width,
        justifyContent: 'center',
        marginRight:5
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
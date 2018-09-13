import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid
} from 'react-native';
import Screen from "../../../utils/Screen";
import icon from "../../../common/icon";
import ItemList from "../../../components/ItemList";

export default class ShoppingCartPage extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            BlankCart: <View/>,
            totalPrice: 0,
            itemsNum: 0,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri: icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text style={styles.headText}>购物车</Text>
                </View>
                {this.state.BlankCart}
                <ScrollView style={{width: Screen.width, height: 0.85 * Screen.height - Screen.STATUSBAR_HEIGHT}}>
                    <ItemList ref="itemList" viewWidth={Screen.width} items={this.state.items}/>
                </ScrollView>
                <View style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    <View style={{
                        width: 0.65 * Screen.width,
                        height: 0.08 * Screen.height,
                        backgroundColor: "#CDCDCD",
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: 0.65 * Screen.width,
                            height: 0.04 * Screen.height,
                            alignItems: 'center',
                            paddingLeft: 20
                        }}>
                            <Text style={{color: '#000000', fontSize: 16}}>{"总价："}</Text>
                            <Text ref='totalPrice'
                                  style={{
                                      color: '#FF0000',
                                      fontSize: 15,
                                      position: 'absolute',
                                      right: 40
                                  }}>{this.state.totalPrice / 100}</Text>
                            <Text
                                style={{color: '#000000', fontSize: 15, position: 'absolute', right: 20}}>{"元"}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: 0.65 * Screen.width,
                            height: 0.04 * Screen.height,
                            alignItems: 'center',
                            paddingLeft: 20
                        }}>
                            <Text style={{color: '#000000', fontSize: 16}}>{"商品个数："}</Text>
                            <Text ref='itemsNum'
                                  style={{
                                      color: '#FF0000',
                                      fontSize: 15,
                                      position: 'absolute',
                                      right: 40
                                  }}>{this.state.itemsNum}</Text>
                            <Text
                                style={{color: '#000000', fontSize: 15, position: 'absolute', right: 20}}>{"个"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this._goReleaseWantPage()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: '#FFC750',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#000000', fontSize: 18}}>选好啦</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    componentDidMount() {
        if (shoppingList.size === 0) {
            this.setState({
                BlankCart:
                    <View style={{
                        width: Screen.width,
                        height: 0.85 * Screen.height - Screen.STATUSBAR_HEIGHT,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{fontSize: 22, color: "#CDCDCD"}}>购物车是空的诶</Text>
                    </View>,
                // totalPrice: 0,
                // itemsNum: 0,
            })
        }
        else {
            for (let [key, value]of shoppingList) {
                storage.load({
                    key: 'allItemsInfoinID',
                    id: key
                }).then(ret => {
                    let item = ret;
                    item.Quantity = value;
                    this.state.items.push(item);
                    // console.warn(this.state.items);
                    this.refs.itemList.setState({
                        itemArray: this.state.items,
                    });
                    this.state.totalPrice += item.Price * item.Quantity;
                    this.state.itemsNum += item.Quantity;
                    // console.warn(this.state.totalPrice);
                    // console.warn(this.state.itemsNum);
                    this.setState({
                        totalPrice: this.state.totalPrice,
                        itemsNum: this.state.itemsNum
                    })
                }).catch(err => {
                    // any exception including data not found
                    // goes to catch()
                    console.warn(err.message);
                    ToastAndroid.show("拉取购物车物品信息失败", ToastAndroid.SHORT);
                    switch (err.name) {
                        case 'NotFoundError':
                            // TODO;
                            break;
                        case 'ExpiredError':
                            // TODO
                            break;
                    }
                });
            }
        }
    }

    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }

    // 跳转意向填写页
    _goReleaseWantPage() {
        // 数据包装

        // 跳转等待界面
        if (this.state.itemsNum !== 0) {
            this.props.navigation.navigate('InformationFillOut_B', {
                items: this.state.items,
                totalPrice: this.state.totalPrice
            });
        }
        else
            ToastAndroid.show("没有买东西的嘛", ToastAndroid.SHORT);
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    iconStyle: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.01 * Screen.height,
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    headText: {
        marginLeft: 0.01 * Screen.height,
        fontSize: 20,
        color: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.07 * Screen.height,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height,
    },
});
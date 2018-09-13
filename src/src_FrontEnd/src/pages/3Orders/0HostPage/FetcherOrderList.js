import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    FlatList,
    ToastAndroid, ScrollView
} from 'react-native';
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import Item from "../../../components/Item";
import icon from "../../../common/icon"
import ItemList from "../../../components/ItemList";
import OrderState from "../../../components/OrderState";
import BRDialog from "../../../components/BRDialog";
import AreaTransfer from "../../../utils/AreaTransfer";

export default class FetcherOrderList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            OrderList: [],
            // Orders: []
            brDialogVisibility: false,
            onOperationTradeInfoData: {}
        };
        this.state.leftBtnText = "";
        this.state.rightBtnText = "";
        this.state.BRDialogContent = {};
        // this.sendAllowed = 0;
    }

    componentWillMount() {
        // this.timer = setInterval(() => {
        //     if (this.sendAllowed === 0) this.sendAllowed = 1;
        // }, 100);
    }

    // 处理传入数据
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                {this._renderFOrderList()}
                <BRDialog
                    ref="_brDialog"
                    visibility={this.state.brDialogVisibility}
                    leftBtnText={this.leftBtnText}
                    rightBtnText={this.rightBtnText}
                    content={this.BRDialogContent}
                    contentStyle={{width: 0.9 * Screen.width, height: 0.3 * Screen.height}}
                    onLeftPress={() => {
                        this._pressDialogLeftBtn();
                        this.setState({
                            brDialogVisibility: false,
                        });
                    }}
                    onRightPress={() => {
                        this._pressDialogRightBtn();
                        this.setState({
                            brDialogVisibility: false,
                        })
                    }}/>
            </View>
        );
    }

    _renderFOrderList() {
        let wanteds = [];
        // console.warn(this.state.OrderList);
        for (let wantedNum = this.state.OrderList.length-1; wantedNum >=0; wantedNum--) {
            if (this.state.OrderList[wantedNum].WantedInfo.State === 0)
                wanteds.push(
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"W.No: " + this.state.OrderList[wantedNum].WantedInfo.WantedID+" "+this.state.OrderList[wantedNum].WantedInfo.ArriveTime}
                        moduleContent={
                            <View>
                                <View style={{
                                    width: 0.96 * Screen.width,
                                    height: 0.06 * Screen.height,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{fontSize: 18, color: "#CDCDCD"}}>挂起中，尚未匹配到意向</Text>
                                </View>
                                <View style={{
                                    width: 0.96 * Screen.width,
                                    height: 0.06 * Screen.height,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                    <OrderState state={0}/>
                                </View>
                            </View>
                        }
                        contentViewStyle={{
                            height: 0.06 * Screen.height
                        }}
                    />
                );
            else {
                // console.warn("hit");
                for (let tradeNum = this.state.OrderList[wantedNum].data.length-1; tradeNum >=0; tradeNum--) {
                    let items = [];
                    for (let itemNum = 0; itemNum < this.state.OrderList[wantedNum].data[tradeNum].data.length; itemNum++) {
                        this.state.OrderList[wantedNum].data[tradeNum].data[itemNum].ItemInfo[0].Quantity = this.state.OrderList[wantedNum].data[tradeNum].data[itemNum].Quantity;
                        items.push(this.state.OrderList[wantedNum].data[tradeNum].data[itemNum].ItemInfo[0]);
                    }
                    // console.warn(items);
                    switch (this.state.OrderList[wantedNum].WantedInfo.State) {
                        case 1:
                            wanteds.push(
                                <BRExpandableView
                                    color={1}
                                    initialShowing={1}
                                    moduleImg={{uri: icon.order}}
                                    // 此处需要对destination进行数字转义
                                    moduleName={"O.No: " + this.state.OrderList[wantedNum].data[tradeNum].TradeInfo.TradeID + " to " + AreaTransfer(this.state.OrderList[wantedNum].data[tradeNum].WantInfo[0].Destination)}
                                    moduleContent={
                                        <View>
                                            <ItemList viewWidth={0.96 * Screen.width} items={items}/>
                                            <View style={{
                                                width: 0.96 * Screen.width,
                                                height: 0.06 * Screen.height,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingLeft: 10,
                                            }}>
                                                <OrderState state={1}/>
                                                <TouchableOpacity onPress={() => {
                                                    this._pressFinishBtn()
                                                }} style={styles.button2}>
                                                    <Text style={styles.btnText}>{"结算"}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => {
                                                    this._pressDetailsBtn()
                                                }} style={styles.button}>
                                                    <Text style={styles.btnText}>{"订单详情"}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                    contentViewStyle={{
                                        height: items.length * 0.12 * Screen.height + 0.06 * Screen.height
                                    }}
                                />
                            );
                            break;
                        case 2:
                            wanteds.push(
                                <BRExpandableView
                                    color={1}
                                    initialShowing={1}
                                    moduleImg={{uri: icon.order}}
                                    // 此处需要对destination进行数字转义
                                    moduleName={"O.No: " + this.state.OrderList[wantedNum].data[tradeNum].TradeInfo.TradeID + " to " + AreaTransfer(this.state.OrderList[wantedNum].data[tradeNum].WantInfo[0].Destination)}
                                    moduleContent={
                                        <View>
                                            <ItemList viewWidth={0.96 * Screen.width} items={items}/>
                                            <View style={{
                                                width: 0.96 * Screen.width,
                                                height: 0.06 * Screen.height,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                paddingLeft: 10,
                                            }}>
                                                <OrderState state={2}/>
                                                <TouchableOpacity onPress={() => {
                                                    this._pressDetailsBtn()
                                                }} style={styles.button}>
                                                    <Text style={styles.btnText}>{"订单详情"}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                    contentViewStyle={{
                                        height: items.length * 0.12 * Screen.height + 0.06 * Screen.height
                                    }}
                                />
                            );
                            break;
                    }
                }
            }
        }
        // console.warn(wanteds.length);
        if (wanteds.length === 0) {
            wanteds.push(
                <View style={{
                    width: Screen.width,
                    height: 0.855 * Screen.height - Screen.STATUSBAR_HEIGHT - 39,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize: 22, color: "#CDCDCD"}}>还没有订单呢</Text>
                </View>
            );
        }
        return wanteds;
    }

    _pressDetailsBtn = (data) => {
        //
        ToastAndroid.show("功能开发中", ToastAndroid.SHORT);

        // console.warn(data);
        // // if (data.TradeInfo.State === 0) {
        // //     this.state.leftBtnText = "结 算";
        // //     this.state.rightBtnText = "好 的";
        // //     this.state.BRDialogContent =
        // //         <View style={{
        // //             justifyContent: 'center',
        // //             borderTopLeftRadius: 0.030 * Screen.width,
        // //             borderTopRightRadius: 0.030 * Screen.width,
        // //             width: 0.9 * Screen.width,
        // //             height: 0.3 * Screen.height
        // //         }}>
        // //             <Text>{data.WantInfo.Destination + " " + data.WantInfo.DDetails}</Text>
        // //             <Text>{"大师兄："}</Text>
        // //             <Text>{"备注：" + data.WantInfo.Note}</Text>
        // //         </View>
        // //     ;
        // //     this._pressDialogLeftBtn = () => {
        // //         socketUtil.sendAndReceive(
        // //             "",
        // //             (msg) => {
        // //
        // //             }
        // //         )
        // //     };
        // //     this._pressDialogRightBtn = () => {
        // //         this.setState({
        // //             brDialogVisibility: false,
        // //         })
        // //     };
        // // }
        // // else {
        // //     this.state.leftBtnText = "-";
        // //     this.state.rightBtnText = "好 的";
        // //     this.state.BRDialogContent =
        // //         <Text>订单详情2</Text>
        // //     ;
        // //     this._pressDialogLeftBtn = () => {
        // //         //
        // //     };
        // //     this._pressDialogRightBtn = () => {
        // //         this.setState({
        // //             brDialogVisibility: false,
        // //         })
        // //     };
        // // }
        // this.setState({
        //     brDialogVisibility: true,
        // })
    };

    _pressFinishBtn = (data) => {
        ToastAndroid.show("功能开发中", ToastAndroid.SHORT);

        // socketUtil.sendAndReceive(
        //     "{\"type\":117,\"state\":0,\"data\":{\"TradeID\":" + data.TradeInfo.TradeID + "}}EOS",
        //     (msg) => {
        //         if (JSON.parse(msg).state === 0) {
        //             ToastAndroid.show("订单结算完成！", ToastAndroid.SHORT);
        //             // 刷新方法在父组件啊...
        //         }
        //     }
        // );
    };

    _pressDialogLeftBtn = () => {
        // 在_pressDetailsBtn中修改
    };

    _pressDialogRightBtn = () => {
        // 在_pressDetailsBtn中修改
    };
}

const styles = StyleSheet.create({
    // 按钮
    button: {
        // paddingLeft: 7,
        // paddingRight: 7,
        position: 'absolute',
        right: 10,
        // top: 0.7 * Screen.height + 0.5 * Screen.STATUSBAR_HEIGHT,
        height: 0.05 * Screen.height,
        width: 0.225 * Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0.025 * Screen.height,
        backgroundColor: '#CCCCCC',
        paddingLeft: 5,
        paddingRight: 5
    },
    button2: {
        // paddingLeft: 7,
        // paddingRight: 7,
        position: 'absolute',
        right: 20 + 0.225 * Screen.width,
        // top: 0.7 * Screen.height + 0.5 * Screen.STATUSBAR_HEIGHT,
        height: 0.05 * Screen.height,
        width: 0.15 * Screen.width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0.025 * Screen.height,
        backgroundColor: '#CCCCCC',
        paddingLeft: 5,
        paddingRight: 5
    },
    // 按钮文字
    btnText: {
        color: '#000000',
        fontSize: 16,
        // fontWeight: 'bold'
    },
});
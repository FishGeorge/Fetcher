import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView, TextInput, ToastAndroid
} from 'react-native';
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import icon from "../../../common/icon"
import ItemList from "../../../components/ItemList";
import AreaTransfer from "../../../utils/AreaTransfer";
import TimeUtil from "../../../utils/TimeUtil";
import Checkbox from "../../../components/Checkbox";
// import {MapView} from "react-native-amap3d";

export default class InformationFillOut_B extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            personInfo: {
                NickName: "李元亨",
                PhoneNumber: "158xxxxxxxx",
                UserID: ""
            },
            Location: 53,
            items: this.props.navigation.state.params.items,
            totalPrice: this.props.navigation.state.params.totalPrice,
            AddrInfoContent: this._renderAddrInfoContent(),
            ArvTimeContent: this._renderArvTimeContent(),
            NoteContent: this._renderNoteContent(),
            ItemList: this._renderItemList(),
            DetailArea: "",
            TimeHour: "",
            TimeMin: "",
            Note: "",
            NotDoor: false,
            ItemIDList: []
        }
    }

    // 获取personInfo和Location
    componentWillMount() {
        storage.load({
            key: 'hasLogined',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({
                personInfo: {
                    NickName: ret.NickName,
                    PhoneNumber: ret.PhoneNumber,
                    UserID: ret.UserID
                }
            });
        }).catch(err => {
            // shouldn't go here
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri: icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                    <View style={styles.infoView}>
                        <Text style={{fontSize: 17, color: "#FFFFFF"}}>订单配送至</Text>
                        <View style={styles.addrView}>
                            <Image source={{uri: icon.locationC}}
                                   style={{height: 0.04 * Screen.height, width: 0.04 * Screen.height}}/>
                            <Text ref='addr_Text'
                                  style={{
                                      paddingLeft: 5,
                                      fontSize: 20,
                                      color: "#000000"
                                  }}>{AreaTransfer(this.state.Location)}</Text>
                            <Text onPress={() => this._changeAddr()}
                                  style={{
                                      paddingLeft: 10,
                                      bottom: 0,
                                      textDecorationLine: 'underline',
                                      fontSize: 12
                                  }}>{" 有误?"}</Text>
                        </View>
                        <View style={styles.personView}>
                            <Text style={styles.personTxt}>{this.state.personInfo.NickName + " "}</Text>
                            <Text style={styles.personTxt}>{" " + this.state.personInfo.PhoneNumber}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={{
                    paddingTop: 0.005 * Screen.height,
                    paddingBottom: 0.005 * Screen.height
                }}
                            showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"详细地址"}
                        moduleContent={this.state.AddrInfoContent}
                        contentViewStyle={{
                            height: 0.07 * Screen.height
                        }}
                    />
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"送抵时间"}
                        moduleContent={this.state.ArvTimeContent}
                        contentViewStyle={{
                            height: 0.07 * Screen.height
                        }}
                    />
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"有何要求？"}
                        moduleContent={
                            <View style={{
                                alignItems: 'center',
                                height: 0.075 * Screen.height,
                                width: 0.96 * Screen.width,
                            }}>
                                <View style={{
                                    height: 0.075 * Screen.height,
                                    width: 0.96 * Screen.width,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Image style={styles.iconStyle2} source={{uri: icon.todoor}}/>
                                    <Text style={{fontSize: 16, color: "#000000"}}>送货上门</Text>
                                    <Checkbox initialChecked={this.state.NotDoor} param1={""} param2={this} _onPress={
                                        (p1, p2) => {
                                            p2.state.NotDoor = !p2.state.NotDoor;
                                        }
                                    }/>
                                </View>
                            </View>
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.10 * Screen.height
                        }}
                    />
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"备注信息"}
                        moduleContent={this.state.NoteContent}
                        contentViewStyle={{
                            height: 0.07 * Screen.height
                        }}
                    />
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"物品清单"}
                        moduleContent={this.state.ItemList}
                        contentViewStyle={{
                            height: shoppingList.size * 0.12 * Screen.height
                        }}
                    />
                    {/*<BRExpandableView*/}
                    {/*color={1}*/}
                    {/*initialShowing={1}*/}
                    {/*moduleImg={{uri: icon.itemslist}}*/}
                    {/*moduleName={"test"}*/}
                    {/*moduleContent={*/}
                    {/*<MapView coordinate={{*/}
                    {/*latitude: 39.91095,*/}
                    {/*longitude: 116.37296,*/}
                    {/*}}/>*/}
                    {/*}*/}
                    {/*contentViewStyle={{*/}
                    {/*height: 0.5 * Screen.height*/}
                    {/*}}*/}
                    {/*/>*/}

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
                            <Text
                                style={{
                                    color: '#FF0000',
                                    fontSize: 15,
                                    position: 'absolute',
                                    right: 40
                                }}>{this.props.navigation.state.params.totalPrice / 100}</Text>
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
                            <Text style={{color: '#000000', fontSize: 16}}>{"估计派送费："}</Text>
                            <Text
                                style={{color: '#FF0000', fontSize: 15, position: 'absolute', right: 40}}>{1}</Text>
                            <Text
                                style={{color: '#000000', fontSize: 15, position: 'absolute', right: 20}}>{"元"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this._releaseWant()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: '#FFC750',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#000000', fontSize: 18}}>发布意向</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }

    // 定位“有误”文本点击事件
    _changeAddr() {
        // 弹出地图框修改定位
        //
        ToastAndroid.show("功能开发中", ToastAndroid.SHORT);
        // alert("哈！这功能还在开发中哦");
    }

    booleanTransfer(i) {
        if (i)
            return 1;
        else
            return 0;
    }

    // 发布意向
    _releaseWant() {
        // 上传数据
        for(let i = 0;i < this.state.items.length;i++){
            for(let j = 0;j < this.state.items[i].Quantity;j++)
                this.state.ItemIDList.push(this.state.items[i].ItemID);
        }

        console.warn(this.state.items);
        socketUtil.sendAndReceive(
            "{\"type\":103,\"state\":0,\"data\":{" +
            "\"BbID\":" + this.state.personInfo.UserID +
            ",\"Destination\":" + this.state.Location +
            ",\"AddressDetail\":\"" + this.state.DetailArea +
            "\",\"ArriveTime\":\"" + TimeUtil.getDate() + " " + this.state.TimeHour + ":" + this.state.TimeMin + ":00" +
            "\",\"AcceptND\":" + this.booleanTransfer(this.state.NotDoor) +
            ",\"Type\":" + 0 +
            ",\"ItemList\":" + JSON.stringify(this.state.ItemIDList) +
            ",\"Note\":\"" + this.state.Note +
            "\",\"Image\":" + "\"\"" +
            ",\"State\":" + 0 + "}}EOS",
            (msg) => {
                // 受到消息后返回
                global.OrderInitialTab = 0;
                this.props.navigation.navigate('Main', {selectedTab: 'orders'});
                ToastAndroid.show("意向已发布", ToastAndroid.SHORT);

                // 清空购物车
                global.shoppingList = new Map();
                global.quantityInCart = 0;
            }
        );
    }

    // 返回详细地址框内容
    _renderAddrInfoContent() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 0.07 * Screen.height,
                width: 0.96 * Screen.width,

            }}>
                <Text style={{
                    fontSize: 16,
                    width: 0.22 * Screen.width, color: "#000000", paddingLeft: 10
                }}>门牌号：</Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.74 * Screen.width,
                        borderWidth: 2,
                        borderTopColor: "#FFFFFF",
                        borderLeftColor: "#FFC750"
                    }}
                    onChangeText={this.onDetailAreaChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={' 反正就是具体点的地址啦'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
            </View>
        );
    }

    onDetailAreaChanged = (txt) => {
        this.state.DetailArea = txt;
    };

    _renderArvTimeContent() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 0.07 * Screen.height,
                width: 0.96 * Screen.width,

            }}>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.40 * Screen.width,
                    }}
                    onChangeText={this.onTimeHourChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={'=>'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
                <Text style={{fontSize: 16, width: 0.08 * Screen.width,}}>时</Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.40 * Screen.width,
                    }}
                    onChangeText={this.onTimeMinChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={'=>'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
                <Text style={{fontSize: 16, width: 0.08 * Screen.width,}}>分</Text>
            </View>
        );
    }

    onTimeHourChanged = (txt) => {
        this.state.TimeHour = txt;
    };

    onTimeMinChanged = (txt) => {
        this.state.TimeMin = txt;
    };

    _renderNoteContent() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 0.07 * Screen.height,
                width: 0.96 * Screen.width,

            }}>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.96 * Screen.width,
                    }}
                    onChangeText={this.onNoteChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={' 如需备注，轻击此处'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
            </View>
        );
    }

    onNoteChanged = (txt) => {
        this.state.Note = txt;
    };

    // 物品清单模块内容
    _renderItemList() {
        // console.warn(this.props.navigation.state.params.items);
        return (
            //<Text>Test</Text>
            <ItemList viewWidth={0.96 * Screen.width} items={this.props.navigation.state.params.items}
                      kindNum={shoppingList.size}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    iconStyle: {
        marginTop: 0.01 * Screen.height,
        marginLeft: 0.01 * Screen.height,
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    headText: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
        fontSize: 24,
        color: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.20 * Screen.height,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height,
    },
    infoView: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
    },
    personView: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    addrView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    personTxt: {
        fontSize: 16,
        color: "#000000"
    },
    scrollViewStyle: {
        alignItems: 'center'
    },
    iconStyle2: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
        marginRight: 0.01 * Screen.width,
    },
});
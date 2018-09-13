import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, ScrollView, ToastAndroid
} from 'react-native';
import Screen from "../../../utils/Screen";
import WantList from "../../../components/WantList";
import icon from "../../../common/icon"
import AreaTransfer from "../../../utils/AreaTransfer";
import TimeUtil from "../../../utils/TimeUtil";

const Img = {uri: icon.goback};

export default class Fetcher_ChooseWant extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            WantInfoList: [],
            WantAcceptedInfo: {
                FetcherID: this.props.navigation.state.params.WantedInfo.FetcherID,
                FetcherLocation: this.props.navigation.state.params.WantedInfo.StartingPoint,
                WantIDList: []
            },
            bottomView: [],
            presentWantedID: "",
        };
    }

    // 请求网络数据
    componentWillMount() {
        socketUtil.sendAndReceive(
            "{\"type\":104,\"state\":0,\"data\":{\"FetcherID\":" + this.props.navigation.state.params.WantedInfo.FetcherID +
            ",\"StartingPoint\":" + this.props.navigation.state.params.WantedInfo.StartingPoint +
            ",\"Destination\":" + this.props.navigation.state.params.WantedInfo.Destination +
            ",\"ArriveTime\":\"" + this.props.navigation.state.params.WantedInfo.ArriveTime +
            "\",\"AcceptBigSize\":" + this.transfer(this.props.navigation.state.params.WantedInfo.AcceptBigSize) +
            ",\"AcceptSE\":" + this.transfer(this.props.navigation.state.params.WantedInfo.AcceptSE) +
            ",\"State\":" + 0 + "}}EOS",
            (msg) => {
                if (JSON.parse(msg).state === 0) {
                    this.state.presentWantedID = JSON.parse(msg).WantedID;
                    for (let i = 0; i < JSON.parse(msg).data.length; i++) {
                        this.state.WantInfoList.push({
                            "want": i,
                            "wantInfo": JSON.parse(msg).data[i].WantInfo,
                            "wantIsChosen": false,
                            "itemData": []
                        });
                        for (let j = 0; j < JSON.parse(msg).data[i].data.length; j++) {
                            this.state.WantInfoList[i].itemData.push(JSON.parse(msg).data[i].data[j].ItemInfo[0]);
                            this.state.WantInfoList[i].itemData[j].Quantity = JSON.parse(msg).data[i].data[j].Quantity;
                        }
                    }
                    this.refs.wantList.setState({
                        ItemDatajson: this.state.WantInfoList
                    });
                    this.setState({
                        bottomView: this.renderBottom(),
                    });
                }
                else {
                    // ToastAndroid.show("拉取购物车信息失败", ToastAndroid.SHORT);
                }
            }
        );
    }

    componentDidMount() {

    }

    transfer(i) {
        if (i === true)
            return 1;
        else
            return 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={Img} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text style={styles.headText}>匹配到如下意向：</Text>
                </View>
                <WantList ref="wantList" that={this} _choose={function (i, that) {
                    that.state.WantInfoList[i].wantIsChosen = !that.state.WantInfoList[i].wantIsChosen;
                }}/>

                <View ref="bottomView"
                      style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    {this.state.bottomView}
                </View>
            </View>
        );
    }

    renderBottom() {
        if (this.state.WantInfoList.length !== 0) {
            return (
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
                            <Text style={{color: '#000000', fontSize: 16}}>{"估计额外路程："}</Text>
                            <Text
                                style={{color: '#FF0000', fontSize: 15, position: 'absolute', right: 55}}>{"xxx"}</Text>
                            <Text
                                style={{color: '#000000', fontSize: 15, position: 'absolute', right: 20}}>{"千米"}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: 0.65 * Screen.width,
                            height: 0.04 * Screen.height,
                            alignItems: 'center',
                            paddingLeft: 20
                        }}>
                            <Text style={{color: '#000000', fontSize: 16}}>{"估计额外耗时："}</Text>
                            <Text
                                style={{color: '#FF0000', fontSize: 15, position: 'absolute', right: 55}}>{"xxx"}</Text>
                            <Text
                                style={{color: '#000000', fontSize: 15, position: 'absolute', right: 20}}>{"分钟"}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this._pressButton()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: '#FFC750',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#000000', fontSize: 18, paddingLeft: 10}}>我带！</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <TouchableOpacity onPress={() => {
                    ToastAndroid.show("意向已挂起，继续等待", ToastAndroid.SHORT);
                    this.props.navigation.navigate('Main', {selectedTab: 'fetcher'});
                }}>
                    <View style={{
                        width: 1 * Screen.width,
                        height: 0.08 * Screen.height,
                        backgroundColor: '#FFC750',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: '#000000', fontSize: 18, paddingLeft: 10}}>返回主页</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    _goBack() {
        this.props.navigation.goBack();
    }

    _renderCheckImg(isChosen) {
        if (isChosen) return imgCheck;
        else return imgUnCheck;
    }

    _pressCheckBtn = (i) => {
        let ischosen = this.state.isChosen;
        ischosen[i] = ischosen[i] ? 0 : 1;
        this.setState({
            isChosen: ischosen,
        });
    };

    _pressButton() {
        for (let i = 0; i < this.refs.wantList.state.ItemDatajson.length; i++) {
            if (this.refs.wantList.state.ItemDatajson[i].wantIsChosen) {
                this.state.WantAcceptedInfo.WantIDList.push(this.state.WantInfoList[i].wantInfo.WantID)
            }
        }
        socketUtil.sendAndReceive(
            "{\"type\":107,\"state\":0,\"data\":{\"FetcherID\":" + this.state.WantAcceptedInfo.FetcherID +
            ",\"WantIDList\":[" + this.state.WantAcceptedInfo.WantIDList +
            "],\"FetcherLocation\":" + this.state.WantAcceptedInfo.FetcherLocation +
            ",\"WantedID\":" + this.state.presentWantedID + "}}EOS",
            (msg) => {
            }
        );
        global.OrderInitialTab = 1;
        this.props.navigation.navigate('Main', {selectedTab: 'orders'});
        ToastAndroid.show("匹配成功，已成立订单", ToastAndroid.SHORT);
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
    iconStyle2: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
        marginRight: 0.01 * Screen.width,
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
        height: 0.15 * Screen.height,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height,
    },
    scrollViewStyle: {
        alignItems: 'center',
        width: Screen.width,
        marginTop: 0.0075 * Screen.height,
    },
    wantCheck: {
        width: 0.96 * Screen.width,
        height: 0.04 * Screen.height,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    wantCheckText: {
        fontSize: 15,
        color: "#000000",
    }
});
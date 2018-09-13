import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    RefreshControl
} from 'react-native';
import Screen from "../../../utils/Screen";
import FetcherOrderList from "./FetcherOrderList";

export default class FetcherOrdersHost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // modalVisibility: false,
            // currentWantedId: '',
            OrderList: [],
            refreshing: false,
        }
    }

    render() {
        return (
            <ScrollView
                refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}/>}
                style={{flex: 1, paddingTop: 0.005 * Screen.height, paddingBottom: 0.005 * Screen.height}}>
                <FetcherOrderList ref="FetcherOrderList"/>
            </ScrollView>
        )
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.refresh().then(() => {
            this.setState({refreshing: false});
        });
    };

    // 查询订单
    refresh() {
        return storage.load({
            key: 'hasLogined',
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            socketUtil.sendAndReceive(
                "{\"type\":113,\"state\":0,\"data\":{\"FetcherID\":" + ret.UserID + "}}EOS",
                (msg) => {
                    // console.warn(msg);
                    if (JSON.parse(msg).state === 0) {
                        this.state.OrderList = JSON.parse(msg).data;
                        this.refs.FetcherOrderList.setState({OrderList: this.state.OrderList});
                    }
                    else {
                        // ToastAndroid.show("拉取购物车信息失败", ToastAndroid.SHORT);
                    }
                }
            );
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    componentDidMount() {
        this.refresh();
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
        width: 60,
        borderRadius: 0.032 * Screen.width,
        justifyContent: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
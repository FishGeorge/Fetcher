import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import PropTypes from 'prop-types';
import FetcherOrdersHost from './FetcherOrdersHost'
import BigBOrdersHost from "./BigBOrdersHost";
import Screen from "../../../utils/Screen";

let OrderInitialTab = 0;
global.OrderInitialTab = OrderInitialTab;

export default class OrderHost extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headText}>历史订单</Text>
                </View>
                <ScrollableTabView
                    initialPage={OrderInitialTab}
                    renderTabBar={() => <DefaultTabBar style={{height: 35, backgroundColor: '#FFC750'}}/>}
                    tabBarUnderlineStyle={{backgroundColor: '#FFFFFF', height: 4, marginBottom: -2}}
                    tabBarActiveTextColor='#FFFFFF'
                    tabBarInactiveTextColor='#BEBEBE'
                    tabBarTextStyle={{fontSize: 16, bottom: -5}}>
                    <BigBOrdersHost tabLabel='大师兄' {...this.props}/>
                    <FetcherOrdersHost tabLabel='带哥' {...this.props}/>
                </ScrollableTabView>
            </View>
        );
    }
}

OrderHost.propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: Screen.width,
        flex: 1,
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.07 * Screen.height,
        justifyContent: 'center'
    },
    headText: {
        // marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
        fontSize: 20,
        color: '#FFFFFF',
    },
});
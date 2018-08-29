/**
 *  这个界面实际是个总界面，只不过名字起得有点问题
 */

import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import {Constants} from "../../../common/Constants";
import PropTypes from 'prop-types';
import FetcherOrdersHost from './FetcherOrdersHost'
import BigBrotherHostOrdersHost from "./BigBrotherHostOrdersHost";


export default class FetcherOrders extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['1Fetcher', '2BigBrother']
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar/>}>
                    <FetcherOrdersHost tabLabel='Fetcher' {...this.props}/>
                    <BigBrotherHostOrdersHost tabLabel='BigBrother' {...this.props}/>
                </ScrollableTabView>
            </View>
        );
    }
}

FetcherOrders.propTypes = {
    goToPage: PropTypes.func, // 跳转到对应tab的方法
    activeTab: PropTypes.number, // 当前被选中的tab下标
    tabs: PropTypes.array, // 所有tabs集合
}

const styles = StyleSheet.create({
    container: {
        width: Constants.DEVICE_WIDTH,
        flex: 1,
        marginTop: 22,
    },
    scrollStyle: {
        flex: 1,
    },
    tabContainer: {
        width: Constants.DEVICE_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
    },
    tabStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
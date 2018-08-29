/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
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
import FetcherOrders from './FetcherOrders';
import BigBrotherOrders from './BigBrotherOrders';
import {Constants} from "../../common/Constants";
import PropTypes from 'prop-types';



export default class OrdersHost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['Fetcher', 'BigBrother']
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar/>}>
                    <View tabLabel='Fetcher'>
                        <FetcherOrders/>
                    </View>
                    <View tabLabel='BigBrother'>
                    <BigBrotherOrders/>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
}

OrdersHost.propTypes = {
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
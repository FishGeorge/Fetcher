import React, {PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    ToastAndroid
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import FetcherHost from "../1Fetcher/0HostPage";
import BigBrotherHost from "../2BigBrother/0HostPage";
import OrderHost from "../3Orders/0HostPage";
import Screen from "../../utils/Screen";
import SearchDialog from "../../components/SearchDialog";
import icon from '../../common/icon';

const TAB_NORMAL_1 = {uri: icon.fhost};
const TAB_PRESS_1 = {uri: icon.fhost_on};
const TAB_NORMAL_2 = {uri: icon.bhost};
const TAB_PRESS_2 = {uri: icon.bhost_on};
const TAB_NORMAL_3 = {uri: icon.orderspage};
const TAB_PRESS_3 = {uri: icon.orderspage_on};

// 重置路由以禁用返回
// const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//         NavigationActions.navigate({routeName: 'Main'}),
//     ],
// });

export default class MainPage extends PureComponent {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: this.props.navigation.state.params.selectedTab,
        };
        // 执行重置路由方法
        // this.props.navigation.dispatch(resetAction);
    }

    componentWillMount() {
        // 读取
        storage.load({
            key: 'initialPage',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            //
            // console.warn(ret);
            this.setState({selectedTab: ret});
            // console.warn(this.state.selectedTab);
        }).catch(err => {
            // 这里不能出错
        });
    }

    render() {
        if (this.state.selectedTab === "") {
            this.state.selectedTab = "bigbrother";
        }
        return (
            <View style={styles.pageContainer}>
                <TabNavigator tabBarPosition='bottom' tabBarStyle={{height: 0.075 * Screen.height}}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'fetcher'}
                        // title="fetcher"
                        renderIcon={() => <Image style={styles.TabBtn1} source={TAB_NORMAL_1}/>}
                        renderSelectedIcon={() => <Image style={styles.TabBtn1} source={TAB_PRESS_1}/>}
                        onPress={() => this.setState({selectedTab: 'fetcher'})}>
                        <FetcherHost {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'bigbrother'}
                        // title="bigbrother"
                        renderIcon={() => <Image style={styles.TabBtn2} source={TAB_NORMAL_2}/>}
                        renderSelectedIcon={() =>
                            <View style={{
                                height: 0.075 * Screen.height,
                                width: 0.3333 * Screen.width,
                                bottom: -0.019 * Screen.height,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FFC750',
                                borderBottomLeftRadius: 0.03 * Screen.height,
                                borderBottomRightRadius: 0.03 * Screen.height
                            }}>
                                <Image style={styles.TabBtn2_} source={TAB_PRESS_2}/>
                            </View>
                        }
                        onPress={() => this.click()}>
                        <BigBrotherHost {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'orders'}
                        // title="orders"
                        renderIcon={() => <Image style={styles.TabBtn3} source={TAB_NORMAL_3}/>}
                        renderSelectedIcon={() => <Image style={styles.TabBtn3} source={TAB_PRESS_3}/>}
                        onPress={() => this.setState({selectedTab: 'orders'})}>
                        <OrderHost {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
                <SearchDialog ref="searchDialog"/>
            </View>
        )
    }

    click() {
        if (this.state.selectedTab === 'bigbrother') {
            this._showSearchDialog();
        }
        else
            this.setState({selectedTab: 'bigbrother'});
    }

    _showSearchDialog() {
        this.refs.searchDialog.show(this._callbackSearchDialog.bind(this));
    }

    _callbackSearchDialog(text) {
        this.state.searchTxt = text;
        if (this.state.searchTxt === "") {
            setTimeout(() => {
                ToastAndroid.show("无搜索内容", ToastAndroid.SHORT);
            }, 500);
        }
        else {
            setTimeout(() => {
                ToastAndroid.show("搜索了" + text, ToastAndroid.SHORT);
            }, 500);
        }
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        height: Screen.height - Screen.STATUSBAR_HEIGHT,
    },
    TabBtn1: {
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
        // resizeMode: 'stretch',
    },
    TabBtn2: {
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    TabBtn2_: {
        width: 0.042 * Screen.height,
        height: 0.042 * Screen.height,
    },
    TabBtn3: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
    },
});
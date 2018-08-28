import React, {PureComponent} from 'react';
import {Platform, StyleSheet, Text, View,Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Fetcher from '../pages/Fetcher/Fetcher';
import BigBrother from '../pages/BigBrother/BigBrother';
import Orders from '../pages/Orders/Orders';
import {Constants} from "../common/Constants";

const TAB_NORMAL_1=require('../pic/icon_message.png');
const TAB_PRESS_1=require('../pic/icon_search.png');
const TAB_NORMAL_2=require('../pic/icon_message.png');
const TAB_PRESS_2=require('../pic/icon_search.png');
const TAB_NORMAL_3=require('../pic/order_normal.png');
const TAB_PRESS_3=require('../pic/order_press.png');

export default class TabBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            selectedTab:'fetcher',
        }
    }

    click(){
        if(this.state.selectedTab == 'bigbrother'){

        }
        else
            this.setState({ selectedTab: 'bigbrother' });
    }

    render() {
        return (
            <View style={styles.pageContainer}>

                <TabNavigator tabBarPosition = 'bottom'>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'fetcher'}
                        title="fetcher"
                        renderIcon={() => <Image source={TAB_NORMAL_1} />}
                        renderSelectedIcon={() => <Image source={TAB_PRESS_1} />}
                        onPress={() => this.setState({ selectedTab: 'fetcher' })}>
                        <Fetcher/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'bigbrother'}
                        title="bigbrother"
                        renderIcon={() => <Image source={TAB_NORMAL_2} />}
                        renderSelectedIcon={() => <Image source={TAB_PRESS_2} />}
                        onPress={()=>this.click()}>
                        <BigBrother/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'orders'}
                        title="orders"
                        renderIcon={() => <Image source={TAB_NORMAL_3} />}
                        renderSelectedIcon={() => <Image source={TAB_PRESS_3} />}
                        onPress={() => this.setState({ selectedTab: 'orders' })}>
                        <Orders/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        marginTop: Constants.IS_IOS ? 20 : 0,
        height: Constants.DEVICE_HEIGHT - (Constants.IS_IOS ? 20 : 0)
    }
});
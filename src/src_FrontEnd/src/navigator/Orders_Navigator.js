import React, { Component } from 'react';
import { View, Text} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import FetcherOrders from "../pages/3Orders/0HostPage/index";

export default class Orders_Navigator extends Component {
    render() {
        //组件名字
        return (
            <Navigator
                {...this.props}
                initialRoute={{ name: 'FetcherOrders', component: FetcherOrders }}
                //配置场景
                configureScene=
                    {
                        (route) => {
                            return ({
                                ...Navigator.SceneConfigs.PushFromRight,
                                gestures: null
                            });
                        }
                    }
                renderScene={
                    (route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }
                } />
        );
    }
}
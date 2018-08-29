import React, { Component } from 'react';
import { View, Text} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import BigBrotherHost from '../pages/2BigBrother/0HostPage/index';

export default class BigB_Navigator extends Component {
    render() {
        //组件名字
        let defaultName = 'BigBrotherHost';
        //组件的Class用来实例化成<Component/>标签的
        let defaultComponent = BigBrotherHost;
        return (
            <Navigator
                //这个指定了默认的页面，也就是启动app之后会看到界面的第一屏。 需要填写两个参数: name 跟 component。
                //（注意这里填什么参数纯粹是自定义的，因为这个参数也是你自己发自己收，自己在renderScene方法中处理。
                // 我们这里示例用了两个参数，但其实真正使用的参数只有component）

                initialRoute={{ name: defaultName, component: defaultComponent }} //初始化场景

                //页面跳转动画  可以返回多个动画  使用||返回

                configureScene={(route) => {
                    return Navigator.SceneConfigs.HorizontalSwipeJump;    //设置场景的切换方式
                }}
                //渲染场景  route中就是我们自定义的 name 和 component
                //navigator 就是Navigator对象

                renderScene={(route, navigator) => {
                    let Component = route.component;

                    //Component 是route的component参数值  在路由中初始化的component的参数值是 defaultComponent
                    //所以 Component组件就是FirstPageComponent组件

                    return <Component {...route.params} navigator={navigator} />
                }} />
        );
    }
}
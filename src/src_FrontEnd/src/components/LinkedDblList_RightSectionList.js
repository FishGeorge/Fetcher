import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SectionList,
    DeviceEventEmitter,
} from 'react-native';
import Screen from "../utils/Screen";

let sectionData = [];

export default class LinkedDblList_RightSectionList extends Component {
    // 构造
    constructor(props) {
        super(props);
        sectionData = this.props.data;
        this.state = {
            sectionData: sectionData
        };
    }

    componentDidMount() {
        // 收到监听
        this.listener = DeviceEventEmitter.addListener('toRight', (e) => {
            // console.log(e + 1) // 左边点击了第几行
            // console.log(sectionData) // 数据源
            // console.log(sectionData[e])
            // console.log(sectionData[e].data.length)
            // SectionList实现scrollToIndex需要修改VirtualizedSectionList和SectionList源码
            if (e > 0) {
                // 计算出前面有几行
                let count = 0;
                for (let i = 0; i < e; i++) {
                    count += sectionData[i].data.length + 1
                }
                this.refs.sectionList.scrollToLocation({animated: true, itemIndex: count})
            } else {
                // 如果左边点击第一行,右边则回到第一行
                this.refs.sectionList.scrollToLocation({animated: true, itemIndex: 0})
            }
        });
    }

    render() {
        return (
            <SectionList
                ref='sectionList'
                style={{width: Screen.width - 80}}
                renderSectionHeader={(section) => this.sectionComp(section)} //头
                renderItem={(item) => this.renderItem(item)} //行
                ItemSeparatorComponent={() => {
                    return (<View style={{height: 1, backgroundColor: 'black'}}/>)
                }}//分隔线
                sections={this.state.sectionData} //数据
                onViewableItemsChanged={(info) => this.itemChange(info)}  //滑动时调用
            />
        );
    }

    componentWillUnmount() {
        // 移除监听
        this.listener.remove();
    }

    // 行
    renderItem = (item) => {
        return (
            <View style={{height: 60, justifyContent: 'center', marginLeft: 15}}>
                <Text>{item.item.name}</Text>
            </View>
        )
    };

    // 头
    sectionComp = (section) => {
        return (
            <View style={{height: 30, backgroundColor: '#DEDEDE', justifyContent: 'center', alignItems: 'center'}}>
                <Text>{section.section.title}</Text>
            </View>
        )
    };

    itemChange = (info) => {
        let title = info.viewableItems[0].item.title;
        let reg = new RegExp("^[0-9]*$");
        if (reg.test(title)) {
            // 发监听
            DeviceEventEmitter.emit('toLeft', title);
        }
    }
}

const styles = StyleSheet.create({

});
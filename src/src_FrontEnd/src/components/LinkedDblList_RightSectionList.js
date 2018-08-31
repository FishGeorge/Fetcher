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
            this.refs.sectionList.scrollToLocation({animated: true, sectionIndex: e, itemIndex: -1, viewPosition: 0})
        });
    }

    render() {
        return (
            <SectionList
                ref='sectionList'
                style={{width: 0.8 * Screen.width}}
                // Section头
                renderSectionHeader={(section) => this._sectionComp(section)}
                // 行
                renderItem={(item) => this._renderItem(item)}
                // 尾部填白
                // ListFooterComponent={<View style={{height:0.5*Screen.height}}/>}
                // 分隔线
                ItemSeparatorComponent={() => {
                    return (<View style={{height: 1, backgroundColor: 'black'}}/>)
                }}
                // 数据
                sections={this.state.sectionData}
                // 滑动时调用
                onViewableItemsChanged={(info) => this._itemChange(info)}
                // section吸顶
                stickySectionHeadersEnabled={true}
            />
        );
    }

    componentWillUnmount() {
        // 移除监听
        this.listener.remove();
    }

    // 行
    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.cellAction(item)}>
                <View style={{height: 60, justifyContent: 'center', marginLeft: 15}}>
                    <Text>{item.item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 头
    _sectionComp = (section) => {
        return (
            <View style={{height: 30, backgroundColor: '#DEDEDE', justifyContent: 'center', alignItems: 'center'}}>
                <Text>{section.section.title}</Text>
            </View>
        )
    };

    // 点击某行
    cellAction = (item) => {
        alert(item.index);
    };

    _itemChange = (info) => {
        let title = info.viewableItems[0].item.title;
        let reg = new RegExp("^[0-9]+$");
        if (reg.test(title)) {
            // 发监听
            // console.warn(title);
            DeviceEventEmitter.emit('toLeft', title);
        }
    }
}

const styles = StyleSheet.create({});
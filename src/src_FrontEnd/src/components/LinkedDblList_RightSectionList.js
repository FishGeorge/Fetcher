import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    SectionList,
    DeviceEventEmitter, FlatList,
} from 'react-native';
import Screen from "../utils/Screen";
import Item from "./Item";
import AreaTransfer from "../utils/AreaTransfer";

export default class LinkedDblList_RightSectionList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            sectionData: this.props.data
        };
    }

    componentDidMount() {
        // 收到监听
        this.listener = DeviceEventEmitter.addListener('toRight', (e) => {
            // this.refs.sectionList.scrollToLocation({animated: true, sectionIndex: e, itemIndex: -1, viewPosition: 0})
            // this.setState({
            //    sectionData: e
            // });
            new Promise((resolve) => {
                setTimeout(() => {
                    this.setState({
                        sectionData: []
                    });
                    resolve();
                }, 10);
            }).then(() => {
                this.setState({
                    sectionData: e
                })
            });
        });
    }

    render() {
        return (
            <SectionList
                nestedScrollEnabled={true}
                ref='sectionList'
                style={{width: 0.82 * Screen.width}}
                // Section头
                renderSectionHeader={(section) => this._sectionComp(section)}
                // 行
                renderItem={(item) => this._renderItem(item)}
                // 尾部填白
                // ListFooterComponent={<View style={{height:0.5*Screen.height}}/>}
                // 分隔线
                ItemSeparatorComponent={() => {
                    return (<View style={{height: 3, backgroundColor: '#FFFFFF'}}/>)
                }}
                // 数据
                sections={this.state.sectionData}
                // 滑动时调用
                onViewableItemsChanged={(info) => this._itemChange(info)}
                // section吸顶
                stickySectionHeadersEnabled={true}
                // 绑定key
                keyExtractor={this._keyExtractor}
            />
        );
    }

    _keyExtractor(item: Object, index: number) {
        // return item.item.key;
        return index;
    }

    componentWillUnmount() {
        // 移除监听
        // this.listener.remove();
    }

    // 行
    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.clickItem(item)}>
                <Item
                    viewWidth={0.82 * Screen.width}
                    itemInfo={item.item}
                    hasQuantity={0}
                    _renderPlusBtn={this.props._renderPlusBtn}
                    that={this.props.that}
                />
            </TouchableOpacity>
        )
    };

    // 头
    _sectionComp = (section) => {
        return (
            <View style={{
                paddingLeft: 8,
                paddingTop: 8,
                height: 35,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 13, fontWeight: 'bold', color: '#000000'
                }}>{section.section.locName}</Text>
            </View>
        )
    };

    // 点击某行
    clickItem = (item) => {
        alert(
            item.item.ItemName + "\n" +
            "价格：" + item.item.Price / 100 + "元\n" +
            "重量：" + item.item.Weight + "g\n" +
            "地点：" + AreaTransfer(item.item.Location) + "\n"
        );
    };

    _itemChange = (info) => {
        let title = info.viewableItems[0].item.title;
        let reg = new RegExp("^[0-9]+$");
        if (reg.test(title)) {
            // 发监听
            // console.warn(title);
            // DeviceEventEmitter.emit('toLeft', title);
        }
    }
}

const styles = StyleSheet.create({});
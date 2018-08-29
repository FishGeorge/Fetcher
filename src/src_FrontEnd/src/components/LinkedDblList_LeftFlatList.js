import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    DeviceEventEmitter,
} from 'react-native';

export default class LinkedDblList_LeftFlatList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            cell: 0  // 默认选中第一行
        };
    }

    componentWillMount() {
        this.listener = DeviceEventEmitter.addListener('toLeft', (e) => {
            this.refs.flatList.scrollToIndex({animated: true, index: e-1 });
            this.setState({
                cell: e-1
            })
        });
    }

    render() {
        return (
            <FlatList
                ref='flatList'
                style={{width: 80}}
                // 数据源
                data={this.props.data}
                // 每一行render
                renderItem={(item) => this.renderRow(item)}
                // 分隔线
                ItemSeparatorComponent={() => {
                    return (<View style={{height: 1, backgroundColor: 'cyan'}}/>)
                }}
                // 使用json中的title动态绑定key
                keyExtractor={this.keyExtractor}
            />
        );
    }

    componentWillUnmount() {
        // 移除监听
        this.listener.remove();
    }

    // 使用json中的title动态绑定key
    keyExtractor(item: Object, index: number) {
        return item.title
    }

    // 每一行render
    renderRow = (item) => {
        return (
            <TouchableOpacity onPress={() => this.cellAction(item)}>
                <View style={{height: 60, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        height: 50,
                        width: 5,
                        backgroundColor: item.index === this.state.cell ? 'red' : 'rgba(0,0,0,0)'
                    }}/>
                    <Text style={{marginLeft: 20}}>{item.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 点击某行
    cellAction = (item) => {
        // alert(item.index)
        if (item.index < this.props.data.length - 1) {
            this.setState({
                cell: item.index
            });
            // 发监听
            DeviceEventEmitter.emit('toRight', item.index);
        }
    };
}

const styles = StyleSheet.create({});
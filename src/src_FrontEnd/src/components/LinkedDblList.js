import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    DeviceEventEmitter,
    SectionList,
    Image
} from 'react-native';
import Screen from "../utils/Screen";
import RightSectionList from "./LinkedDblList_RightSectionList";

export default class LinkedDblList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            data:this.props.data,
            cell: 0,  // 默认选中第一行
            SectionData: this.props.data[0].data,
        };
    }

    componentWillMount() {
        // 设置监听
        // this.listener = DeviceEventEmitter.addListener('toLeft', (e) => {
        //     this.refs.flatList.scrollToIndex({animated: true, index: e - 1});
        //     this.setState({
        //         cell: e - 1
        //     })
        // });
    }

    render() {
        return (
            <View style={{flexDirection: 'row',flex:1}}>
                <FlatList
                    nestedScrollEnabled={true}
                    ref='flatList'
                    style={{width: 0.18 * Screen.width,backgroundColor:'#DDDDDD'}}
                    // 数据源
                    data={this.state.data}
                    // 每一行render
                    renderItem={(item) => this._renderItem(item)}
                    // 分隔线
                    // ItemSeparatorComponent={() => {
                    //     return (<View style={{height: 1, backgroundColor: '#FFFFFF'}}/>)
                    // }}
                    // 尾部填白
                    ListFooterComponent={<View style={{flex:1}}/>}
                    // 隐藏纵向滚动条
                    showsVerticalScrollIndicator={false}
                    // 使用json中的title动态绑定key
                    keyExtractor={this._keyExtractor}
                />
                <RightSectionList ref='sectionList' cell={this.state.cell} data={this.state.SectionData} _renderPlusBtn={this.props._renderPlusBtn} that={this.props.that}/>

            </View>

        );
    }

    componentWillUnmount() {
        // 移除监听
        // this.listener.remove();
    }

    // 使用json中的title动态绑定key <=旧方法
    // 新中国=> 拿index绑就完事，反正一辈子用不到这个key
    _keyExtractor(item: Object, index: number) {
        return index.toString();
    }

    // 每一行render
    _renderItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this._cellAction(item)} style={{backgroundColor: '#dddddd'}}>
                <View style={{
                    width: 0.18 * Screen.width,
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: item.index === this.state.cell ? '#FFFFFF' : '#dddddd'
                }}>
                    {/*<View style={{height: 50, width: 5, backgroundColor: item.index === this.state.cell ? 'red' : 'rgba(0,0,0,0)'}}/>*/}
                    <Text style={{
                        marginLeft: 7,
                        fontSize: 13,
                        fontWeight: item.index === this.state.cell ? 'bold' : 'normal',
                        color: item.index === this.state.cell ? '#000000' : '#6d6d6d'
                    }}>{item.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    // 点击某行
    _cellAction = (item) => {
        // alert(item.index);
        if (item.index < this.state.data.length) {
            this.setState({
                cell: item.index,
                // SectionData:this.props.data[item.index].data
            });
            // this.refs.sectionList.setState({sectionData:[]});
            // this.refs.sectionList.setState({sectionData:this.state.data[item.index].data});
            // this.refs.sectionList.forceUpdate();
            // 发监听
            DeviceEventEmitter.emit('toRight', this.state.data[item.index].data);
        }
    };
}

const styles = StyleSheet.create({});
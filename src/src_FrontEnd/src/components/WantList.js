import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated,
    FlatList
} from 'react-native';
import Screen from "../utils/Screen";
import BRExpandableView from "./BRExpandableView";
import ItemList from "./ItemList";
import Checkbox from "./Checkbox";
import icon from "../common/icon"
import AreaTransfer from "../utils/AreaTransfer";

export default class WantList extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            ItemDatajson: (this.props.ItemDatajson)?this.props.ItemDatajson:[],
        };
    }

    componentWillMount() {

    }

    render() {
        if(this.state.ItemDatajson.length!==0){
            return (
                <FlatList
                    nestedScrollEnabled={true}
                    ref='flatList'
                    style={{width: Screen.width, backgroundColor: '#FFFFFF'}}
                    contentContainerStyle={{alignItems: 'center'}}
                    // 数据源
                    data={this.state.ItemDatajson}
                    // 每一行render
                    renderItem={this.renderItem.bind(this)}
                    // 分隔线
                    // ItemSeparatorComponent={() => {
                    //     return (<View style={{height: 1, backgroundColor: '#FFFFFF'}}/>)
                    // }}
                    // 尾部填白
                    ListFooterComponent={<View style={{flex: 1}}/>}
                    // 隐藏纵向滚动条
                    showsVerticalScrollIndicator={false}
                    // 使用json中的title动态绑定key
                    keyExtractor={this._keyExtractor}
                />
            );
        }
        else{
            return (
                <View style={{width:Screen.width,height:0.77*Screen.height-Screen.STATUSBAR_HEIGHT,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize: 22, color: "#CDCDCD"}}>暂无可选意向 请您稍后再试</Text>
                </View>
            );
        }
    }

    // 每一行render
    renderItem = ({item}) => {
        return (
            <View>
                <View style={styles.wantCheck}>
                    <Text style={styles.wantCheckText}>{"意向 " + (item.want + 1)}</Text>
                    <Checkbox initialChecked={false} param1={item.want} param2={this.props.that} _onPress={this.props._choose}/>
                </View>
                <BRExpandableView
                    color={1}
                    initialShowing={1}
                    moduleImg={{uri: icon.itemslist}}
                    moduleName={this._setModuleName(item)}
                    moduleContent={this._renderViewContent(item)}
                    contentViewStyle={this._renderViewContentStyle(item)}
                />
            </View>
        )
    };

    _keyExtractor = (item, index) => index.toString();

    _setModuleName = (item) => {
        return item.wantInfo.ArriveTime + " to " + AreaTransfer(item.wantInfo.Destination) + " " + item.wantInfo.AddressDetail;
    };

    _renderViewContent = (item) => {
        let Content = [];
        for (let i = 0; i < item.itemData.length; i++) {
            Content.push({
                key: i,
                Picture: item.itemData[i].Picture,
                ItemName: item.itemData[i].ItemName,
                Price: item.itemData[i].Price,
                Quantity: item.itemData[i].Quantity,
                Type: item.itemData[i].Type,
                Address: item.itemData[i].Address,
                Size: item.itemData[i].Size,
            });
        }
        return (
            <ItemList
                items={Content} viewWidth={Screen.width}
            />
        );
    };

    _renderViewContentStyle = (item) => {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            height: item.itemData.length * 0.12 * Screen.height
        };
    };
}

const styles = StyleSheet.create({
    wantCheck: {
        width: 0.96 * Screen.width,
        height: 0.04 * Screen.height,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    wantCheckText: {
        fontSize: 15,
        color: "#000000",
    }
});
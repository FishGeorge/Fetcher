import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Success from "../2SuccessPage/index"
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";

type Props = {};
const Img = require('../../../pic/icon_return.png');
const imgLoc = require('../../../pic/当地.png');

export default class InformationFillOut_B extends Component<Props> {
    constructor(props) {
        super(props);
        // this._onChangeText = this._onChangeText.bind(this);
        this.state = {
            AddrInfoContent: this._renderAddrInfoContent(),
            ItemList: this._renderItemList(),
        }
    }

    render() {
        return (
            <View style={{flex: 1,
                backgroundColor: '#FFC777'}}>
                <View style={{
                    width: Screen.width,
                    // height: 0.06 * Screen.height,
                }}>
                    <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={Img} style={{height: 0.05 * Screen.height, width: 0.05 * Screen.height}}/>
                    </TouchableOpacity>
                    <View style={styles.infoView}>
                        <Text>订单配送至</Text>
                        <View style={styles.addrView}>
                            <Image source={imgLoc} style={{height: 0.05 * Screen.height, width: 0.05 * Screen.height}}/>
                            <Text ref='addr_Text'>计算机楼</Text>
                            <Text onPress={() => this._changeAddr()}
                                  style={{textDecorationLine: 'underline'}}>{" 有误?"}</Text>
                        </View>
                        <View style={styles.personView}>
                            <Text ref='nickName_Text'>张三</Text>
                            <Text ref='phoneNum_Text'>158xxxxxxxx</Text>
                        </View>
                    </View>
                    <View style={styles.viewBlank}/>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.outer} showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"详细地址"}
                        moduleContent={this.state.AddrInfoContent}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"物品清单"}
                        moduleContent={this.state.ItemList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.5 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                </ScrollView>
                <View style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    <View style={{width: 0.65 * Screen.width, height: 0.08 * Screen.height,backgroundColor:"gray"}}>
                        <Text>总价：xxx</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._releaseWant()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white'}}>发布意向</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // 返回按钮点击事件
    _goBack() {
        //获取SampleComponent中创建的Navigator对象
        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        //这里对navigator进行了判断  如果navigator(导航器)对象存在的情况下 在进行操作
        if (navigator) {
            navigator.pop();
        }
    }

    // 定位“有误”文本点击事件
    _changeAddr() {
        // 弹出地图框修改定位
        alert("o");
    }

    // 发布意向
    _releaseWant() {
        // 上传数据

        // 跳转等待界面
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                passProps:{
                    ItemList:this.state.ItemList,
                },
                name: 'Success',
                component: Success
            });
        }
    }

    // 详细地址模块内容
    _renderAddrInfoContent() {
        return (
            <View>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </View>
        );
    }

    // 物品清单模块内容
    _renderItemList() {
        return (
            <View>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outer: {
        alignItems: 'center',
    },
    infoView: {
        width: Screen.width,
    },
    addrView: {
        flexDirection: 'row',
    },
    personView: {
        flexDirection: 'row'
    },
    viewBlank: {
        height: 0.02 * Screen.height,
        width: 1 * Screen.width,
    }
});
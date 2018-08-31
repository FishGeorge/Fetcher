import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, ScrollView
} from 'react-native';

type Props = {};
const imgBtn_back = require('../../../pic/icon_return.png');
const imgLoc = require('../../../pic/当地.png');
import ChooseOrder from "../3ChooseOrderPage/index"
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import BRDialog from "../../../components/BRDialog";

export default class Fetcher_InfoFillOut extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            brDialogVisibility: false,
            AddrInfoContent: this._renderAddrInfoContent(),
            SpecialConditions: this._renderSpecialConditions(),
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#FFC777'
            }}>
                <View style={{
                    width: Screen.width,
                    // height: 0.06 * Screen.height,
                }}>
                    <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={imgBtn_back}
                               style={{height: 0.05 * Screen.height, width: 0.05 * Screen.height}}/>
                    </TouchableOpacity>
                    <View style={styles.infoView}>
                        <View style={styles.personView}>
                            <Text ref='nickName_Text'>张三</Text>
                            <Text ref='phoneNum_Text'>158xxxxxxxx</Text>
                        </View>
                        <Text>即将前往</Text>
                        <View style={styles.addrView}>
                            <Image source={imgLoc} style={{height: 0.05 * Screen.height, width: 0.05 * Screen.height}}/>
                            <Text ref='addr_Text'>计算机楼</Text>
                            <Text onPress={() => this._changeAddr()}
                                  style={{textDecorationLine: 'underline'}}>{" 有误?"}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewStyle}
                            showsVerticalScrollIndicator={false}>
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
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"希望你能接受这些"}
                        moduleContent={this.state.SpecialConditions}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.2 * Screen.height
                        }}
                    />
                    <View style={styles.helpViewStyle}>
                        <Image source={require('../../../pic/紧凑.png')} style={styles.btn}/>
                        <Text>这位大师兄等不及啦，帮帮他！</Text>
                        <TouchableOpacity onPress={() => this._pressHelpButton()}>
                            <Image source={require('../../../pic/radio_button_2.png')} style={styles.btn}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    <View style={{width: 0.65 * Screen.width, height: 0.08 * Screen.height, backgroundColor: "gray"}}>
                        <Text>预期报偿：xxx</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._releaseWanted()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white'}}>匹配意向</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <BRDialog
                    content={this._renderBRDialogContent()}
                    contentHeight={0.15 * Screen.height}
                    ref="_brDialog"
                    visibility={this.state.brDialogVisibility}
                    onLeftPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                        });
                    }}
                    onRightPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                        })
                    }}/>
            </View>
        );
    }

    // 定位“有误”文本点击事件
    _changeAddr() {
        // 弹出地图框修改定位
        alert("o");
    }

    // 返回详细地址框内容
    _renderAddrInfoContent() {

    }

    // 返回特殊条件框内容
    _renderSpecialConditions() {

    }

    _releaseWanted() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ChooseOrder',
                component: ChooseOrder
            });
        }
    }

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

    _renderBRDialog() {
        this.setState({
            brDialogVisibility: true
        })
    }

    _renderBRDialogContent() {
        return (
            <Text>
                {"Dialog Content"}
            </Text>
        );
    }

    // 接受特殊意向
    _pressHelpButton(){

    }
}

const styles = StyleSheet.create({
    infoView: {},
    btn: {
        height: 0.05 * Screen.height,
        width: 0.05 * Screen.height,
    },
    personView: {
        flexDirection: 'row',
    },
    addrView: {
        flexDirection: 'row',
    },
    scrollViewStyle: {
        alignItems: 'center'
    },
    helpViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
    }
});
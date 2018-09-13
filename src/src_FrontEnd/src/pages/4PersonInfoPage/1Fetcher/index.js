// 业务逻辑：通过get方法从服务器得到
// 需要的信息，再把信息传至set方法，
// 通过set方法把信息填入到标签中
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BRExpandableView from  '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";
import FetcherAllEvaluation from "./FetcherAllEvaluation";
import icon from "../../../common/icon";

export default class Fetcher_DetailsPage extends Component {
    static navigationOptions={ header:null, };
    constructor(props) {
        super(props);
        this.state = {
            moduleContent: this._renderModuleContent(),
        }
    }

    render() {
        return (
            <View style={styles.outer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri:icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                </View>
                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri:icon.itemslist}}
                    moduleName={
                        "带哥主页"
                    }
                    moduleContent={
                        this._setFetcherDetailInfo()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />

                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri:icon.itemslist}}
                    moduleName={
                        "带哥数据"
                    }
                    moduleContent={
                        this._setFetcherInfo()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.1 * Screen.height
                    }}
                />

                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri:icon.itemslist}}
                    moduleName={
                        "带哥标签"
                    }
                    moduleContent={
                        this._setFetcherLabel()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />

                {/*应当点击跳转至带哥的全部评价*/}
                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri:icon.itemslist}}
                    moduleName={
                        "查看全部评价"
                    }
                    moduleContent={
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('FetcherAllEvaluation')}
                                          style={{height:20}}>
                            <Text>
                                跳转
                            </Text>
                        </TouchableOpacity>
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.05 * Screen.height
                    }}
                />
            </View>
        )
    }
    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }

    _renderModuleContent() {
        return (
            <Text
                style={{fontSize: 18}}
                onPress={() => this._renderBRDialog()}>
                {"Test Button"}
            </Text>
        );
    }

    //get方法，从服务器获取数据
    getInfo(){

    }

    //个人信息带哥信息
    _setFetcherInfo(){
        return(
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height,
                flexDirection:'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{width: 0.30 * Screen.width,flexDirection: 'column', alignItems: 'center'}}>
                    <Text>64单</Text>
                    <Text>总订单数</Text>
                </View>
                <View style={{
                    width: 0.30 * Screen.width,
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderLeftWidth: 1,
                    borderRightWidth: 1,
                    borderColor:"#000000",}}>
                    <Text>256元</Text>
                    <Text>总收入</Text>
                </View>
                <View style={{width: 0.30 * Screen.width,flexDirection: 'column', alignItems: 'center'}}>
                    <Text>帅</Text>
                    <Text>最多的评价是</Text>
                </View>
            </View>
        );
    }

    //带哥主页
    _setFetcherDetailInfo(){
        return(
            <View style={{
                            width: 0.90 * Screen.width,
                            height: 0.06 * Screen.height,
                            flexDirection:'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                <View>
                    <Image source={{uri:icon.persondefault}}/>
                </View>

                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'}}>
                    <Text>
                        昵称
                    </Text>
                    <Text>
                        等级
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'}}>
                    <Text>
                        龚小呈
                    </Text>
                    <Text>
                        3级
                    </Text>
                </View>
            </View>
        );
    }

    //带哥标签
    _setFetcherLabel(){
        return(
            <View style={{
                flexDirection : 'column',
            }}>
                <View style={{
                    flexDirection : 'row',
                    justifyContent : 'space-around',
                    alignItems : 'center'
                }}>
                    <View style={{backgroundColor : 'white'}}>
                        <Text>
                            帅 63
                        </Text>
                    </View>
                    <View style={{backgroundColor : 'white'}}>
                        <Text>
                            物品完好 59
                        </Text>
                    </View>
                    <View style={{backgroundColor : 'gray'}}>
                        <Text>
                            不帅 1
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outer: {
        backgroundColor: '#FFC750',
        flex:1,
        alignItems:'center'
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.06 * Screen.height,
    },
    iconStyle: {
        marginTop: 0.01 * Screen.height,
        marginLeft: 0.01 * Screen.height,
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
});
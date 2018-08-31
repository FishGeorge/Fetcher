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

export default class Fetcher_DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleContent: this._renderModuleContent(),
            brDialogVisibility: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
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
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        "带哥数据"
                    }
                    moduleContent={
                        this._setFetcherInfo()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />


                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
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
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        "查看全部评价"
                    }
                    moduleContent={
                        <TouchableOpacity onPress={()=>{
                            const {navigator} = this.props;
                            if (navigator) {
                                navigator.push({
                                    name: 'FetcherAllEvaluation',
                                    component: FetcherAllEvaluation,
                                });
                            }}} style={{height:20}}>
                            <Text>
                                跳转
                            </Text>
                        </TouchableOpacity>
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />
            </View>
        )
    }

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'ChooseArea',
                component: ChooseArea,
            });
        }
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
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>64单</Text>
                    <Text>总订单数</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>256元</Text>
                    <Text>总收入</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
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
                    <Image source={require('../../../pic/icon_contact.png')}/>
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
    container: {
        height:Screen.height,
        width:Screen.width,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFC777',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
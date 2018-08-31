// 业务逻辑：通过get方法从服务器得到
// 需要的信息，再把信息传至set方法，
// 通过set方法把信息填入到标签中
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import BRExpandableView from  '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";
import FetcherAllEvaluation from "../1Fetcher/FetcherAllEvaluation";
import BigBrotherAllEvaluation from "./BigBrotherAllEvaluation";

export default class BigB_DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        "大师兄主页"
                    }
                    moduleContent={
                        this._setBigBrotherDetailInfo()
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
                        "大师兄数据"
                    }
                    moduleContent={
                        this._setBigBrotherInfo()
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
                        "大师兄成就"
                    }
                    moduleContent={
                        this._setBigBrotherCareer()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />

                {/*应当点击跳转至大师兄的全部评价*/}
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
                                    name: 'BigBrotherAllEvaluation',
                                    component: BigBrotherAllEvaluation,
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

    //get方法，从服务器获取数据
    getInfo(){

    }

    //个人信息大师兄信息
    _setBigBrotherInfo(){
        return(
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height,
                flexDirection:'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>128单</Text>
                    <Text>总订单数</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>511元</Text>
                    <Text>总支出</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>可乐</Text>
                    <Text>最爱带的是</Text>
                </View>
            </View>
        );
    }

    //大师兄主页
    _setBigBrotherDetailInfo(){
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
                        5级
                    </Text>
                </View>
            </View>
        );
    }

    //大师兄生涯成就
    _setBigBrotherCareer(){
        return (
                <View style={{
                    width: 0.90 * Screen.width,
                    height: 0.06 * Screen.height,
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                可乐狂魔
                            </Text>
                            <Text>
                                银牌
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                学霸
                            </Text>
                            <Text>
                                铜牌
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                图书管理员
                            </Text>
                            <Text>
                                铜牌
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'}}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                26/50
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                98/100
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'}}>
                            <Text>
                                4/10
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
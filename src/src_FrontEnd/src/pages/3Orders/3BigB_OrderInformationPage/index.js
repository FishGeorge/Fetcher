import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import FetcherOrderComplete from "../1Fetcher_OrderCompletePage/index";
import BigBrotherOrderComplete from "../2BigB_OrderCompletePage/index";
import {Constants} from "../../../common/Constants";
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import Item from "../../../components/Item";

var Img = require('../../../pic/icon_return.png');
type Props = {};
export default class BigBrotherOrderInformation extends Component<Props> {
    render() {
        return (
            <ScrollView style={styles.outer}>
                <View style={{height: 36, flexDirection: 'row'}}>
                    <TouchableOpacity onPress={this._goBack.bind(this)}
                                      style={styles.goback}>
                        <Image source={Img}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{
                        backgroundColor: '#D9FFFF',
                        width: 0.96 * Screen.width,
                        borderRadius: 0.030 * Screen.width,
                        flexDirection: 'row',
                        height: 0.06 * Screen.height,
                        alignItems: 'center'
                    }}>
                        <View style={{width: 60, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 20}}>龚呈</Text>
                        </View>
                        <View style={styles.verticalLine}/>
                        <View style={{width: 120, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 20}}>156xxxxxxxx</Text>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <BRExpandableView
                            initialShowing={1}
                            moduleImg={require('../../../pic/icon_address.png')}
                            moduleName={"当前位置" + this.getLocation()}
                            moduleContent={
                                <Text>草拟吗</Text>
                            }
                            contentViewStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 0.50 * Screen.height
                            }}
                        />
                    </View>
                    <View style={{marginTop: 10}}>
                        <BRExpandableView
                            initialShowing={0}
                            moduleImg={require('../../../pic/list_view.png')}
                            moduleName={"物品清单"}
                            moduleContent={
                                <View styles={{marginTop: 3, width: 0.95 * Screen.width}}>
                                    <View style={{alignItems: 'flex-end', marginRight: 5, marginBottom: 10}}>
                                        <Item
                                            Url={require('../../../pic/ItemExample.png')}
                                            Title="王帆1：1手办"
                                            Price="1.00元"
                                            Quantity="1"
                                            Type="摔跤用品"
                                            Address="梅园4B-319"
                                            Size="大"
                                        />
                                        <Item
                                            Url={require('../../../pic/ItemExample.png')}
                                            Title="李元亨1：1手办"
                                            Price="1.00元"
                                            Quantity="1"
                                            Type="摔跤用品"
                                            Address="梅园4B-319"
                                            Size="大"
                                        />
                                        <View style={{flexDirection: 'row'}}>
                                            <TouchableOpacity onPress={this._pressButton.bind(this)}>
                                                <View style={styles.btn}>
                                                    <Text style={{fontSize: 20}}>订单详情</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View style={styles.btn}>
                                                    <Text style={{fontSize: 20}}>再次发布</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }
                            contentViewStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 0.30 * Screen.height
                            }}
                        />
                    </View>
                </View>
                <View style={styles.viewofbutton}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}
                                      style={styles.button}>
                        <Text style={{fontSize: 30,}}>结算</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
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

    getLocation() {
        return '111';
    }

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'BigBrotherOrderComplete',
                component: BigBrotherOrderComplete,
            });
        }
    }
}

const styles = StyleSheet.create({
    outer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        width: Screen.width,
        height: 0.8 * Screen.height
    },
    container: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    goback: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    instructions: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF8000',
        margin: 5
    },
    bottom: {
        paddingBottom: 5,
        width: Screen.width,
        height: 30
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: '#D9FFFF',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BEBEBE',
        height: 30,
        width: 120,
        borderRadius: 0.032 * Screen.width,
        justifyContent: 'center',
        marginRight:5
    },
    verticalLine: {
        backgroundColor: '#9f9fa3',
        width: 1,
        alignSelf: 'stretch'
    },
    viewofbutton: {
        alignItems:'flex-end'
    },
    button: {
        height: 50,
        width: 100,
        backgroundColor: '#FF8000',
        justifyContent: 'center',
        alignItems:'center',
        margin: 5,
        borderRadius: 0.030 * Screen.width
    },
});
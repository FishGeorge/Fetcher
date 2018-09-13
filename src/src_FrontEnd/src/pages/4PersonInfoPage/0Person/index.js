// 业务逻辑：通过get方法从服务器得到
// 需要的信息，再把信息传至set方法，
// 通过set方法把信息填入到标签中
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import BRExpandableView from '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";
import PersonalDetailsPage from "./PersonalDetailsPage";
import BigB_DetailsPage from "../2BigBrother";
import Fetcher_DetailsPage from "../1Fetcher";
import icon from "../../../common/icon";

export default class PersonPage extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            personInfo: {}
        };
        storage.load({
            key: 'hasLogined',
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.setState({
                personInfo: ret,
            })
        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri: icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text style={styles.headText}> 个人信息页</Text>
                </View>

                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri: icon.personInfo}}
                    moduleName={
                        "个人信息"
                    }
                    moduleContent={
                        this._setPersonalInfo()
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
                    moduleImg={{uri: icon.itemslist}}
                    moduleName={
                        <Text>大师兄: 5级</Text>
                    }
                    moduleContent={
                        this._setBigBrotherInfo()
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
                    moduleImg={{uri: icon.itemslist}}
                    moduleName={
                        <Text>带哥: 3级</Text>
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
            </View>
        )
    }

    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }

    //get方法，从服务器获取数据
    getInfo() {

    }

    //个人信息
    _setPersonalInfo() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('PersonalDetailsPage')}
                              style={{flex: 1, justifyContent: 'center'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View
                        style={{
                            padding: 0.01 * Screen.height,
                            width: 0.15 * Screen.height,
                            height: 0.15 * Screen.height,
                        }}>
                        <Image style={{width: 0.13 * Screen.height, height: 0.13 * Screen.height,}}
                               source={{uri: icon.persondefault}}/>
                    </View>
                    <View>
                        <View style={{
                            width: 0.6 * Screen.width,
                            // height: 0.06 * Screen.height,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text1}>昵称</Text>
                            <Text style={styles.text1}>{this.state.personInfo.NickName}</Text>
                        </View>

                        <View style={{
                            width: 0.6 * Screen.width,
                            // height: 0.06 * Screen.height,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text1}>用户名</Text>
                            <Text style={styles.text1}>{this.state.personInfo.UserName}</Text>
                        </View>

                        <View style={{
                            width: 0.6 * Screen.width,
                            // height: 0.06 * Screen.height,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.text1}>手机</Text>
                            <Text style={styles.text1}>{this.state.personInfo.PhoneNumber}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    //个人信息大师兄信息
    _setBigBrotherInfo() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('BigB_DetailsPage')}
                              style={{flex: 1, justifyContent: 'center'}}>
                <View style={{
                    width: 0.90 * Screen.width,
                    height: 0.06 * Screen.height,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 0.30 * Screen.width, flexDirection: 'column', alignItems: 'center'
                    }}>
                        <Text style={styles.text2}>总订单数</Text>
                        <Text style={styles.text1}>113单</Text>
                    </View>
                    <View style={{
                        width: 0.30 * Screen.width,
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: "#000000",
                    }}>
                        <Text style={styles.text2}>总支出</Text>
                        <Text style={styles.text1}>519.7元</Text>
                    </View>
                    <View style={{width: 0.30 * Screen.width, flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.text2}>最爱带的是</Text>
                        <Text style={styles.text1}>饮料</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    //个人信息带哥信息
    _setFetcherInfo() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_DetailsPage')}
                              style={{flex: 1, justifyContent: 'center'}}>
                <View style={{
                    width: 0.90 * Screen.width,
                    height: 0.06 * Screen.height,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{width: 0.30 * Screen.width, flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.text2}>总订单数</Text>
                        <Text style={styles.text1}>61单</Text>
                    </View>
                    <View style={{
                        width: 0.30 * Screen.width,
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderColor: "#000000"
                    }}>
                        <Text style={styles.text2}>总收入</Text>
                        <Text style={styles.text1}>256.3元</Text>
                    </View>
                    <View style={{width: 0.30 * Screen.width, flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={styles.text2}>最多的评价是</Text>
                        <Text style={styles.text1}>帅</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#FFC750',
        flex: 1
    },
    iconStyle: {
        marginTop: 0.01 * Screen.height,
        marginLeft: 0.01 * Screen.height,
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    photoStyle: {
        width: 0.05 * Screen.height,
        height: 0.05 * Screen.height,
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.15 * Screen.height,
    },
    headText: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
        fontSize: 24,
        color: '#FFFFFF',
    },
    text1: {
        fontSize: 17,
        color: "#000000"
    },
    text2: {
        fontSize: 14,
        color: "#777777"
    }
});
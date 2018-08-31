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

export default class PersonPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/*应当点击可跳转至个人信息页*/}
                <TouchableOpacity onPress={()=>{
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'PersonalDetailsPage',
                            component: PersonalDetailsPage,
                        });
                    }}} style={{height:20}}>
                    <Text> 个人信息页</Text>
                </TouchableOpacity>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
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

                {/*应当点击可跳转至大师兄详情页*/}
                <TouchableOpacity onPress={()=>{
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'BigB_DetailsPage',
                            component: BigB_DetailsPage,
                        });
                    }}} style={{height:20}}>
                    <Text> B详情页</Text>
                </TouchableOpacity>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        this._setBigBrotherLevel()
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

                {/*应当点击可跳转至带哥详情页*/}
                <TouchableOpacity onPress={()=>{
                    const {navigator} = this.props;
                    if (navigator) {
                        navigator.push({
                            name: 'Fetcher_DetailsPage',
                            component: Fetcher_DetailsPage,
                        });
                    }}} style={{height:20}}>
                    <Text> F详情页</Text>
                </TouchableOpacity>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        this._setFetcherLevel()
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
            </View>
        )
    }

    //get方法，从服务器获取数据
    getInfo() {

    }

    //个人信息
    _setPersonalInfo() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                <View>
                    <Image source={require('../../../pic/icon_contact.png')}/>
                </View>
                <View>
                    <Text>龚小呈</Text>
                    <Text>Gc111</Text>
                    <Text>15841579845</Text>
                </View>
            </View>
        );

    }

    //个人信息大师兄等级
    _setBigBrotherLevel() {
        return (
            <Text>
                5级大师兄
            </Text>
        );
    }

    //个人信息带哥等级
    _setFetcherLevel() {
        return (
            <Text>
                3级带哥
            </Text>
        );
    }

    //个人信息大师兄信息
    _setBigBrotherInfo() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height,
                flexDirection: 'row',
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

    //个人信息带哥信息
    _setFetcherInfo() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height,
                flexDirection: 'row',
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
}

const styles = StyleSheet.create({
    container: {
        height: Screen.height,
        width: Screen.width,
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
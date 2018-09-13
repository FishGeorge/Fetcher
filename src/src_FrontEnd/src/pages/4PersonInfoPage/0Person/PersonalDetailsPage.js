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
import icon from "../../../common/icon";

export default class PersonalDetailsPage extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
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
                        "个人信息"
                    }
                    moduleContent={
                        this._setPersonalDetailInfo()
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
                        "我的二维码"
                    }
                    moduleContent={
                        this._setPersonalQRCode()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.3 * Screen.height
                    }}
                />
            </View>
        )
    }

    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }

    // 个人详细信息
    _setPersonalDetailInfo() {
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View
                    style={{padding: 0.01 * Screen.height, width: 0.15 * Screen.height, height: 0.15 * Screen.height,}}>
                    <Image style={{width: 0.13 * Screen.height, height: 0.13 * Screen.height,}}
                           source={{uri:icon.persondefault}}/>
                </View>
                <View>
                    <View style={{
                        width: 0.6 * Screen.width,
                        // height: 0.06 * Screen.height,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>昵称</Text>
                        <Text>龚小呈</Text>
                    </View>

                    <View style={{
                        width: 0.6 * Screen.width,
                        // height: 0.06 * Screen.height,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>用户名</Text>
                        <Text>Gc111</Text>
                    </View>

                    <View style={{
                        width: 0.6 * Screen.width,
                        // height: 0.06 * Screen.height,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text>手机</Text>
                        <Text>15841579845</Text>
                    </View>
                </View>
            </View>
        );
    }

    // 我的二维码
    _setPersonalQRCode() {
        return (
            <View style={{
                width: 0.15 * Screen.height,
                height: 0.15 * Screen.height,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image style={{
                    width: 0.3 * Screen.height,
                    height: 0.3 * Screen.height,
                }} source={require('../../../pic/icon_QRcode.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
});
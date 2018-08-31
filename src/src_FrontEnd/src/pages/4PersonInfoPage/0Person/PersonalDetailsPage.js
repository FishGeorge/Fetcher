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
    Image
} from 'react-native';
import BRExpandableView from  '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";

export default class PersonalDetailsPage extends Component {
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
                    initialShowing={1}
                    moduleImg={require('../../../pic/list_view.png')}
                    moduleName={
                        "我的二维码"
                    }
                    moduleContent={
                        this._setPersonalQRCode()
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

    // 个人详细信息
    _setPersonalDetailInfo(){
        return(
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.15 * Screen.height,
                flexDirection:'column',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{
                    width: 0.75 * Screen.width,
                    height: 0.06 * Screen.height,
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>头像</Text>
                    <Image source={require('../../../pic/icon_contact.png')}/>
                </View>

                <View style={{
                    width: 0.75 * Screen.width,
                    // height: 0.06 * Screen.height,
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>昵称</Text>
                    <Text>龚小呈</Text>
                </View>

                <View style={{
                    width: 0.75 * Screen.width,
                    // height: 0.06 * Screen.height,
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>用户名</Text>
                    <Text>Gc111</Text>
                </View>

                <View style={{
                    width: 0.75 * Screen.width,
                    // height: 0.06 * Screen.height,
                    flexDirection:'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text>手机</Text>
                    <Text>15841579845</Text>
                </View>

            </View>
        );
    }

    // 我的二维码
    _setPersonalQRCode(){
        return(
            <View style={{
                width: 0.15 * Screen.height,
                height: 0.15 * Screen.height,
                flexDirection:'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image style={{
                    width: 0.15 * Screen.height,
                    height: 0.15 * Screen.height,
                }} source={require('../../../pic/icon_QRcode.png')}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:Screen.height,
        width:Screen.width,
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
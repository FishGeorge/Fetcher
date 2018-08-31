import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import ChooseArea from '../1ChooseAreaPage/index';
import BRExpandableView from  '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";

type Props = {};
export default class FetcherHost extends Component<Props> {
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
                    moduleName={"当前订单"}
                    moduleContent={
                        this._setCurrentOrder()
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
                    moduleName={"这些地方需要你！"}
                    moduleContent={
                        this._setPlacesInNeed()
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
                    moduleName={"今日带哥之星"}
                    moduleContent={
                        this._setTodayBestFetcher()
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
                    moduleName={"你的带哥成就"}
                    moduleContent={
                        this._setFetcherCareer()
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />

                <TouchableOpacity onPress={this._pressButton.bind(this)}
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.red}>开始接单</Text>
                </TouchableOpacity>
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


    //当前订单
    _setCurrentOrder() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>龚小呈</Text>
                    <Text>教学楼</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>孟小霖</Text>
                    <Text>图书馆</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>陈小玥</Text>
                    <Text>梅58</Text>
                </View>
            </View>
        );
    }

    //大师兄最多的三个地点
    _setPlacesInNeed() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>教学楼</Text>
                    <Text>正有54个大师兄</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>图书馆</Text>
                    <Text>正有21个大师兄</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text>计算机楼</Text>
                    <Text>正有54个大师兄</Text>
                </View>
            </View>
        );
    }

    //今日带哥之星
    _setTodayBestFetcher() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.06 * Screen.height,
                flexDirection:'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../../../pic/icon_contact.png')} />
                    <Text>龚小呈</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image source={require('../../../pic/icon_contact.png')} />
                    <Text>龚小呈</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image source={require('../../../pic/icon_contact.png')} />
                    <Text>龚小呈</Text>
                </View>
            </View>
        );
    }

    //带哥生涯成就
    _setFetcherCareer() {
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
                            跑单大师
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
                            盆满钵满
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
                            肌肉猛男
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
        flex: 1,
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

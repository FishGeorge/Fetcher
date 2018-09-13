import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView, ToastAndroid
} from 'react-native';
import Fetcher_InfoFillOut from '../2InfoFillOutPage/index';
import Screen from '../../../utils/Screen'
import BRExpandableView from "../../../components/BRExpandableView";
import icon from "../../../common/icon"

export default class FetcherChooseDestination extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            TeachingBuildingList: this._renderTeachingBuildingList(),
            DormitoryList_m: this._renderDormitoryListList_m(),
            DormitoryList_j: this._renderDormitoryListList_j(),
            DormitoryList_t: this._renderDormitoryListList_t(),
            OtherBuildingList: this._renderOtherBuildingList(),
            hasGuess: true,
            guessArea:"梅园1-4舍"
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri:icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text style={styles.headText}>选择你要去的地方</Text>
                </View>
                <ScrollView style={{flex: 1, paddingTop: 10, paddingBottom: 15}}
                            contentContainerStyle={styles.scrollViewStyle}
                            showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri:icon.locationC}}
                        moduleName={"教学楼区"}
                        moduleContent={this.state.TeachingBuildingList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}/>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri:icon.locationC}}
                        moduleName={"梅园"}
                        moduleContent={this.state.DormitoryList_m}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}/>
                    {this._renderGuessView()}
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri:icon.locationC}}
                        moduleName={"桃园"}
                        moduleContent={this.state.DormitoryList_t}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}/>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri:icon.locationC}}
                        moduleName={"橘园"}
                        moduleContent={this.state.DormitoryList_j}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}/>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri:icon.locationC}}
                        moduleName={"其他区域"}
                        moduleContent={this.state.OtherBuildingList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}/>
                </ScrollView>
            </View>
        );
    }

    _renderGuessView() {
        if (this.state.hasGuess)
            return (
                <View style={styles.guessViewStyle}>
                    <Text style={{left: 0.05 * Screen.width}}>猜你要去：</Text>
                    <Text style={{left: 0.05 * Screen.width, fontSize: 20, color: "#000000"}}>{this.state.guessArea}</Text>
                    <TouchableOpacity onPress={() => {
                        // this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: this.state.guessArea});
                        ToastAndroid.show("功能开发中", ToastAndroid.SHORT);
                    }}
                        style={{position: 'absolute', right: 0.025 * Screen.width}}>
                        <Image source={{uri:icon.correct2}} style={styles.guessBtn}/>
                    </TouchableOpacity>
                </View>
            );
        else
        // 没得猜
            return (<View/>);
    }

    // 这么显而易见的事还要我注释吗？？
    _renderTeachingBuildingList() {
        return (
            <ScrollView style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 40})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>教1、2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 41})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>教3、4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 42})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>教5、6</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 43})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>教7、8</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    _renderDormitoryListList_m() {
        return (
            <ScrollView style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 10})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>1-4舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 11})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>5-8舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 12})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>9-10舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 13})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>中超超市</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 14})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>运动场</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    _renderDormitoryListList_t() {
        return (
            <ScrollView style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 20})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>1、2舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 21})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>3、4舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 22})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>5、6舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 23})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>7、8舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 24})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>天平超市</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 25})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>食堂</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 26})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>运动场</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
    _renderDormitoryListList_j() {
        return (
            <ScrollView style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 31})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>1-4舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 32})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>5-13舍</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 33})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>岗山超市</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 34})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>食堂</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 35})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>运动场</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    _renderOtherBuildingList() {
        return (
            <ScrollView style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 50})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>体育馆</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 51})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>快递中心</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 52})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>焦廷标馆</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 53})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>计算机楼</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 54})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>工培中心</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 55})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>田家炳楼</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 56})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>李文正图书馆</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 57})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>东门</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 58})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>西门</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 59})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>南门</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Fetcher_InfoFillOut', {Area: 60})}
                                  style={styles.areaBtn}>
                    <Text style={{fontSize: 20, color: "#000000"}}>北门</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    _goBack() {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    iconStyle: {
        marginTop: 0.01 * Screen.height,
        marginLeft: 0.01 * Screen.height,
        width: 0.045 * Screen.height,
        height: 0.045 * Screen.height,
    },
    headText: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
        fontSize: 24,
        color: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.15 * Screen.height,
    },
    guessBtn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
    scrollViewStyle: {
        alignItems: 'center',
        width: Screen.width,
    },
    detinationListStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    areaBtn: {
        width: 0.25 * Screen.width,
        height: 0.13 * Screen.height,
        borderColor: "#FFC750",
        borderWidth: 2,
        alignItems: 'center',
        margin: 2,
        justifyContent: 'center'
    },
    guessViewStyle: {
        marginTop: 0.0075 * Screen.height,
        marginBottom: 0.0075 * Screen.height,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#FFC750',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
    },
});
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Fetcher_InfoFillOut from '../2InfoFillOutPage/index';
import Screen from '../../../utils/Screen'
import BRExpandableView from "../../../components/BRExpandableView";

type Props = {};
const Img = require('../../../pic/icon_return.png');

export default class FetcherHost extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            TeachingBuildingList: this._renderTeachingBuildingList(),
            DormitoryList: this._renderDormitoryListList(),
            OtherBuildingList: this._renderOtherBuildingList(),
        }
    }

    render() {
        return (
            <View style={styles.outer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={Img} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text>选择你要去的地方</Text>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/当地.png')}
                        moduleName={"教学楼区"}
                        moduleContent={this.state.TeachingBuildingList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.2 * Screen.height
                        }}/>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/当地.png')}
                        moduleName={"宿舍区"}
                        moduleContent={this.state.DormitoryList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.2 * Screen.height
                        }}/>
                    <View style={styles.guessViewStyle}>
                        <Text>猜你要去：</Text>
                        <TouchableOpacity onPress={() => this._pressButton()}>
                            <Image source={require('../../../pic/radio_button.png')} style={styles.btn}/>
                        </TouchableOpacity>
                    </View>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/当地.png')}
                        moduleName={"其他区域"}
                        moduleContent={this.state.OtherBuildingList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.2 * Screen.height
                        }}/>
                </ScrollView>
            </View>
        );
    }

    // 这么显而易见的事还要我注释吗？？
    _renderTeachingBuildingList() {
        return (
            <ScrollView  style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
                    <Text>不知道写什么</Text>
            </ScrollView>
        );
    }

    _renderDormitoryListList() {
        return (
            <ScrollView  style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </ScrollView>
        );
    }

    _renderOtherBuildingList() {
        return (
            <ScrollView  style={{flex: 1}} horizontal={true} contentContainerStyle={styles.detinationListStyle}>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </ScrollView>
        );
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

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'Fetcher_InfoFillOut',
                component: Fetcher_InfoFillOut,
            });
        }
    }
}

const styles = StyleSheet.create({
    outer: {
        height: Screen.height,
        width: Screen.width,
        backgroundColor: '#FFC777'
    },
    header: {
        flexDirection: 'row',
        height: 0.06 * Screen.height
    },
    btn: {
        height: 0.05 * Screen.height,
        width: 0.05 * Screen.height
    },
    scrollViewStyle: {
        alignItems: 'center',
        width: Screen.width,
    },
    detinationListStyle: {
        flexDirection: 'row',
        alignItems:'center'
    },
    guessViewStyle: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
    },
});
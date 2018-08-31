import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity, ScrollView
} from 'react-native';

type Props = {};
const Img = require('../../../pic/icon_return.png');
import BRExpandableView from "../../../components/BRExpandableView";
import Screen from "../../../utils/Screen";
import FetcherHost from "../0HostPage";

export default class ChooseOrder extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            WantIdList: this._getWantIdList(),
            WantIdNum: 0,

        };
    }

    componentWillMount() {
        this.setState({
            // WantIdNum: this.state.WantIdList.length,

        });
    }

    render() {
        return (
            <View style={styles.outer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={Img} style={styles.btn}/>
                    </TouchableOpacity>
                    <Text>匹配到如下意向：</Text>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollViewStyle} showsVerticalScrollIndicator={false}>
                    <Text style={styles.wantNumStyle}>意向1</Text>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/复制.png')}
                        moduleName={"to 梅园1-4舍"}
                        moduleContent={<Text>不知道写什么</Text>}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.3 * Screen.height
                        }}/>
                    <Text style={styles.wantNumStyle}>意向2</Text>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/复制.png')}
                        moduleName={"to 桃园3-4舍"}
                        moduleContent={<Text>不知道写什么</Text>}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.3 * Screen.height
                        }}/>
                    <Text style={styles.wantNumStyle}>意向3</Text>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/复制.png')}
                        moduleName={"to 体育馆3号馆"}
                        moduleContent={<Text>不知道写什么</Text>}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.3 * Screen.height
                        }}/>
                </ScrollView>
                <View style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    <View style={{width: 0.65 * Screen.width, height: 0.08 * Screen.height, backgroundColor: "gray"}}>
                        <Text>{"预计额外路程：xxx 公里"}</Text>
                        <Text>{"预计额外时间：xxx 分钟"}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this._pressButton()}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'white'}}>GoGoGo</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
                name: 'FetcherHost',
                component: FetcherHost,
            });
        }
    }

    // 返回匹配到的意向id列表
    _getWantIdList() {
        // 可能需要处理成意向的ID数组，然后按数组长度渲染对应个数的BR框，然后根据意向ID向服务器索取数据
    }

    _getWantInfo(WantId) {

    }
}

const styles = StyleSheet.create({
    outer: {
        flex:1,
        // height: Screen.height,
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
    wantNumStyle: {
        width: Screen.width,
    }
});
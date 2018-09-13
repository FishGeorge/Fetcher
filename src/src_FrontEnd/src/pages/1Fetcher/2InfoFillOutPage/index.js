import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import BRDialog from "../../../components/BRDialog";
import icon from "../../../common/icon"
import AreaTransfer from '../../../utils/AreaTransfer';
import TimeUtil from "../../../utils/TimeUtil";
import Checkbox from "../../../components/Checkbox";


export default class Fetcher_InfoFillOut extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {
            brDialogVisibility: false,
            ArvTimeContent: this._renderArvTimeContent(),
            personInfo: {
                NickName: "我是谁",
                PhoneNumber: "158********"
            },
            Big: true,
            ToDoor: true,
            reward: "1",
            TimeHour: "",
            TimeMin: "",
            Location:"",
            WantedInfo:{}
        };

    }

    // 读取个人信息
    componentWillMount() {
        storage.load({
            key: 'hasLogined',
            autoSync: false,
            syncInBackground: false,
        }).then(ret => {
            this.setState({
                personInfo: {
                    NickName: ret.NickName,
                    PhoneNumber: ret.PhoneNumber
                }
            });
        }).catch(err => {
            // shouldnt go here
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()} style={styles.iconStyle}>
                        <Image source={{uri: icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                    <View style={styles.infoView}>
                        <Text style={{fontSize: 17, color: "#FFFFFF"}}>即将前往</Text>
                        <View style={styles.addrView}>
                            <Image source={{uri: icon.destination}}
                                   style={{height: 0.04 * Screen.height, width: 0.04 * Screen.height}}/>
                            <Text ref='addr_Text' style={{
                                paddingLeft: 5,
                                fontSize: 20,
                                color: "#000000"
                            }}>{AreaTransfer(this.props.navigation.state.params.Area)}</Text>
                        </View>
                        <View refs="person" style={styles.personView}>
                            <Text style={styles.personTxt}
                                  ref='nickName_Text'>{this.state.personInfo.NickName + " "}</Text>
                            <Text style={styles.personTxt}
                                  ref='phoneNum_Text'>{" " + this.state.personInfo.PhoneNumber}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex: 1, paddingTop: 0.0075 * Screen.height}}
                            contentContainerStyle={styles.scrollViewStyle}
                            showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"希望你能接受这些"}
                        moduleContent={
                            <View style={{
                                alignItems: 'center',
                                height: 0.15 * Screen.height,
                                width: 0.96 * Screen.width,
                            }}>
                                <View style={{
                                    height: 0.075 * Screen.height,
                                    width: 0.96 * Screen.width,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Image style={styles.iconStyle2} source={{uri: icon.bigsizeitem}}/>
                                    <Text style={{fontSize: 16, color: "#000000"}}>大物重物</Text>
                                    <Checkbox initialChecked={this.state.Big} param1={""} param2={this} _onPress={
                                        (p1,p2)=>{
                                            p2.state.Big = !p2.state.Big;
                                        }
                                    }/>
                                </View>
                                <View style={{
                                    height: 0.075 * Screen.height,
                                    width: 0.96 * Screen.width,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                    paddingRight: 20
                                }}>
                                    <Image style={styles.iconStyle2} source={{uri: icon.todoor}}/>
                                    <Text style={{fontSize: 16, color: "#000000"}}>送货上门</Text>
                                    <Checkbox initialChecked={this.state.ToDoor} param1={""} param2={this} _onPress={
                                        (p1,p2)=>{
                                            p2.state.ToDoor = !p2.state.ToDoor;
                                            // console.warn(p2.state.ToDoor);
                                        }
                                    }/>
                                </View>
                            </View>
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}
                    />
                    <View style={styles.helpViewStyle}>
                        <Image source={{uri: icon.bequick}}
                               style={[styles.btn, {left: 0.025 * Screen.width}]}/>
                        <Text style={{left: 0.05 * Screen.width, fontSize: 16}}>这位大师兄等不及啦，帮帮他！</Text>
                        <TouchableOpacity onPress={() => this._pressHelpButton()}
                                          style={{position: 'absolute', right: 0.025 * Screen.width}}>
                            <Image source={{uri: icon.correct2}} style={styles.btn}/>
                        </TouchableOpacity>
                    </View>
                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.itemslist}}
                        moduleName={"送抵时间"}
                        moduleContent={this.state.ArvTimeContent}
                        contentViewStyle={{
                            height: 0.07 * Screen.height
                        }}
                    />
                </ScrollView>
                <View style={{flexDirection: 'row', width: Screen.width, height: 0.08 * Screen.height}}>
                    <View style={{
                        flexDirection: 'row',
                        width: 0.65 * Screen.width,
                        height: 0.08 * Screen.height,
                        backgroundColor: "#CDCDCD",
                        alignItems: 'center',
                        paddingLeft: 20
                    }}>
                        <Text style={{color: '#000000', fontSize: 16}}>{"估计报偿："}</Text>
                        <Text style={{
                            color: '#FF0000',
                            fontSize: 16,
                            position: 'absolute',
                            right: 40
                        }}>{this.state.reward}</Text>
                        <Text style={{color: '#000000', fontSize: 16, position: 'absolute', right: 20}}>{"元"}</Text>
                    </View>
                    {/*传值的时候要额外放一个意向数量，从服务器返回的意向列表获得，暂时先写死*/}
                    <TouchableOpacity onPress={this._match}>
                        <View style={{
                            width: 0.35 * Screen.width,
                            height: 0.08 * Screen.height,
                            backgroundColor: '#FFC750',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: '#000000', fontSize: 18}}>匹配意向</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _match=()=>{
        storage.load({
            key: 'hasLogined',
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            this.props.navigation.navigate('Fetcher_ChooseWant',{
                WantedInfo:{
                    FetcherID:ret.UserID,
                    StartingPoint:"10",
                    Destination:this.props.navigation.state.params.Area,
                    ArriveTime:TimeUtil.getDate()+" "+this.state.TimeHour+":"+this.state.TimeMin+":00",
                    AcceptBigSize:this.state.Big,
                    AcceptSE:this.state.ToDoor,
                    State:0
                }
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

    };

    _renderArvTimeContent() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 0.07 * Screen.height,
                width: 0.96 * Screen.width,

            }}>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.40 * Screen.width,
                    }}
                    onChangeText={this.onTimeHourChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={'=>'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
                <Text style={{fontSize: 16, width: 0.08 * Screen.width,}}>时</Text>
                <TextInput
                    style={{
                        fontSize: 16,
                        width: 0.40 * Screen.width,
                    }}
                    onChangeText={this.onTimeMinChanged}// 绑定文本变化的回调函数
                    placeholderTextColor={'#BEBEBE'}// 提示文本的颜色
                    placeholder={'=>'}// 提示文本的内容
                    underlineColorAndroid={'transparent'}/*设置下划线颜色为透明*/
                />
                <Text style={{fontSize: 16, width: 0.08 * Screen.width,}}>分</Text>
            </View>
        );
    }

    onTimeHourChanged = (txt) => {
        this.state.TimeHour = txt;
    };

    onTimeMinChanged = (txt) => {
        this.state.TimeMin = txt;
    };

    // 接受紧急意向
    _pressHelpButton() {

    }

    _pressBig() {
        this.setState({
            Big: (this.state.Big === 0) ? 1 : 0
        });
    }

    _pressToDoor() {
        this.setState({
            ToDoor: (this.state.ToDoor === 0) ? 1 : 0
        });
    }

    _goBack() {
        //获取SampleComponent中创建的Navigator对象
        this.props.navigation.goBack();
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
    iconStyle2: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
        marginRight: 0.01 * Screen.width,
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
        height: 0.20 * Screen.height,
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height,
    },
    infoView: {
        marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
    },
    personView: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    addrView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    personTxt: {
        fontSize: 16,
        color: "#000000"
    },
    scrollViewStyle: {
        alignItems: 'center'
    },
    helpViewStyle: {
        marginTop: 0.0075 * Screen.height,
        marginBottom: 0.0075 * Screen.height,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#FFC750',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
    }
});
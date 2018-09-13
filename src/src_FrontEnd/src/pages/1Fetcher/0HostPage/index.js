import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import BRExpandableView from '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";
import icon from "../../../common/icon"

export default class FetcherHost extends Component {
    static navigationOptions = {header: null,};

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headText}>带哥马上出发</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollViewStyle}>

                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.achievement}}
                        moduleName={"你的带哥成就"}
                        moduleContent={
                            this._setFetcherCareer()
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.12 * Screen.height
                        }}
                    />

                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.star}}
                        moduleName={"本周带哥之星"}
                        moduleContent={
                            this._setTodayBestFetcher()
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.17 * Screen.height
                        }}
                    />

                    <BRExpandableView
                        color={1}
                        initialShowing={0}
                        moduleImg={{uri: icon.now}}
                        moduleName={"实时大师兄意向"}
                        moduleContent={
                            this._setCurrentOrder()
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.12 * Screen.height
                        }}
                    />

                    <BRExpandableView
                        color={1}
                        initialShowing={1}
                        moduleImg={{uri: icon.flag}}
                        moduleName={"这些地方需要你！"}
                        moduleContent={
                            this._setPlacesInNeed()
                        }
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.12 * Screen.height
                        }}
                    />
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FetcherChooseDestination', {...this.props})}
                    style={{
                        height: 0.08 * Screen.height,
                        width: Screen.width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#FFC750'
                    }}>
                    <Text style={{fontSize: 18, color: "#000000"}}>开始接单</Text>
                </TouchableOpacity>
            </View>
        )
    }

    //实时大师兄意向
    _setCurrentOrder() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.10 * Screen.height
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>苗大帅哥</Text>
                    <Text style={styles.text1}>计算机楼</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>昊洋</Text>
                    <Text style={styles.text1}>计算机楼</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>陈小玥</Text>
                    <Text style={styles.text1}>梅园5-8舍</Text>
                </View>
            </View>
        );
    }

    //大师兄最多的三个地点
    _setPlacesInNeed() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.10 * Screen.height
            }}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>教学楼</Text>
                    <Text style={styles.text1}>正有11个大师兄在等待</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>图书馆</Text>
                    <Text style={styles.text1}>正有4个大师兄在等待</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={styles.text1}>计算机楼</Text>
                    <Text style={styles.text1}>正有75个大师兄在等待</Text>
                </View>
            </View>
        );
    }

    //本周带哥之星
    _setTodayBestFetcher() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.15 * Screen.height,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image style={{borderRadius:10,height: 0.2 * Screen.width, width: 0.2 * Screen.width}}
                           source={{uri: "http://i4.bvimg.com/661327/c55882e8e151f687.jpg"}}/>
                    <Text style={styles.text1}>龚小呈</Text>
                </View>
                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image style={{borderRadius:10,height: 0.2 * Screen.width, width: 0.2 * Screen.width}}
                           source={{uri: "http://i4.bvimg.com/661327/543550d7a5f7d559.jpg"}}/>
                    <Text style={styles.text1}>王小帆</Text>
                </View>
                <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
                    <Image style={{borderRadius:10,height: 0.2 * Screen.width, width: 0.2 * Screen.width}}
                           source={{uri: "http://i4.bvimg.com/661327/5334d75770b26af5.jpg"}}/>
                    <Text style={styles.text1}>孟小霖</Text>
                </View>
            </View>
        );
    }

    //带哥生涯成就
    _setFetcherCareer() {
        return (
            <View style={{
                width: 0.90 * Screen.width,
                height: 0.10 * Screen.height,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.text1}>{"跑单大师 "}</Text>
                        <Text style={[styles.text1,{color:'#C0C0C0'}]}>银牌</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.text1}>{"盆满钵满 "}</Text>
                        <Text style={[styles.text1,{color:'#FFD700'}]}>金牌</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.text1}>{"肌肉猛男 "}</Text>
                        <Text style={[styles.text1,{color:'#c69145'}]}>铜牌</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.text1,{color:'red'}]}>16</Text>
                        <Text style={styles.text1}>/50</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.text1,{color:'red'}]}>79</Text>
                        <Text style={styles.text1}>/100</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Text style={[styles.text1,{color:'red'}]}>4</Text>
                        <Text style={styles.text1}>/10</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    header: {
        backgroundColor: '#FFC750',
        width: Screen.width,
        height: 0.07 * Screen.height,
        justifyContent: 'center'
    },
    headText: {
        // marginTop: 0.005 * Screen.height,
        marginLeft: 0.04 * Screen.height,
        fontSize: 20,
        color: '#FFFFFF',
    },
    scrollViewStyle: {
        alignItems: "center",
        paddingTop: 0.0075 * Screen.height,
        paddingBottom: 0.0075 * Screen.height,
    },
    text1:{
        fontSize:16,
        color:"#000000"
    }
});
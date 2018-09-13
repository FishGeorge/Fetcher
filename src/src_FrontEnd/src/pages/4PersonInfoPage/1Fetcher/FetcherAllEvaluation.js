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
    Image,
} from 'react-native';
import BRExpandableView from  '../../../components/BRExpandableView'
import Screen from "../../../utils/Screen";
import icon from "../../../common/icon";

export default class FetcherAllEvaluation extends Component {
    static navigationOptions={ header:null, };
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.outer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={{uri:icon.goback}} style={styles.btn}/>
                    </TouchableOpacity>
                </View>
                <BRExpandableView
                    color={0}
                    initialShowing={1}
                    moduleImg={{uri:icon.order}}
                    moduleName={
                        "全部评价"
                    }
                    moduleContent={
                        this._setFetcherAllEvaluation()
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
    // 返回按钮点击事件
    _goBack() {
        this.props.navigation.goBack();
    }
    //带哥的全部评价
    _setFetcherAllEvaluation(){
        return(
            <View>
                <View style={{
                    width: 0.90 * Screen.width,
                    height: 0.15 * Screen.height,
                    flexDirection : 'row'
                }}>
                    <Image source={{uri:icon.persondefault}}/>
                    <Text style={{
                        width: 0.80 * Screen.width,
                        height: 0.15 * Screen.height,
                    }}>
                        红红火火恍恍惚惚或或或或或或或或或或或或或
                        或或或或或或或或或或或或或或或或或或或或或
                        或或或或或或或或或或或或或或或或或或或或或
                        或
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outer: {
        marginTop:15,
        backgroundColor: '#FFFFFF',
        height:Screen.height,
        width:Screen.width
    },
    container: {
        height:Screen.height,
        width:Screen.width,
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
    header: {
        flexDirection: 'row',
        height: 0.06 * Screen.height
    },
    btn: {
        height: 0.04 * Screen.height,
        width: 0.04 * Screen.height
    },
});
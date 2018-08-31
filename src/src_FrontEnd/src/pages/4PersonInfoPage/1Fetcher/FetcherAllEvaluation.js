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

export default class FetcherAllEvaluation extends Component {
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
                    moduleImg={require('../../../pic/icon_return.png')}
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

    //带哥的全部评价
    _setFetcherAllEvaluation(){
        return(
            <View>
                <View style={{
                    width: 0.90 * Screen.width,
                    height: 0.15 * Screen.height,
                    flexDirection : 'row'
                }}>
                    <Image source={require('../../../pic/icon_contact.png')}/>
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
});
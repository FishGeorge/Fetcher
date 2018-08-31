import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import FetcherOrderComplete from "../1Fetcher_OrderCompletePage/index";
import BRExpandableView from "../../../components/BRExpandableView";
import Screen from "../../../utils/Screen";
import Item from "../../../components/Item";
import CustomModal from "../4Modal";

type Props = {};
export default class FetcherOrdersHost extends Component<Props> {
    constructor(props) {
        super(props);
        this.state ={
            modalVisibility: false,
            currentItemList:{}
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <BRExpandableView
                    initialShowing={0}
                    moduleImg={require('../../../pic/icon_address.png')}
                    moduleName={"梅园食堂"}
                    moduleContent={
                        <View styles={{marginTop: 3, width: 0.95 * Screen.width}}>
                            <Item
                                Url={require('../../../pic/ItemExample.png')}
                                Title="王帆1：1手办"
                                Price="1.00元"
                                Quantity="1"
                                Type="摔跤用品"
                                Address="梅园4B-319"
                                Size="大"
                            />
                            <Item
                                Url={require('../../../pic/ItemExample.png')}
                                Title="李元亨1：1手办"
                                Price="1.00元"
                                Quantity="1"
                                Type="摔跤用品"
                                Address="梅园4B-319"
                                Size="大"
                            />
                            <View style={{alignItems: 'flex-end', marginRight: 5, marginBottom: 10}}>
                                <TouchableOpacity onPress={()=>this.setState({
                                    modalVisibility:true,
                                    currentItemList:{
                                            Title:"王帆1：1手办",
                                            Price:"1.00元",
                                            Quantity:"1"
                                    }})}>
                                    <View style={styles.btn}>
                                        <Text style={{fontSize: 20}}>结算</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.30 * Screen.height
                    }}

                />
                <CustomModal
                    title="标题"
                    ref="_customModal"
                    visibility={this.state.modalVisibility}
                    onLeftPress={() => {
                        this.setState({modalVisibility: false})
                    }}
                    onRightPress={this._pressButton.bind(this)}
                    item1={this.state.currentItemList}
                />
            </View>
        )
    }

    _pressButton(){
        const { navigator } = this.props;
        if (navigator){
            navigator.push({
                name:'FetcherOrderComplete',
                component:FetcherOrderComplete,
            });
        }
        this.setState({modalVisibility: false});
    }

}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#BEBEBE',
        height: 30,
        width: 60,
        borderRadius: 0.032 * Screen.width,
        justifyContent: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
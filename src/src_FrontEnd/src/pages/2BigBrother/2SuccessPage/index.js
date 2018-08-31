import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';

type Props = {};
var Img = require('../../../pic/icon_return.png');
import BigBrotherHost from "../0HostPage/index"
import Screen from "../../../utils/Screen";
import BRExpandableView from "../../../components/BRExpandableView";
import BRDialog from "../../../components/BRDialog";

export default class Success extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            WantInfoContent: this._renderWantInfoContent(),
            WantStateContent: this._renderWantStateContent(),
            brDialogVisibility: false,
        }
    }

    render() {
        return (
            <View style={{flex: 1,
                backgroundColor: '#FFC777'}}>
                <View style={{
                    width: Screen.width,
                    height: 0.06 * Screen.height,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => this._pressButton()}>
                        <Text>完成</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1}} contentContainerStyle={styles.outer} showsVerticalScrollIndicator={false}>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"意向详情"}
                        moduleContent={this.state.WantInfoContent}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"意向状态"}
                        moduleContent={this.state.WantStateContent}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.15 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"物品清单"}
                        moduleContent={this.props.ItemList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.5 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                    <BRExpandableView
                        initialShowing={1}
                        moduleImg={require('../../../pic/list_view.png')}
                        moduleName={"推广栏"}
                        moduleContent={this.props.ItemList}
                        contentViewStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 0.5 * Screen.height
                        }}
                    />
                    <View style={styles.viewBlank}/>
                </ScrollView>
                <BRDialog
                    content={this._renderBRDialogContent()}
                    contentHeight={0.15 * Screen.height}
                    ref="_brDialog"
                    visibility={this.state.brDialogVisibility}
                    onLeftPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                        });
                    }}
                    onRightPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                        })
                    }}/>
            </View>
        )
    }

    // 意向详情清单
    _renderWantInfoContent() {
        return (
            <View>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </View>
        );
    }

    // 意向状态清单
    _renderWantStateContent() {
        return (
            <View>
                <Text>不知道写什么</Text>
                <Text>不知道写什么</Text>
            </View>
        );
    }

    // 完成按钮
    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'BigBrotherHost',
                component: BigBrotherHost
            });
        }
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
    outer: {
        alignItems: 'center',
    },
    viewBlank: {
        height: 0.02 * Screen.height,
        width: 1 * Screen.width,
    }
});
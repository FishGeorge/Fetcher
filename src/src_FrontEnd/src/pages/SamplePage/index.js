import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Screen from '../../utils/Screen'
import BRExpandableView from "../../components/BRExpandableView";
import BRDialog from "../../components/BRDialog"
import LinkedDblList from "../../components/LinkedDblList"
import data from '../../common/listTestData.json'

export class SamplePage extends Component {
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
                <View style={styles.viewBlank}/>
                <BRExpandableView
                    initialShowing={0}
                    moduleImg={require('../../pic/list_view.png')}
                    moduleName={"Module Name"}
                    moduleContent={
                        <Text
                            style={{fontSize: 18}}>
                            {"Module Content"}
                        </Text>}
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />
                <View style={styles.viewBlank}/>
                <BRExpandableView
                    initialShowing={0}
                    moduleImg={require('../../pic/list_view.png')}
                    moduleName={"Test Module"}
                    moduleContent={this.state.moduleContent}
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />
                <BRDialog
                    content={this._renderBRDialogContent()}
                    contentHeight={0.15 * Screen.height}
                    ref="_brDialog"
                    visibility={this.state.brDialogVisibility}
                    onLeftPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                            moduleContent:
                                <Text
                                    style={{fontSize: 18}}
                                    onPress={() => this._renderBRDialog()}>
                                    {"点击了取消"}
                                </Text>
                        });
                    }}
                    onRightPress={() => {
                        this.setState({
                            brDialogVisibility: false,
                            moduleContent:
                                <Text
                                    style={{fontSize: 18}}
                                    onPress={() => this._renderBRDialog()}>
                                    {"点击了确定"}
                                </Text>
                        })
                    }}/>
                <View style={styles.viewBlank}/>
                <View style={{height: 0.78 * Screen.height}}>
                    <LinkedDblList data={data}/>
                </View>
                <View style={{
                    height: 0.1 * Screen.height,
                    width: 1 * Screen.width,
                    backgroundColor: '#FFF666'
                }}/>
            </View>
        )
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
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#FFC777',
        height: Screen.height,
        width: Screen.width
    },
    viewBlank: {
    backgroundColor: '#FFF666',
        height: 0.02 * Screen.height,
        width: 1 * Screen.width,
    }
});
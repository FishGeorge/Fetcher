import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Screen from '../../utils/Screen'
import BRExpandableView from "../../components/BRExpandableView";

export class SamplePage extends Component {

    constructor(props) {
        super(props);
        this.state={
            moduleContent:this._renderModuleContent()
        }
    }

    _renderModuleContent() {
        return (
            <Text style={{fontSize: 14}}>{"(Module Content)"}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.viewBlank}/>
                <BRExpandableView
                    initialShowing={1}
                    moduleImg={require('../../pic/list_view.png')}
                    moduleName={"Module Name"}
                    moduleContent={this.state.moduleContent}
                    contentViewStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 0.15 * Screen.height
                    }}
                />
            </View>
        )
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
        backgroundColor: '#FFC777',
        height: 0.05 * Screen.height,
    }
});
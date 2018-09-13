import React, {Component} from 'react';
import {
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Screen from "../utils/Screen";
import icon from "../common/icon";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkBoxImg: this.props.initialChecked === true ? {uri:icon.check} : {uri:icon.uncheck},
            _onPress: this.props._onPress
        };
        this.isChecked=this.props.initialChecked;
        // console.warn(this.state.checkBoxImg);
    }

    render() {
        return (
            <TouchableOpacity style={{position: 'absolute', right: 15}} onPress={() => {
                this.isChecked = (this.isChecked !== true);
                this.setState({
                    checkBoxImg: this.isChecked === true ? {uri:icon.check} : {uri:icon.uncheck}
                });
                // console.warn(this.state.checkBoxImg)
                this.state._onPress(this.props.param1,this.props.param2);
            }}>
                <Image style={styles.iconStyle2} source={this.state.checkBoxImg}/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    iconStyle2: {
        width: 0.04 * Screen.height,
        height: 0.04 * Screen.height,
        marginRight: 0.01 * Screen.width,
    },
});
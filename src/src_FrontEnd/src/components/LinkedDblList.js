import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Screen from "../utils/Screen";
import LeftFlatList from './LinkedDblList_LeftFlatList'
import RightSectionList from './LinkedDblList_RightSectionList'

export default class LinkedDblList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <LeftFlatList data={this.props.data}/>
                <RightSectionList data={this.props.data}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

    }
});
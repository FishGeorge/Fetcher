import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    Text,
    Button,
} from 'react-native';
import Item from "./Item";
import Screen from "../utils/Screen";


export default class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemArray: this.props.items,
            // itemNumber: ""
        }
    }

    componentWillMount() {
        // this.state.itemNumber = this.state.itemArray.length;
    }

    render() {
        let items = [];
        for (let num = 0; num < this.state.itemArray.length; num++) {
            // console.warn("hit3");
            items.push(
                <Item
                    key={num}
                    viewWidth={this.props.viewWidth}
                    hasQuantity={1}
                    itemInfo={this.state.itemArray[num]}
                    _renderPlusBtn={() => {
                        return;
                    }}
                />
            );
        }

        return (
            <View style={{width: this.props.viewWidth, height: items.length * 0.12 * Screen.height,}}>
                {/*<Text>Test</Text>*/}
                {items}
            </View>
        );
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 30,
    }
});
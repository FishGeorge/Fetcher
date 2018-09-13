import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Animated
} from 'react-native';
import Screen from "../utils/Screen";

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewWidth: this.props.viewWidth,
            itemInfo: this.props.itemInfo,
            hasQuantity: this.props.hasQuantity,
        };
    }

    componentWillMount() {
        this.setState({
            ItemID: this.state.itemInfo.ItemID,
            ItemName: this.state.itemInfo.ItemName,
            Picture: this.state.itemInfo.Picture,
            Type: "种类：" + this.state.itemInfo.Type,
            Location: "地址：" + this.state.itemInfo.Location,
            Size: "尺寸：" + this.state.itemInfo.Size,
            Price: "¥ " + this.state.itemInfo.Price/100 + " 元",
            Weight: this.state.itemInfo.Weight,
            Quantity: this._renderQuantity()
        });
    }

    render() {
        return (
            <View style={{
                height: 0.12 * Screen.height,
                backgroundColor: '#FFFFFF',
                width: this.state.viewWidth === "" ? 0.9 * Screen.width : this.state.viewWidth,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 2
            }}>
                <Image
                    ref="img"
                    style={{
                        borderRadius: 5,
                        marginLeft: 0.01 * Screen.height,
                        height: 0.10 * Screen.height,
                        width: 0.10 * Screen.height
                    }}
                    // resizeMode='contain'
                    source={{uri: this.state.Picture}}
                />
                <View style={{
                    marginLeft: 0.01 * Screen.height,
                    height: 0.12 * Screen.height,
                    width: (this.state.viewWidth === "" ? 0.9 * Screen.width : this.state.viewWidth) - 0.10 * Screen.height
                }}>
                    <Text style={{top: 5, fontSize: 17, color: 'black'}}>{this.state.ItemName}</Text>
                    {/*<Text style={{fontSize: 12, color: 'gray'}}>{this.state.Address}</Text>*/}
                    {/*<Text style={{fontSize: 12, color: 'gray'}}>{this.state.Type}</Text>*/}
                    {/*<Text style={{fontSize: 12, color: 'gray'}}>{this.state.Size}</Text>*/}
                    {/*<Text style={{fontSize: 15, color: 'gray'}}>{this.state.Quantity}</Text>*/}
                    <View style={{
                        width: (this.state.viewWidth === "" ? 0.9 * Screen.width : this.state.viewWidth) - 0.12 * Screen.height,
                        flexDirection: 'row',
                        position: 'absolute',
                        bottom: 5,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 17,
                            color: 'red',
                            // position: 'absolute',
                            left: 3
                        }}>{this.state.Price}</Text>
                        {/*<Text>ttt</Text>*/}
                        {/*<Text style={{*/}
                        {/*fontSize: 16,*/}
                        {/*color: 'red',*/}
                        {/*position: 'absolute',*/}
                        {/*right: 40*/}
                        {/*}}>{this.state.Quantity}</Text>*/}
                        <Text style={{
                            fontSize: 17,
                            color: '#000000',
                            position: 'absolute',
                            right: 25
                        }}>{this.state.Quantity}</Text>
                        {this.props._renderPlusBtn(this.props.that,this.state.itemInfo)}
                    </View>
                </View>
            </View>
        );
    }

    componentDidMount() {
        // this.refs.img.source={uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536032724890&di=cc8788c19eb87c260d579bccb13d79a6&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170620%2Fa111d3bc9ae048cfb731f527c9e4951f.png"}
        // this.refs.img.forceUpdate();
        // console.warn(this.state.ItemID);
        // console.warn(this.state.Quantity)
    }

    _renderQuantity() {
        if (this.props.hasQuantity === 1)
            return "x"+this.state.itemInfo.Quantity;
        else
            return "";
    }

}

const styles = StyleSheet.create({});
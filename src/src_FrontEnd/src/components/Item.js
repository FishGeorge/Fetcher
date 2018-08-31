import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import Screen from "../utils/Screen";
import {Constants} from "../common/Constants";

export default class Item extends Component {



    constructor(props) {
        super(props);
        this.state = {
            Img:"",
            Title:"",
            Description:{
                Price:"",
                Quantity:"",
                Type:"",
                Address:"",
                Size:""
            }
        };
    }

    render() {
        return (
            <Animated.View
                style={{
                height: 0.12*Screen.height,
                backgroundColor:'#F0F0F0',
                width: 0.94 * Screen.width,
                flexDirection:'row',
                    margin:2
            }}>
                <Image style={{height: 0.10*Screen.height, width: 0.10*Screen.height}}
                       resizeMode='cover' source={this.props.Url}/>
                <View style={{flexDirection:'column',width:200}}>
                    <Text style={{fontSize:20,color:'black'}}>{this.state.Title}</Text>
                    <Text style={{fontSize:15,color:'gray'}}>{this.state.Description.Address}</Text>
                    <Text style={{fontSize:15,color:'gray'}}>{this.state.Description.Type}</Text>
                    <Text style={{fontSize:15,color:'gray'}}>{this.state.Description.Size}</Text>
                </View>
                <View style={{flexDirection:'column',alignItems:'flex-end'}}>
                    <Text style={{fontSize:20,color:'black'}}>{this.state.Description.Price}</Text>
                    <Text style={{fontSize:15,color:'gray'}}>{this.state.Description.Quantity}</Text>
                </View>
            </Animated.View>
        );
    }

    componentDidMount(){
        this.setState({
            Title:this.props.Title,
            Description: {
                Type:"种类："+this.props.Type,
                Address:"地址：" + this.props.Address,
                Size:"尺寸：" + this.props.Size,
                Price: "¥ " + this.props.Price,
                Quantity: "X" + this.props.Quantity
            }
        })
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#F0F0F0',
        width: 0.96 * Screen.width,
        height: 0.06 * Screen.height,
        borderRadius: 0.030 * Screen.width,
        justifyContent: 'center',
    },
    btnStyle: {
        height: 20,
        width: 20
    },
    header: {
        fontSize: 16,
        width: 0.75 * Screen.width
    },
    iconStyle: {
        height: 25,
        width: 25
    },
});
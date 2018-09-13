import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    Button
} from 'react-native';
import Swiper from 'react-native-swiper';
import LinkedDblList from "../../../components/LinkedDblList";
import data from '../../../common/HostDblListTestData.json'
import Screen from "../../../utils/Screen";
import PersonPage from "../../4PersonInfoPage/0Person";
import icon from "../../../common/icon";
import {Geolocation} from "react-native-amap-geolocation";

let shoppingList = new Map();
global.shoppingList = shoppingList;
let quantityInCart = 0;
global.quantityInCart = quantityInCart;

export default class BigBrotherHost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShow: true,
            AdPics: [],
            items: [],
            items1: [],
            items_show: [],
            QuantityInCart: quantityInCart,
            location: {},
        };
        Geolocation.init({
            // ios: "",
            android: "02d831b311f6d326ae534d00e2f1e174"
        });
    };

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={{
                    height: 0.07 * Screen.height,
                    backgroundColor: '#FFC750',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        width: 0.07 * Screen.height,
                        paddingLeft: 0.015 * Screen.height
                    }}>
                        <TouchableOpacity>
                            <Image style={styles.img} source={{uri: icon.location}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        height: 0.07 * Screen.height,
                        width: 0.45 * Screen.width,
                        justifyContent: 'center',
                        fontSize: 18,
                        top: 2
                    }}>{this.state.location.poiName}</Text>
                    <View style={{
                        width: 0.07 * Screen.height,
                        position: 'absolute',
                        right: -0.015 * Screen.height
                    }}>
                        <TouchableOpacity onPress={() => this._goPersonPage()}>
                            <Image style={styles.img} source={{uri: icon.user}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*<ScrollView nestedScrollEnabled={true} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>*/}
                <View style={{height: (1 - 0.07 - 0.075) * Screen.height - Screen.STATUSBAR_HEIGHT}}>
                    <View style={{height: 0.25 * Screen.height, width: Screen.width}}>
                        <Swiper
                            autoplay={true}
                            height={0.25 * Screen.height}
                            showsPagination={true}//是否显示圆点
                            dotColor="white"
                            activeDotColor='yellow'
                            horizontal={true}
                            //未选中圆点的样式
                            dot={<View style={{
                                backgroundColor: 'rgba(0,0,0,.2)',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            //圆点的样式（可以调整位置）
                            paginationStyle={{bottom: 3}}
                            //选中圆点的样式
                            activeDot={<View style={{
                                backgroundColor: '#FFC750',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                        >
                            {this.state.AdPics.map((item, index) => {
                                // console.log(item, index);
                                return (<Image style={{height: 0.25 * Screen.height, width: Screen.width}} key={index}
                                               resizeMode='cover' source={{uri: item}}/>)
                            })}
                        </Swiper>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                        <LinkedDblList ref="LinkedDblList" data={data} _renderPlusBtn={this._renderPlusBtn}
                                       that={this}/>
                    </View>
                </View>
                {/*</ScrollView>*/}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0.05 * Screen.height,
                    right: 0.05 * Screen.width,
                    height: 0.065 * Screen.height,
                    width: 0.065 * Screen.height
                }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('ShoppingCartPage');
                    }}>
                        <View style={styles.shoppingList}>
                            <Image style={{height: 0.045 * Screen.height, width: 0.045 * Screen.height,}}
                                   source={{uri: icon.shoppingcart}}/>
                        </View>
                    </TouchableOpacity>
                    <View style={this._renderCartNumStyle()}>
                        <Text style={{fontSize: 14, color: "#ffc750"}}>{this.state.QuantityInCart}</Text>
                    </View>
                    {/*<Button*/}
                        {/*style={{position: 'absolute', width: 20, height: 20, right: 40}}*/}
                        {/*onPress={this.startLocation}*/}
                        {/*title="定位"*/}
                    {/*/>*/}
                </View>
            </View>
        );
    }

    async componentDidMount() {
        // 有bug，暂时不用
        // // 购物车读取
        // storage.getIdsForKey('shoppingList').then(ids => {
        //     storage.load({
        //         key: 'shoppingList',
        //         id: ids,
        //
        //         autoSync: false,
        //     }).then(ret => {
        //         // 取出数据库返回数据
        //         shoppingList.set(ids, ret);
        //         // console.warn(ids + ":" + ret);
        //         console.warn(shoppingList);
        //     }).catch(err => {
        //         // never go here
        //     });
        //     // console.warn("hit2");
        // });

        // 获取广告图
        storage.load({
            key: 'AdPictures',
            autoSync: false,
        }).then(ret => {
            let src = ret;
            for (let i = 0; i < src.length; i++) {
                // console.warn(src[i]);
                this.state.AdPics.push(src[i]);
            }
            this.setState({
                // isShow: true,
                AdPics: this.state.AdPics
            })
        }).catch(err => {
            // never go here
            // console.warn("!!" + err);
        });

        // 先查询数据库商品信息，若过期则通过storageSync
        // 请求服务器商品列表信息，并存储（刷新）到数据库
        // 0911，此处查询数据库，刷新逻辑在storageSync，但首次下载（save）在SplashScene
        storage.load({
            key: 'allItemsInfo',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: false,
            // 你还可以给sync方法传递额外的参数
            // syncParams: {
            //     extraFetchOptions: {
            //         // 各种参数
            //     },
            //     someFlag: true,
            // },
        }).then(ret => {
            // 取出数据库返回数据
            // console.warn(ret);
            this.state.items = ret.ItemInfoList;
            // 对数据进行修改排版以用于显示
            // 填充数据
            // console.warn(this.state.items);
            let items_show_out;
            for (let type = 0; type < 4; type++) {
                let title;
                switch (type) {
                    case 0:
                        title = "饮料";
                        break;
                    case 1:
                        title = "食品";
                        break;
                    case 2:
                        title = "日用品";
                        break;
                    case 3:
                        title = "文具";
                        break;
                }
                this.state.items_show.push({
                    // "key": type.toString(),
                    "title": title,
                    "data": []
                });
                for (let loc = 0; loc < 6; loc++) {
                    let locName;
                    switch (loc) {
                        case 0:
                            locName = "梅园中超超市";
                            break;
                        case 1:
                            locName = "梅园食堂";
                            break;
                        case 2:
                            locName = "桃园天平超市";
                            break;
                        case 3:
                            locName = "桃园食堂";
                            break;
                        case 4:
                            locName = "橘园岗山超市";
                            break;
                        case 5:
                            locName = "橘园食堂";
                            break;
                    }
                    this.state.items_show[type].data.push({
                        // "key":loc.toString(),
                        "locName": locName,
                        "data": []
                    });
                }
            }
            // 遍历items并分类
            for (let num = 0; num < this.state.items.length; num++) {
                switch (this.state.items[num].Type) {
                    case 0:
                        switch (this.state.items[num].Location) {
                            case 13:
                                this.state.items_show[0].data[0].data.push(this.state.items[num]);
                                // console.warn(this.state.items_show[0].data[0].data);
                                break;
                            case 14:
                                this.state.items_show[0].data[1].data.push(this.state.items[num]);
                                break;
                            case 24:
                                this.state.items_show[0].data[2].data.push(this.state.items[num]);
                                break;
                            case 25:
                                this.state.items_show[0].data[3].data.push(this.state.items[num]);
                                break;
                            case 33:
                                this.state.items_show[0].data[4].data.push(this.state.items[num]);
                                break;
                            case 34:
                                this.state.items_show[0].data[5].data.push(this.state.items[num]);
                                break;
                        }
                        break;
                    case 1:
                        switch (this.state.items[num].Location) {
                            case 13:
                                this.state.items_show[1].data[0].data.push(this.state.items[num]);
                                break;
                            case 14:
                                this.state.items_show[1].data[1].data.push(this.state.items[num]);
                                break;
                            case 24:
                                this.state.items_show[1].data[2].data.push(this.state.items[num]);
                                break;
                            case 25:
                                this.state.items_show[1].data[3].data.push(this.state.items[num]);
                                break;
                            case 33:
                                this.state.items_show[1].data[4].data.push(this.state.items[num]);
                                break;
                            case 34:
                                this.state.items_show[1].data[5].data.push(this.state.items[num]);
                                break;
                        }
                        break;
                    case 2:
                        switch (this.state.items[num].Location) {
                            case 13:
                                this.state.items_show[2].data[0].data.push(this.state.items[num]);
                                break;
                            case 14:
                                this.state.items_show[2].data[1].data.push(this.state.items[num]);
                                break;
                            case 24:
                                this.state.items_show[2].data[2].data.push(this.state.items[num]);
                                break;
                            case 25:
                                this.state.items_show[2].data[3].data.push(this.state.items[num]);
                                break;
                            case 33:
                                this.state.items_show[2].data[4].data.push(this.state.items[num]);
                                break;
                            case 34:
                                this.state.items_show[2].data[5].data.push(this.state.items[num]);
                                break;
                        }
                        break;
                    case 3:
                        switch (this.state.items[num].Location) {
                            case 13:
                                this.state.items_show[3].data[0].data.push(this.state.items[num]);
                                break;
                            case 14:
                                this.state.items_show[3].data[1].data.push(this.state.items[num]);
                                break;
                            case 24:
                                this.state.items_show[3].data[2].data.push(this.state.items[num]);
                                break;
                            case 25:
                                this.state.items_show[3].data[3].data.push(this.state.items[num]);
                                break;
                            case 33:
                                this.state.items_show[3].data[4].data.push(this.state.items[num]);
                                break;
                            case 34:
                                this.state.items_show[3].data[5].data.push(this.state.items[num]);
                                break;
                        }
                        break;
                }
            }
            // 强刷新页面
            this.setState({
                // isShow: true,
                items_show: this.state.items_show
            });
            // console.warn(this.state.items_show);
            this.refs.LinkedDblList.setState({data: this.state.items_show});
            this.refs.LinkedDblList.refs.sectionList.setState({sectionData: this.state.items_show[0].data});
            // console.warn(this.state.items_show);
        }).catch(err => {
            // never go here
            // console.warn("!!" + err);
        });

        Geolocation.setOptions({
            interval: 10000,
            distanceFilter: 10,
            background: true,
            reGeocode: true
        });
        Geolocation.addLocationListener(location =>
            this.updateLocationState(location)
        );
        this.startLocation();
        this.startLocation();
    }

    componentWillUnmount() {
        this.stopLocation();
    }

    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date(location.timestamp).toLocaleString();
            this.setState({location: location});
        }
    }

    startLocation = () => {
        Geolocation.start();
        // console.warn(this.state.location);
    };
    stopLocation = () => Geolocation.stop();
    getLastLocation = async () =>
        this.updateLocationState(await Geolocation.getLastLocation());

    _renderPlusBtn(that, item) {
        // console.warn(itemID);
        return (
            <TouchableOpacity onPress={() => BigBrotherHost._addItemToCart(that, item)}
                              style={{position: 'absolute', right: 15}}>
                <Image style={{width: 20, height: 20}} source={{uri: icon.add_blue}}/>
            </TouchableOpacity>
        );
    };

    static _addItemToCart(that, item) {
        // console.warn("add");
        // 查cart是否有该物品
        if (shoppingList.has(item.ItemID)) {
            let quantity = shoppingList.get(item.ItemID);
            quantity++;
            shoppingList.set(item.ItemID, quantity);
        }
        else {
            shoppingList.set(item.ItemID, 1);
        }
        // 刷新主页购物车角标
        that.setState({QuantityInCart: that.state.QuantityInCart + 1});
        // that._refleshCartNum();

        // for (let [key, value]of shoppingList) {
        // that.setState({QuantityInCart: that.state.QuantityInCart + 1});
        // }

        // 存储数据库有bug，暂时不用
        // storage.clearMapForKey('shoppingList').then(() => {
        //     for (var [key, value] of shoppingList.entries()) {
        //         // console.warn(key + ":" + value);
        //         //     shoppingList.set(key, value);
        //         // }
        //         storage.save({
        //             key: 'shoppingList',
        //             id: key,
        //             data: value,
        //             // 永久
        //             expires: null
        //             // // 15s
        //             // expires: 1000 * 15
        //         }).then(() => {
        //             ToastAndroid.show("购物车保存ok", ToastAndroid.SHORT)
        //             // console.warn(shoppingList);
        //         });
        //     }
        // });
    }

    _renderCartNumStyle() {
        if (this.state.QuantityInCart !== 0)
            return styles.cartQuantity1;
        else
            return styles.cartQuantity0;
    }

    _goPersonPage() {
        this.props.navigation.navigate('PersonPage');
    }
}

const
    styles = StyleSheet.create({
        pageContainer: {
            height: (1 - 0.075) * Screen.height - Screen.STATUSBAR_HEIGHT,
            width: Screen.width,
            backgroundColor: '#FFC750'
        },
        shoppingList: {
            height: 0.06 * Screen.height,
            width: 0.06 * Screen.height,
            borderRadius: 0.03 * Screen.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFC750'
        },
        cartQuantity1: {
            height: 0.03 * Screen.height,
            width: 0.03 * Screen.height,
            borderRadius: 0.015 * Screen.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E63300',
            position: 'absolute',
            top: -3,
            left: -3
        },
        cartQuantity0: {
            height: 0,
            width: 0,
        },
        img: {
            width: 0.04 * Screen.height,
            height: 0.04 * Screen.height,
        },
    });
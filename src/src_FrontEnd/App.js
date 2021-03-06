import React, {Component} from 'react';
import {
    View,
    StatusBar,
    ToastAndroid,
} from 'react-native'
import RootStack from "./Navigation";
import Screen from "./src/utils/Screen";
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';
import SocketUtil from "./src/utils/SocketUtil";

// 初始化通信Util
const socketUtil = new SocketUtil("120.79.46.162:8899");
global.socketUtil = socketUtil;

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // 我TM射爆
            // <View>
            <View style={{height: Screen.height - Screen.STATUSBAR_HEIGHT, marginTop: Screen.STATUSBAR_HEIGHT}}>
                <StatusBar animated={true} backgroundColor={"#dca84b"} translucent={true} barStyle={'light-content'}/>
                <RootStack/>
            </View>
        );
    }
}

const storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    sync: {
        // 商品列表信息更新
        allItemsInfo(params) {
            let {id, resolve, reject} = params;
            // ToastAndroid.show("更新商品列表...", ToastAndroid.SHORT);
            // console.warn("hit");
            socketUtil.sendAndReceive(
                "{\"type\":105,\"state\":0}EOS",
                (msg) => {
                    if (JSON.parse(msg).state === 0) {
                        storage.save({
                            key: 'allItemsInfo',
                            data: JSON.parse(msg).data,
                            // 有效期4小时
                            expires: 1000 * 3600 * 4
                            // // 有效期30s
                            // expires: 1000 * 30
                        });
                        // console.warn(JSON.parse(msg).data);
                        // 下面这个数据key用于根据ItemID查询物品信息
                        for (let num = 0; num < JSON.parse(msg).data.ItemInfoList.length; num++) {
                            storage.save({
                                key: 'allItemsInfoinID',
                                id: JSON.parse(msg).data.ItemInfoList[num].ItemID,
                                data: JSON.parse(msg).data.ItemInfoList[num],
                                // 有效期4小时
                                expires: 1000 * 3600 * 4
                                // // 有效期30s
                                // expires: 1000 * 30
                            }).then(ret=>{
                            // console.warn(JSON.parse(msg).data[num].ItemID);
                            });
                        }
                        storage.save({
                            key: 'AdPictures',
                            data: JSON.parse(msg).data.AdPic,
                            // 有效期3天（实际上取决于上面item的更小的过期值，此处会被4小时后覆盖）
                            expires: 1000 * 3600 * 24 * 3
                            // // 有效期30s
                            // expires: 1000 * 30
                        }).then(ret=>{
                            // console.warn(JSON.parse(msg).data[num].ItemID);
                        });
                        // storage.save({
                        //     key: 'SplashPicture',
                        //     data: JSON.parse(msg).data[2].Splash,
                        //     // 有效期3天
                        //     expires: 1000 * 3600 * 24 * 3
                        //     // // 有效期30s
                        //     // expires: 1000 * 30
                        // }).then(ret=>{
                        //     // console.warn(JSON.parse(msg).data[num].ItemID);
                        // });
                        ToastAndroid.show("拉取了" + JSON.parse(msg).data.ItemInfoList.length + "条商品信息", ToastAndroid.SHORT);
                        resolve && resolve(JSON.parse(msg).data);
                    }
                    else {
                        ToastAndroid.show("拉取商品信息失败", ToastAndroid.SHORT);
                        reject && reject(new Error('data error'));
                    }
                }
            );
        },

        // 更新启动页图片
        SplashPicture(params){
            let {id, resolve, reject} = params;
            socketUtil.sendAndReceiveOnOpen(
                "{\"type\":99,\"state\":0}EOS",
                (msg) => {
                    // console.warn(msg);
                    if (JSON.parse(msg).state === 0) {
                        storage.save({
                            key: 'SplashPicture',
                            data: JSON.parse(msg).data.Splash,
                            // 有效期4小时
                            expires: 1000 * 3600 * 4
                            // // 有效期30s
                            // expires: 1000 * 30
                        }).then(ret=>{
                            // console.warn(JSON.parse(msg).data[num].ItemID);
                        });
                        // ToastAndroid.show("拉取了" + JSON.parse(msg).data[0].length + "条商品信息", ToastAndroid.SHORT);
                        resolve && resolve(JSON.parse(msg).data);
                    }
                    else {
                        // ToastAndroid.show("拉取商品信息失败", ToastAndroid.SHORT);
                        reject && reject(new Error('data error'));
                    }
                }
            );
        }
    }
});

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
global.storage = storage;

// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了
import {
    Dimensions,
    Platform,
    PixelRatio
} from 'react-native'

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    onePixel: 1 / PixelRatio.get(),
    STATUSBAR_HEIGHT: (Platform.OS === 'ios' ? 20 : 0),
    APPBAR_HEIGHT: (Platform.OS === 'ios' ? 44 : 56),
}
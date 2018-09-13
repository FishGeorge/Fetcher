import {
    createStackNavigator
} from 'react-navigation';

import MainPage from "./src/pages/0MainPage/index";
import FetcherHost from "./src/pages/1Fetcher/0HostPage";
import FetcherChooseDestination from "./src/pages/1Fetcher/1ChooseAreaPage";
import Fetcher_InfoFillOut from "./src/pages/1Fetcher/2InfoFillOutPage";
import Fetcher_ChooseWant from "./src/pages/1Fetcher/3ChooseWantPage";
import InformationFillOut_B from "./src/pages/2BigBrother/2InfoFillOutPage";
import PersonPage from "./src/pages/4PersonInfoPage/0Person";
import PersonalDetailsPage from "./src/pages/4PersonInfoPage/0Person/PersonalDetailsPage";
import BigB_DetailsPage from "./src/pages/4PersonInfoPage/2BigBrother";
import Fetcher_DetailsPage from "./src/pages/4PersonInfoPage/1Fetcher";
import FetcherAllEvaluation from "./src/pages/4PersonInfoPage/1Fetcher/FetcherAllEvaluation";
import BigBrotherAllEvaluation from "./src/pages/4PersonInfoPage/2BigBrother/BigBrotherAllEvaluation";
import GuideScene from "./src/pages/0MainPage/GuideScene";
import LoginPage from "./src/pages/0MainPage/LoginPage";
import InitialBFPage from "./src/pages/0MainPage/InitialBFPage";
import RegisterPage from "./src/pages/0MainPage/RegisterPage";
import SplashScene from "./src/pages/0MainPage/SplashScene";
import ShoppingCartPage from "./src/pages/2BigBrother/1ShoppingCartPage";

const RootStack = createStackNavigator({
        Main: {screen: MainPage},
        FetcherHost: {screen: FetcherHost},
        FetcherChooseDestination: {screen: FetcherChooseDestination},
        Fetcher_InfoFillOut: {screen: Fetcher_InfoFillOut},
        Fetcher_ChooseWant: {screen: Fetcher_ChooseWant},
        InformationFillOut_B: {screen: InformationFillOut_B},
        ShoppingCartPage: {screen: ShoppingCartPage},
        PersonPage: {screen: PersonPage},
        PersonalDetailsPage: {screen: PersonalDetailsPage},
        BigB_DetailsPage: {screen: BigB_DetailsPage},
        Fetcher_DetailsPage: {screen: Fetcher_DetailsPage},
        FetcherAllEvaluation: {screen: FetcherAllEvaluation},
        BigBrotherAllEvaluation: {screen: BigBrotherAllEvaluation},
        InitialBFPage: {screen: InitialBFPage},
        GuideScene: {screen: GuideScene},
        LoginPage: {screen: LoginPage},
        RegisterPage: {screen: RegisterPage},
        SplashScene: {screen: SplashScene},
    },

    {
        initialRouteName: 'SplashScene', // 默认先加载的页面组件
        mode: 'modal',       // 定义跳转风格(card、modal)
        initialRouteParams:{
            selectedTab:"bigbrother"
        }
    }
);

export default RootStack;
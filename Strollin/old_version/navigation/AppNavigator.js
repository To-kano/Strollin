import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from '../components/screens/Home';
import TagSelection from '../components/screens/TagSelection';
import UserLogin from '../components/screens/UserLogin';
import TripNavigation from '../components/screens/TripNavigation';
import TripSuggestion from '../components/screens/TripSuggestion';
import UserRegister from '../components/screens/UserRegister';

import GoogleApiTest from '../api/google-api/google-api-test';

const AppNavigator = createStackNavigator({
  UserLogin: {screen: UserLogin},
  Home: {screen: Home},
  TagSelection: {screen: TagSelection},
  TripNavigation: {screen: TripNavigation},
  TripSuggestion: {screen: TripSuggestion},
  UserRegister: {screen: UserRegister},
  GoogleApiTest: {screen: GoogleApiTest},
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;

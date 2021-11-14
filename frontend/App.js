import { StatusBar } from 'expo-status-bar';
import React,{component} from 'react';
import {View,Text} from 'react-native'



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}



import * as firebase from 'firebase'

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store= createStore(rootReducer,applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyAvpNrMwmoxPEJ8GxOCOxVrYt5jIT7vkOU",
  authDomain: "instagram-dev-9908b.firebaseapp.com",
  projectId: "instagram-dev-9908b",
  storageBucket: "instagram-dev-9908b.appspot.com",
  messagingSenderId: "582613719046",
  appId: "1:582613719046:web:10a5044cce24994ec70b87",
  measurementId: "G-BR4LHSP0JW"
};

if(firebase.apps.length === 0)
{
  firebase.initializeApp(firebaseConfig)
}
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './Components/auth/Landing'
import RegisterScreen from './Components/auth/Register'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
import CommentScreen from './components/main/Comment'



const Stack = createStackNavigator();


export class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loaded: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true,
        })
      }
      else{
        this.setState({
          loggedIn:true,
          loaded:true,
        })

      }
    })
  }
  render() {
    const {loggedIn,loaded} = this.state;
    if(!loaded){
      return(
        <View style={{flex:1,justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }
    if(!loggedIn){
      return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={ {headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
      
    </NavigationContainer>
      );

    }
    return(
      <Provider store={store}>
        <NavigationContainer>
         <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={ {headerShown: false}}/>
          <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
          <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
          
        </Stack.Navigator>
        </NavigationContainer>
        
      </Provider>
      
      
    )
   
  }
}

export default App






import { StatusBar } from 'expo-status-bar';
import AsynStorage from '@react-native-async-storage/async-storage';
import React, { Component } from "react";
import { localDataSet } from '../BsPosApp/config/localDataSet';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import LogoutScreen from './components/LogoutScreen';
import DashboardScreen from './components/DashboardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const Drawer = createDrawerNavigator();
const windowHeight = Dimensions.get('window').height;

const LandingScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
    {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} /> */}
    <Drawer.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        drawerItemStyle: { height: 0 }
      }}
    />
    <Drawer.Screen
      name="User"
      component={UserScreen}
      options={{
        drawerItemStyle: { height: 0 }
      }}
    />
    {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
  </Drawer.Navigator>
);

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      errors: {},
      initialRouteName: ''
    }
  }

  async getToken() {
    try {
      const token = await localDataSet.getLocal('token');
      console.log("token", token)
      //const token = await AsyncStorage.getItem('token');
      if (token != null) {
        this.setState({
          initialRouteName: 'landing'
        })
        //this.props.navigation.navigate('landing');
      } else {
        // this.props.navigation.navigate('login');
        this.setState({
          initialRouteName: 'login'
        })
      }
      // return token != null ? JSON.parse(token) : null;
    } catch (e) {
      // error reading value
    }
  }
  componentDidMount() {
    this.getToken();
  }
  render() {
    return (
      <NavigationContainer>
        {this.state.initialRouteName ?
          <Stack.Navigator initialRouteName={this.state.initialRouteName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="landing" component={LandingScreen} />
            {/* <Stack.Screen name="dashboard" component={DashboardScreen} /> */}
          </Stack.Navigator> : <ActivityIndicator
            animating={true}
            color="560CCE"
            size='large'
            style={styles.loader}
          />}
      </NavigationContainer>
    )
  }

}


// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="login" component={LoginScreen} />
//         <Stack.Screen name="landing" component={LandingScreen} />
//         {/* <Stack.Screen name="dashboard" component={DashboardScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop:20,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  loader:{
    paddingTop:windowHeight/2,
  }
});

export default App;

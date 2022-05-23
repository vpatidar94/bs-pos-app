import { StatusBar } from 'expo-status-bar';
import AsynStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import UserScreen from './components/UserScreen';
import LogoutScreen from './components/LogoutScreen';
import DashboardScreen from './components/DashboardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="landing" component={LandingScreen} />
        {/* <Stack.Screen name="dashboard" component={DashboardScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop:20,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

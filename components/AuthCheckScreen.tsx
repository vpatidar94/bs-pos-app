import { StatusBar } from 'expo-status-bar';
import AsynStorage from '@react-native-async-storage/async-storage';
import React, { Component } from "react";
import { localDataSet } from '../config/localDataSet';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import LoginScreen from '../components/LoginScreen';
import UpdatePasswordScreen from '../components/UpdatePasswordScreen';
import HomeScreen from '../components/HomeScreen';
import UserScreen from '../components/UserScreen';
import UserEditScreen from '../components/UserEditScreen';
import RouteScreen from '../components/RouteScreen';
import RouteEditScreen from '../components/RouteEditScreen';
import CustomerScreen from '../components/CustomerScreen';
import CustomerEditScreen from '../components/CustomerEditScreen';
import LogoutScreen from '../components/LogoutScreen';
import DashboardScreen from '../components/DashboardScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROLE } from 'codeartist-core'
import Icon from 'react-native-vector-icons/AntDesign';
import 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import AdminDrawer from '../role-drawer/adminDrawer'
import { EmployeeDrawer } from '../role-drawer/employeeDrawer';

const Drawer = createDrawerNavigator();
const windowHeight = Dimensions.get('window').height;

let orignalDrawerScreen;
let role = '';


const LandingScreen = () => (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen}
            options={{
                drawerIcon: config => <Icon
                    size={23}
                    name={'appstore-o'}></Icon>
            }}
        />
        <Drawer.Screen name="Logout" component={LogoutScreen}
            options={{
                drawerIcon: config => <Icon
                    size={23}
                    name={'logout'}></Icon>
            }}
        />
        {/* <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} /> */}

        {/* <Drawer.Screen
      name="userpassword"
      component={UpdatePasswordScreen}
      options={{
        drawerItemStyle: { height: 0 }
      }}
    /> */}
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

        <Drawer.Screen
            name="UserAdd"
            component={UserEditScreen}
            options={{
                drawerItemStyle: { height: 0 }
            }}
        />

        <Drawer.Screen
            name="Route"
            component={RouteScreen}
            options={{
                drawerItemStyle: { height: 0 }
            }}
        />

        <Drawer.Screen
            name="RouteAdd"
            component={RouteEditScreen}
            options={{
                drawerItemStyle: { height: 0 }
            }}
        />

        <Drawer.Screen
            name="Customer"
            component={CustomerScreen}
            options={{
                drawerItemStyle: { height: 0 }
            }}
        />

        <Drawer.Screen
            name="CustomerAdd"
            component={CustomerEditScreen}
            options={{
                drawerItemStyle: { height: 0 }
            }}
        />
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
    </Drawer.Navigator>
);

const test = () => {
    console.log("jai ram ji kippp", role)

    return LandingScreen()
    // return role === ROLE.POS_ADMIN ? AdminDrawer : EmployeeDrawer
}

const Stack = createNativeStackNavigator();

class AuthCheckScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            showList: true,
            errors: {},
            initialRouteName: '',
            roleBasedDrawer: ''
        }
    }

    test1 = () => {
     
        return (<Drawer.Screen name="Home" component={HomeScreen}
            options={{
                drawerIcon: config => <Icon
                    size={23}
                    name={'appstore-o'}></Icon>
            }}
        />)
    }

    async getToken() {
        try {
            const token = await localDataSet.getLocal('token');
            // console.log("token", token)
            if (token != null) {
                let role = localDataSet.getRole()[0];
                role = role;
                this.setState({
                    role: role
                })
                switch (role) {
                    case ROLE.POS_ADMIN: this.setState({ roleBasedDrawer: AdminDrawer });
                        break;
                    case ROLE.POS_EMP: this.setState({ roleBasedDrawer: EmployeeDrawer });
                        break;
                    // case ROLE.POS_CUST: this.props.navigation.navigate('Route');
                    //   break;
                }

                this.setState({
                    initialRouteName: 'landing'
                })
            } else {
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
        console.log(" tttttt", this.getToken())
    }
    render() {
        return (
            //   <NavigationContainer>
            //     {this.state.initialRouteName ?
            //       <Stack.Navigator initialRouteName={this.state.initialRouteName} screenOptions={{ headerShown: false }}>
            //         <Stack.Screen name="login" component={LoginScreen} />
            //         <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
            //         <Stack.Screen name="landing" component={AuthCheckScreen} />
            //         {/* <Stack.Screen name="dashboard" component={DashboardScreen} /> */}
            //       </Stack.Navigator> : <ActivityIndicator
            //         animating={true}
            //         color="560CCE"
            //         size='large'
            //         style={styles.loader}
            //       />}
            //   </NavigationContainer>

            // LandingScreen()

            <Drawer.Navigator initialRouteName="Home">
                {this.test1()}
            </Drawer.Navigator>
            // test()

            // AdminDrawer()
            // <View>
            //     {/* {this.state.roleBasedDrawer} */}
            // </View>
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
    loader: {
        paddingTop: windowHeight / 2,
    }
});

export default AuthCheckScreen;

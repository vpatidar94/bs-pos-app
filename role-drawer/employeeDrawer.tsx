export const EmployeeDrawer = () => (
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
        <Drawer.Screen
            name="Dashboard"
            component={DashboardScreen}
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
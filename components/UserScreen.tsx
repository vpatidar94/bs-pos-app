import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'
import UserService from '../service/userService';
import { localDataSet } from '../config/localDataSet';
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';


const UserServiceApi = new UserService()

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loaderStatus: false
    }
  }

  componentDidMount() {
    // console.log("getTokenValue", this.getTokenValue());

    this.getUserList();
    // this.props.navigation.navigate.addListner('willFocus', this.reLoad);
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.reLoad();
    });
  }


  reLoad = () => {
    this.getUserList();
  }

  getUserList = () => {
    this.setState({
      loaderStatus: true
    })
    UserServiceApi.getUserList()
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            userList: result.body,
            loaderStatus: false
          })
        }
      })
  }
  addUser = () => {
    this.props.navigation.navigate('UserAdd');
  }

  async getTokenValue() {
    try {
      const token = await localDataSet.getLocal('token');

    } catch (e) {
      // error reading value
    }
  }


  backMe = () => {

  }
  selectedUser = (userId) => {

    console.log("jai ram ji ki", userId);
  }

  renderList() {
    return this.state.userList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.emp.nameF + " " + value.emp.nameF}
          onPress={() => this.selectedUser(value.emp._id)}
          right={() => <List.Icon icon="chevron-right" />}
        />

      </View>)
    })
    // console.log("this.state.routeCountListppp", this.state.routeCountList);
    // return this.state.routeCountList.map( (value, i {
    //   return (<View><Text>{value.name}</Text></View>);
    // });
  }

  // hideDialog = () => {
  //   this.setState({
  //     showDialog: false
  //   })
  // }

  render() {
    return (

      <Provider>
        <SafeAreaView style={styles.container}>

          <FAB
            style={styles.fab}
            small
            icon="plus"
            color={theme.colors.surface}
            onPress={this.addUser}
          />

          {this.state.userList &&
            <View>
              {this.state.loaderStatus &&
                <View style={styles.indicator_view}>
                  <ActivityIndicator
                    animating={this.state.loaderStatus}
                    color={theme.colors.primary}
                    size='large'
                    style={styles.loader}
                  />
                </View>}
              <List.Section>
                {!this.state.loaderStatus && <List.Subheader>User List</List.Subheader>}
                <ScrollView>
                  {this.renderList()}
                </ScrollView>
              </List.Section>
            </View>}

        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    marginLeft: 12,
  },
  btnView: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 12,
    // marginRight: 12,
    // padding:20,
  },
  btn: {
    width: "100%",
    color: 'red',
    margin: 20,
    padding: 20
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.primary
  },
  user_view: {
    padding: '2%'
  },
  snackbar: {

  }
});

export default UserScreen;
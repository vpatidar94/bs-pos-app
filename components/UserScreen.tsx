import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'
import UserService from '../service/userService';
import { localDataSet } from '../config/localDataSet';
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserServiceApi = new UserService()

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loaderStatus: false,
      filterRouteCountList: []
    }
  }

  componentDidMount() {
    // console.log("getTokenValue", this.getTokenValue());

    this.getUserList();
    // this.props.navigation.navigate.addListner('willFocus', this.reLoad);
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.setState({
        userList: []
      })
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
            routeCountList: result.body,
            loaderStatus: false
          }, () => this.setDeptValue(DEPT.DISTRIBUTION))
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
    return this.state.filterRouteCountList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.emp.nameF + " " + value.emp.nameF}
          onPress={() => this.selectedUser(value.emp._id)}
          left={props => <List.Icon icon="account-circle-outline" />}
          right={() => <List.Icon icon="chevron-right" />}
        />

      </View>)
    })
    // console.log("this.state.routeCountListppp", this.state.routeCountList);
    // return this.state.routeCountList.map( (value, i {
    //   return (<View><Text>{value.name}</Text></View>);
    // });
  }

  setShowDropDown = (value) => {
    this.setState({
      showDropDownStatus: value
    })
  }

  setDeptValue = (deptType) => {
    this.setState({
      deptType: deptType,
    })
    const filterRouteCountList = this.state.routeCountList.filter((value) => {
      return value.dept.type == deptType;
    })

    this.setState({
      filterRouteCountList
    })

    this.renderList();

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

          <View style={styles.dropDown}>
            <DropDown
              label={"Type"}
              mode={"outlined"}
              visible={this.state.showDropDownStatus}
              showDropDown={() => this.setShowDropDown(true)}
              onDismiss={() => this.setShowDropDown(false)}
              value={this.state.deptType}
              setValue={(deptType) => this.setDeptValue(deptType)}
              list={DEPT_LIST}
            />
          </View>

          {this.state.filterRouteCountList &&
            <View>
              {this.state.loaderStatus &&
                <View>
                  <ActivityIndicator
                    animating={this.state.loaderStatus}
                    color={theme.colors.logo_color}
                    size='large'
                    style={styles.loader}
                  />
                </View>}
              <ScrollView>
                <List.Section>
                  {!this.state.loaderStatus && <List.Subheader>User List</List.Subheader>}
                  {this.renderList()}
                </List.Section>
              </ScrollView>
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
    backgroundColor: theme.colors.logo_color
  },
  user_view: {
    padding: '2%'
  },
  snackbar: {

  },
  loader: {
    paddingTop: windowHeight / 3,
  },
  dropDown: {
    width: '50%',
    paddingLeft: '4%',
    paddingTop: '2%'
  },
});

export default UserScreen;
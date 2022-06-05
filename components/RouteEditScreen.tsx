import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';


const RouteServiceApi = new RouteService();

class RouteEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      snackbarStatus: false,
      showDropDownStatus: true,
      snackbarMsg: '',
    }
  }

  componentDidMount() {

    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.reset();
    });
  }

  reset = () => {
    this.setState({
      updateDeptType: '',
      updateDeptName: ''
    })
  }
  addUser = () => {
    this.setState({
      showList: false
    })
  }

  async getTokenValue() {
    try {
      const token = await localDataSet.getLocal('token');

    } catch (e) {
      // error reading value
    }
  }

  onDismissSnackBar = () => {
    this.setState({
      snackbarStatus: false
    })
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
    const filter = this.state.routeCountList.filter((value) => {
      return value.type == deptType;
    })

  }



  updateRouteCount = () => {
    let routeVo = {
      type: this.state.updateDeptType,
      name: this.state.updateDeptName
    }

    RouteServiceApi.addUpdateRoute(routeVo)
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            snackbarStatus: true,
            snackbarMsg: result.msg
          })

          setTimeout(() => {
            this.props.navigation.navigate('Route');
          }, 2000);
        }
        if (result.status == 'FAIL') {
          this.setState({
            snackbarStatus: true,
            snackbarMsg: result.msg
          })
        }
      })
      .catch(err => {
        if (err.status == 'FAIL') {
          this.setState({
            snackbarStatus: true,
            snackbarMsg: err.msg
          })
        }
      })
  }


  backMe = () => {
    this.props.navigation.navigate('Route');
  }

  setShowDropDown = (value) => {
    this.setState({
      showDropDownStatus: value
    })
  }

  render() {
    return (

      <Provider>
        <SafeAreaView style={styles.container}>

          <View style={styles.user_view}>

            <DropDown
              label={"Type"}
              mode={"outlined"}
              visible={this.state.showDropDownStatus}
              showDropDown={() => this.setShowDropDown(true)}
              onDismiss={() => this.setShowDropDown(false)}
              value={this.state.updateDeptType}
              setValue={(updateDeptType) => this.setState({ updateDeptType })}
              list={DEPT_LIST}
            />
            <TextInputCustom
              label="Name"
              returnKeyType="next"
              value={this.state.updateDeptName}
              onChangeText={(updateDeptName) => this.setState({ updateDeptName })}
              error={!!this.state.errors.updateDeptName}
              errorText={this.state.errors.updateDeptName}
              autoCapitalize="none"
            />


            <ButtonCustom mode="contained" onPress={this.updateRouteCount}>
              Add
            </ButtonCustom>

            <ButtonCustom mode="contained" onPress={this.backMe}>
              Back
            </ButtonCustom>

            <Snackbar
              visible={this.state.snackbarStatus}
              onDismiss={this.onDismissSnackBar}
              style={styles.snackbar}
            >
              {this.state.snackbarMsg}
            </Snackbar>
          </View>

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

  },
  dropDown: {
    width: '50%',
    height: '15%',
  }
});

export default RouteEditScreen;
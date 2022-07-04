import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import Dropdown from '../components/dropdownBig'
import { theme } from '../core/theme'
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';


const RouteServiceApi = new RouteService();

class RouteAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      routeVo: {},
      snackbarStatus: false,
      showDropDownStatus: true,
      snackbarMsg: '',
      selectItem: { "label": "", "value": "" }
    }
  }

  componentDidMount() {
    const unsubscribe = this.props.navigation.addListener('focus', (e) => {
      this.reset();
      this.setState({
        showDropDownStatus: true,
      })
    });
  }

  reset = () => {
    this.setState({
      routeVo: {},
      showDropDownStatus: false,
      selectItem: { "label": "", "value": "" }
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

  setDeptValue = (deptType) => {
    this.setState({
      deptType: deptType,
    })
    const filter = this.state.routeCountList.filter((value) => {
      return value.type == deptType;
    })

  }



  updateRouteCount = () => {
    RouteServiceApi.addUpdateRoute(this.state.routeVo)
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            snackbarStatus: true,
            snackbarMsg: result.msg,
          })

          setTimeout(() => {
            this.reset();
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
    this.reset();
    this.props.navigation.navigate('Route');
  }

  setName = (value) => {
    let routeVo = this.state.routeVo;
    routeVo.name = value;
    this.setState({
      routeVo: routeVo,
    }, () => {
    });
  }

  setDeptType = (deptType) => {
    let routeVo = this.state.routeVo;
    routeVo.type = deptType;
    this.setState({
      routeVo: routeVo
    })
  }

  render() {
    return (

      <Provider>
        <SafeAreaView style={styles.container}>

          <View style={styles.user_view}>
            {this.state.showDropDownStatus &&
              <View style={styles.dropDown}>
                <Dropdown label="Select Item" data={DEPT_LIST} initalSelected={this.state.selectItem} onSelect={(value) => this.setDeptType(value.value)} />
              </View>
            }
            {this.state.showDropDownStatus &&
              <TextInputCustom
                label="Name"
                returnKeyType="next"
                value={this.state.routeVo.name}
                onChangeText={this.setName}
                error={!!this.state.errors.updateDeptName}
                errorText={this.state.errors.updateDeptName}
                autoCapitalize="none"
                iconName="account"
              />
            }

            <ButtonCustom mode="contained" colors={theme.colors.logo_color} onPress={this.updateRouteCount}>
              Add
            </ButtonCustom>

            <ButtonCustom mode="contained"colors={theme.colors.logo_color}  onPress={this.backMe}>
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
    paddingTop: '4%',
    paddingBottom: '2%',
  },
});

export default RouteAddScreen;
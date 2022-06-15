import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import UserService from '../service/userService';
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import Dropdown from '../components/dropdownBig'
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserServiceApi = new UserService()
const RouteServiceApi = new RouteService();
let filterDeptNameList = [];


let selectItem = { "label": "", "value": "" };
class UserEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      snackbarStatus: false,
      showTypeDropDownStatus: true,
      showNameDropDownStatus: true,
      snackbarMsg: '',
      deptType: '',
      routeCounterId: '',
      showDialog: false,
      userList: [],
      routeCountList: '',
      showRouteCountDropDown: false,
      loaderStatus: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.route.params) {
      return {
        nameF: props.route.params.userVo.emp.nameF
      };
    }
    return null;

  }

  componentDidMount() {
    this.getUserList();
    this.getRouteCountList();
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.reset();
    });
  }

  reset = () => {
    this.setState({
      email: "",
      nameF: "",
      nameL: "",
      cell: "",
      deptType: "",
      routeCounterId: "",
      errors: {},
    })
    selectItem = { "label": "", "value": "" }

  }
  getUserList = () => {
    UserServiceApi.getUserList()
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            userList: result.body
          })
        }
      })
  }

  getRouteCountList = () => {

    RouteServiceApi.getRouteList("")
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            routeCountList: result.body
          })
        }
      })
  }

  async getTokenValue() {
    try {
      const token = await localDataSet.getLocal('token');

    } catch (e) {
      // error reading value
    }
  }

  handleValidation = () => {
    this.setState({
      errors: {}
    })
    let errors = {}
    let formIsValid = true
    // Name

    // Email
    if (!this.state.email) {
      formIsValid = false
      errors['email'] = "Email can't be empty"
    } else {
      if (this.state.email) {
        let lastAtPos = this.state.email.lastIndexOf('@')
        let lastDotPos = this.state.email.lastIndexOf('.')
        if (!(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf('@@') == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
        ) {
          formIsValid = false
          errors['email'] = 'Ooops! We need a valid email address.'
        }
      }
    }

    if (!this.state.nameF) {
      formIsValid = false
      errors['nameF'] = "Name can't be empty"
    }
    if (!this.state.nameL) {
      formIsValid = false
      errors['nameL'] = "Last Name can't be empty"
    }

    if (!this.state.cell) {
      formIsValid = false
      errors['cell'] = "Cell can't be empty"
    }

    if (typeof this.state.cell !== "undefined") {

      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(this.state.cell)) {
        formIsValid = false;
        errors["cell"] = "Please enter only number.";
      } else if (this.state.cell.length != 10) {
        formIsValid = false;
        errors["cell"] = "Please enter valid phone number.";
      }
    }

    if (!this.state.deptType) {
      formIsValid = false
      errors['deptType'] = "Type can't be empty"
    }

    if (!this.state.routeCounterId && this.state.deptType) {
      formIsValid = false
      errors['routeCounterId'] = "Name can't be empty"
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  saveUser = () => {

    if (this.handleValidation()) {
      this.setState({
        loaderStatus: true
      })
      const userAuthDto = {
        email: this.state.email,
        nameF: this.state.nameF,
        nameL: this.state.nameL,
        cell: this.state.cell
      }

      const userEmpDepartmentDto = {} as UserEmpDepartmentDto;
      const userVo = {} as UserVo;
      const aclVo = {} as AclVo;

      const empDepartmentVo = {} as EmpDepartmentVo;

      userVo.email = this.state.email;
      userVo.nameF = this.state.nameF;
      userVo.nameL = this.state.nameL;
      userVo.cell = this.state.cell;

      aclVo.role = "POS_EMP";
      aclVo.orgId = "BS";
      aclVo.brId = "BS";
      aclVo.active = true;

      const emp = [];
      emp.push(aclVo);

      userVo.emp = emp;

      empDepartmentVo.routeCounterId = this.state.routeCounterId;
      empDepartmentVo.type = this.state.deptType;
      userEmpDepartmentDto.emp = userVo;
      userEmpDepartmentDto.dept = empDepartmentVo;


      UserServiceApi.updateUserInfo(userEmpDepartmentDto)
        .then(result => {
          if (result.status == 'SUCCESS') {
            this.setState({
              snackbarStatus: true,
              snackbarMsg: result.msg,
              loaderStatus: false
            })
            setTimeout(() => {
              this.props.navigation.navigate('User');
            }, 2000);
          }
          if (result.status == 'FAIL') {
            this.setState({
              snackbarStatus: true,
              snackbarMsg: result.msg,
              loaderStatus: false
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

  }

  backMe = () => {
    this.reset();
    this.props.navigation.navigate('User');
  }
  selectedUser = (userId) => {

    console.log("jai ram ji ki", userId);
  }

  onDismissSnackBar = () => {
    this.setState({
      snackbarStatus: false
    })
  }

  setShowTypeDropDown = (deptType) => {
    this.setState({
      showTypeDropDownStatus: deptType
    })
  }

  setShowNameDropDown = (value) => {
    this.setState({
      showNameDropDownStatus: value
    })
  }

  showDialog = (value) => {
    this.setState({
      showDialog: value
    })
  }

  setDeptType = (deptType) => {
    let deptNameList = [];
    if (this.state.routeCountList) {
      this.setState({
        deptType: deptType,
        showRouteCountDropDown: true
      }, () => {
        const filterList = this.state.routeCountList.filter(value => {
          if (deptType == value.type) {
            let deptVo = {
              label: value.name,
              value: value._id
            }
            deptNameList.push(deptVo)
          }
        })
      })

    }

    filterDeptNameList = deptNameList
  }

  setDeptName = (deptName) => {
    this.setState({
      deptName: deptName
    })
    // this.showDialog(true);
  }

  setDeptName = (routeCounterId) => {
    console.log("deptNamedeptName", routeCounterId);
    this.setState({
      routeCounterId: routeCounterId,
    })
    this.showDialog(false);
  }

  cancel = (deptName) => {
    this.setState({
      deptName: deptName,
    })
    this.showDialog(false);
  }

  renderList() {

    return this.state.userList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.emp.nameF}
          right={() => <List.Icon icon="chevron-right" />}
        />

      </View>)
    })
  }

  render() {
    return (

      <Provider>
        <ScrollView>
          <SafeAreaView style={styles.container}>

            <View style={styles.user_view}>
              <TextInputCustom
                label="Email"
                returnKeyType="next"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                error={!!this.state.errors.email}
                errorText={this.state.errors.email}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                iconName="email"
              />

              <TextInputCustom
                label="First Name"
                returnKeyType="next"
                value={this.state.nameF}
                onChangeText={(nameF) => this.setState({ nameF })}
                error={!!this.state.errors.nameF}
                errorText={this.state.errors.nameF}
                autoCapitalize="none"
                iconName="account"
              />
              <TextInputCustom
                label="Last Name"
                returnKeyType="next"
                value={this.state.nameL}
                onChangeText={(nameL) => this.setState({ nameL })}
                error={!!this.state.errors.nameL}
                errorText={this.state.errors.nameL}
                autoCapitalize="none"
                iconName="account"
              />
              <TextInputCustom
                label="Cell"
                returnKeyType="next"
                value={this.state.cell}
                onChangeText={(cell) => this.setState({ cell })}
                error={!!this.state.errors.cell}
                errorText={this.state.errors.cell}
                autoCapitalize="none"
                iconName="phone"
              />

              {/* <DropDown
                label={"Type"}
                mode={"outlined"}
                visible={this.state.showTypeDropDownStatus}
                showDropDown={() => this.setShowTypeDropDown(true)}
                onDismiss={() => this.setShowTypeDropDown(false)}
                value={this.state.deptType}
                setValue={(deptType) => this.setDeptType(deptType)}
                list={DEPT_LIST}
              /> */}
              <View style={styles.dropDown}>
                <Dropdown label="Select Item" data={DEPT_LIST} initalSelected={selectItem} onSelect={(value) => this.setDeptType(value.value)} />
              </View>

              {this.state.errors.deptType && <Text style={styles.error}>{this.state.errors.deptType}</Text>}

              {this.state.showRouteCountDropDown &&
                // <DropDown
                //   label={"Name"}
                //   mode={"outlined"}
                //   visible={this.state.showNameDropDownStatus}
                //   showDropDown={() => this.setShowNameDropDown(true)}
                //   onDismiss={() => this.setShowNameDropDown(false)}
                //   value={this.state.routeCounterId}
                //   setValue={(routeCounterId) => this.setDeptName(routeCounterId)}
                //   list={filterDeptNameList}
                // />
                <View style={styles.dropDown}>
                  <Dropdown label="Select Item" data={filterDeptNameList} initalSelected={selectItem} onSelect={(value) => this.setDeptName(value.value)} />
                </View>
              }

              {this.state.errors.routeCounterId && <Text style={styles.error}>{this.state.errors.routeCounterId}</Text>}

              <View>
                <Portal>
                  <Dialog visible={this.state.showDialog} onDismiss={() => this.showDialog(false)}>
                    <Dialog.Title>{this.state.deptType} Name</Dialog.Title>
                    <Dialog.Content>
                      {/* <Paragraph>This is simple dialog</Paragraph> */}
                      <TextInputCustom
                        label="Name"
                        returnKeyType="next"
                        value={this.state.deptName}
                        onChangeText={(deptName) => this.setState({ deptName })}
                        autoCapitalize="none"
                      />
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button
                        title="save"
                        onPress={() => this.setDeptName(this.state.deptName)}
                      />
                      <Button
                        title="cancel"
                        onPress={() => this.cancel('')}
                      />
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>

              {this.state.loaderStatus &&
                <View style={styles.indicator_view}>
                  <ActivityIndicator
                    animating={this.state.loaderStatus}
                    color={theme.colors.logo_color}
                    size='large'
                    style={styles.loader}
                  />
                </View>}

              <ButtonCustom mode="contained" onPress={this.saveUser}>
                Add User
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
        </ScrollView>
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
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
  indicator_view: {
  },
  dropDown: {
    paddingTop: '4%',
    paddingBottom: '2%',
  },
});

export default UserEditScreen;
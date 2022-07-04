import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import Dropdown from '../components/dropdownBig'
import { theme } from '../core/theme'
import CustomerService from '../service/customerService';
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import { UserVo, AclCustVo, UserCustTypeDto, CustTypeVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomerServiceApi = new CustomerService()
const RouteServiceApi = new RouteService();
// let filterDeptNameList = [];
let selectItem = { "label": "", "value": "" };
let selectItemDept = { "label": "", "value": "" };
let userCustTypeDto = {} as UserCustTypeDto;
// let userVo = {} as UserVo;
let aclCustVo = {} as AclCustVo;
class CustomerEditScreen extends Component {
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
      customerList: [],
      routeCountList: '',
      showRouteCountDropDown: false,
      showDeptTypeDropDown: false,
      loaderStatus: false,
      userVo: {},
      custTypeVo: {},
      filterDeptNameList: []
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.route.params.userVo) {
      if (state.userVo.email) {
        let deptValue = ""
        userCustTypeDto = props.route.params.userVo.custType;

        let deptType = state.custTypeVo.type
        let routeCounterId = state.custTypeVo.routeCounterId
        if (deptType === DEPT.DISTRIBUTION) {
          deptValue = 'Distribution'
        } else {
          deptValue = 'Counter'
        }
        selectItemDept = { "label": deptValue, "value": state.custTypeVo.type };

        let deptNameList = [];
        if (state.routeCountList) {

          state.routeCountList.filter(value => {
            if (deptType == value.type) {
              let custTypeVo = {
                label: value.name,
                value: value._id
              }
              if (routeCounterId === value._id) {
                selectItem = { "label": value.name, "value": value._id };
              }
              deptNameList.push(custTypeVo)
            }
          })

          return {
            email: state.email,
            nameF: state.nameF,
            nameL: state.nameL,
            cell: state.cell,
            deptType: deptType,
            routeCounterId: routeCounterId,
            // selectItem: selectItem,
            showDeptTypeDropDown: true,
            // showRouteCountDropDown: true,
            userVo: state.userVo,
            custTypeVo: state.custTypeVo,
            filterDeptNameList: deptNameList
          };
        }
      } else {
        let deptValue = '';
        // userCustTypeDto = props.route.params.userVo;
        // userCustTypeDto.dept =  props.route.params.userVo.dept;
        // userCustTypeDto.emp =  props.route.params.userVo.emp;

        userCustTypeDto = props.route.params.userVo.custType;
        let deptType = props.route.params.userVo.custType.type
        let routeCounterId = props.route.params.userVo.custType.routeCounterId

        if (deptType === DEPT.DISTRIBUTION) {
          deptValue = 'Distribution'
        } else {
          deptValue = 'Counter'
        }
        selectItemDept = {
          "label": deptValue, "value": props.route.params.userVo.custType.type
        };
        // this.setDeptType(props.route.params.userVo.dept.type)

        let deptNameList = [];
        if (state.routeCountList) {

          state.routeCountList.filter(value => {
            if (deptType == value.type) {
              let custTypeVo = {
                label: value.name,
                value: value._id
              }
              if (routeCounterId === value._id) {
                selectItem = { "label": value.name, "value": value._id };
              }
              deptNameList.push(custTypeVo)
            }
          })
          // filterDeptNameList = deptNameList
          return {
            userVo: props.route.params.userVo.cust,
            custTypeVo: props.route.params.userVo.custType,
            email: props.route.params.userVo.cust.email,
            nameF: props.route.params.userVo.cust.nameF,
            nameL: props.route.params.userVo.cust.nameF,
            cell: props.route.params.userVo.cust.cell,
            deptType: props.route.params.userVo.custType.type,
            // selectItem: selectItem,
            routeCounterId: props.route.params.userVo.custType.routeCounterId,
            showDeptTypeDropDown: true,
            showRouteCountDropDown: true,
            filterDeptNameList: deptNameList
          };
        }

        // deptNameList.filter(value => {
        //   if (routeCounterId === value.value) {
        //     selectItem = { "label": value.label, "value": value.value };
        //   }
        // })
      }
    }
    return null;

  }


  componentDidMount() {
    this.getCustomerList();
    this.getRouteCountList();
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      // this.reset();
    });
  }

  reset = () => {
    this.props.route.params = ''
    selectItemDept = { "label": "", "value": "" },
      selectItem = { "label": "", "value": "" }
    this.setState({
      email: "",
      nameF: "",
      nameL: "",
      cell: "",
      deptType: "",
      routeCounterId: "",
      errors: {},
      userVo: {},
      custTypeVo: {},
      showDeptTypeDropDown: false,
      showRouteCountDropDown: false,
    })
  }
  getCustomerList = () => {
    CustomerServiceApi.getCustomerList()
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            customerList: result.body
          })
        }
      })
  }

  getRouteCountList = () => {

    RouteServiceApi.getRouteList("")
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            routeCountList: result.body,
            showDeptTypeDropDown: true
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

      const userCustTypeDto = {} as UserCustTypeDto;
      // const userVo = {} as UserVo;
      // const aclCustVo = {} as AclCustVo;

      // const custTypeVo = {} as CustTypeVo;

      // userVo.email = this.state.email;
      // userVo.nameF = this.state.nameF;
      // userVo.nameL = this.state.nameL;
      // userVo.cell = this.state.cell;

      aclCustVo.role = "POS_CUST";
      aclCustVo.orgId = "BS";
      aclCustVo.brId = "BS";
      aclCustVo.active = true;

      const cust = [];
      cust.push(aclCustVo);

      this.state.userVo.cust = cust;

      // custTypeVo.routeCounterId = this.state.routeCounterId;
      // custTypeVo.type = this.state.deptType;
      userCustTypeDto.cust = this.state.userVo;
      userCustTypeDto.custType = this.state.custTypeVo;

      CustomerServiceApi.updateCustomerInfo(userCustTypeDto)
        .then(result => {
          if (result.status == 'SUCCESS') {
            this.setState({
              snackbarStatus: true,
              snackbarMsg: result.msg,
              loaderStatus: false
            })
            setTimeout(() => {
              this.props.navigation.navigate('Customer');
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
          console.log("errerr", err)
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
    this.props.navigation.navigate('Customer');
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
    let custTypeVo = this.state.custTypeVo;
    custTypeVo.type = deptType;
    custTypeVo.routeCounterId = ""
    selectItem = { "label": "", "value": "" };
    this.setState({
      showRouteCountDropDown: false
    })
    let deptNameList = [];
    if (this.state.routeCountList) {
      this.setState({
        custTypeVo: custTypeVo,
        // showRouteCountDropDown: true
      }, () => {
        const filterList = this.state.routeCountList.filter(value => {
          if (deptType == value.type) {
            let custTypeVo = {
              label: value.name,
              value: value._id
            }
            deptNameList.push(custTypeVo)
          }
        })
        this.setState({
          filterDeptNameList: deptNameList,
          // showRouteCountDropDown: true
        })
        setTimeout(() => {
          this.setState({
            showRouteCountDropDown: true
          })
        }, 2000);
      })
    }
    // filterDeptNameList = deptNameList
  }

  setDeptName = (routeCounterId) => {
    let custTypeVo = this.state.custTypeVo;
    custTypeVo.routeCounterId = routeCounterId;
    this.setState({
      routeCounterId: routeCounterId,
    })
    this.showDialog(false);
  }

  setEmail = (value) => {
    let userVo = this.state.userVo;
    userVo.email = value;
    this.setState({
      userVo: userVo,
      showDeptTypeDropDown: true
    }, () => {
    });
  }

  setNameFirst = (value) => {
    let userVo = this.state.userVo;
    userVo.nameF = value;
    this.setState({
      userVo: userVo,
      showDeptTypeDropDown: true
    }, () => {
    });
  }

  setNameLast = (value) => {
    let userVo = this.state.userVo;
    userVo.nameL = value;
    this.setState({
      userVo: userVo,
      showDeptTypeDropDown: true
    }, () => {
    });
  }

  setCell = (value) => {
    let userVo = this.state.userVo;
    userVo.cell = value;
    this.setState({
      userVo: userVo,
      showDeptTypeDropDown: true
    }, () => {
    });
  }

  cancel = (deptName) => {
    this.setState({
      deptName: deptName,
    })
    this.showDialog(false);
  }

  renderList() {

    return this.state.customerList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.cust.nameF}
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
        <ScrollView>
          <SafeAreaView style={styles.container}>


            <View style={styles.user_view}>
              <TextInputCustom
                label="Email"
                returnKeyType="next"
                value={this.state.userVo.email}
                onChangeText={this.setEmail}
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
                value={this.state.userVo.nameF}
                onChangeText={this.setNameFirst}
                error={!!this.state.errors.nameF}
                errorText={this.state.errors.nameF}
                autoCapitalize="none"
                iconName="account"
              />
              <TextInputCustom
                label="Last Name"
                returnKeyType="next"
                value={this.state.userVo.nameL}
                onChangeText={this.setNameLast}
                error={!!this.state.errors.nameL}
                errorText={this.state.errors.nameL}
                autoCapitalize="none"
                iconName="account"
              />
              <TextInputCustom
                label="Cell"
                returnKeyType="next"
                value={this.state.userVo.cell}
                onChangeText={this.setCell}
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

              {this.state.showDeptTypeDropDown &&
                <View style={styles.dropDown}>
                  <Dropdown label="Select Item" data={DEPT_LIST} initalSelected={selectItemDept} onSelect={(value) => this.setDeptType(value.value)} />
                </View>
              }
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
                  <Dropdown label="Select Item" data={this.state.filterDeptNameList} initalSelected={selectItem} onSelect={(value) => this.setDeptName(value.value)} />
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
                        value={this.state.userVo.deptName}
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

              {/* <ActivityIndicator
                animating={this.state.loaderStatus}
                color={theme.colors.primary}
                size='large'
              /> */}
              <ButtonCustom mode="contained" onPress={this.saveUser}>
                Edit User
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

export default CustomerEditScreen;
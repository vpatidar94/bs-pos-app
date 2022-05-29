import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'
import UserService from '../service/userService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST } from 'codeartist-core'


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

const typeList = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Others",
    value: "others",
  },
];

const UserServiceApi = new UserService()
class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
      errors: {},
      snackbarStatus: false,
      showDropDownStatus: true,
      snackbarMsg: '',
      deptType: '',
      deptName: '',
      showDialog: false
    }
  }

  componentDidMount() {
    // console.log("getTokenValue", this.getTokenValue());
    // this.getUserList();
    console.log("DEPT_LIST",DEPT_LIST);
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
  saveUser = () => {
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

    empDepartmentVo.name = this.state.deptName;
    empDepartmentVo.type = this.state.deptType;
    userEmpDepartmentDto.emp = userVo;
    userEmpDepartmentDto.dept = empDepartmentVo;


    console.log("jai ram ji ki add user", userEmpDepartmentDto)
    UserServiceApi.updateUserInfo(userEmpDepartmentDto)
      .then(result => {
        console.log("resultresultresult",result);
        if (result.status == 'SUCCESS') {
          this.setState({
            snackbarStatus: true,
            snackbarMsg: result.msg
          })
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
    this.setState({
      showList: true
    })
  }
  selectedUser = (userId) => {

    console.log("jai ram ji ki", userId);
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

  showDialog = (value) => {
    this.setState({
      showDialog: value
    })
  }

  setDeptValue = (deptType) => {
    this.setState({
      deptType: deptType,
    })
    this.showDialog(true);
  }

  setDeptName = (deptName) => {
    this.setState({
      deptName: deptName,
    })
    this.showDialog(false);
  }

  cancel = (deptName) => {
    this.setState({
      deptName: deptName,
    })
    this.showDialog(false);
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

          {this.state.showList ? <FAB
            style={styles.fab}
            small
            icon="plus"
            color={theme.colors.surface}
            onPress={this.addUser}
          /> : <Text> </Text>}

          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
          {this.state.showList ? <List.Section>
            <List.Subheader>User List</List.Subheader>
            <List.Item title="Shyam Patidar" left={() => <List.Icon icon="folder" />} onPress={() => this.selectedUser('test')} />
            <List.Item
              title="Ram Sharma"
              left={() => <List.Icon color="#000" icon="folder" />}
            />
          </List.Section> : <Text> </Text>}

          {!this.state.showList ?

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
              />

              <TextInputCustom
                label="First Name"
                returnKeyType="next"
                value={this.state.nameF}
                onChangeText={(nameF) => this.setState({ nameF })}
                error={!!this.state.errors.nameF}
                errorText={this.state.errors.nameF}
                autoCapitalize="none"
              />
              <TextInputCustom
                label="Last Name"
                returnKeyType="next"
                value={this.state.nameL}
                onChangeText={(nameL) => this.setState({ nameL })}
                error={!!this.state.errors.nameL}
                errorText={this.state.errors.nameL}
                autoCapitalize="none"
              />
              <TextInputCustom
                label="Cell"
                returnKeyType="next"
                value={this.state.cell}
                onChangeText={(cell) => this.setState({ cell })}
                error={!!this.state.errors.cell}
                errorText={this.state.errors.cell}
                autoCapitalize="none"
              />

              {/* <DropDown
            label={"Department"}
            mode={"outlined"}
            visible={true}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={()=> setShowDropDown(false)}
            value={this.dept}
            setValue={this.deptValue}
            list={DEPT_LIST}
            /> */}

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

            : <Text> </Text>}

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
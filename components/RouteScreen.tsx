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

const RouteServiceApi = new RouteService();
let filterRouteCountList = [];
class RouteScreen extends Component {
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
      routeCountList: ''
    }
  }

  componentDidMount() {
    this.getRouteCountList();
  }

  getRouteCountList = () => {

    RouteServiceApi.getRouteList("")
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            routeCountList: result.body,
          })
          filterRouteCountList = result.body

          this.setDeptValue(DEPT.DISTRIBUTION);
        }
        // console.log("resultresultresult", result);
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
    filterRouteCountList = filter;

    this.renderList();

  }


  backMe = () => {
    this.setState({
      showList: true
    })
  }

  setShowDropDown = (value) => {
    this.setState({
      showDropDownStatus: value
    })
  }

  renderList() {

    console.log("filterRouteCountListfilterRouteCountList", filterRouteCountList)
    return filterRouteCountList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.name}
          right={() => <List.Icon color="#000" icon="forward" />}
        />

      </View>)
    })
    // console.log("this.state.routeCountListppp", this.state.routeCountList);
    // return this.state.routeCountList.map( (value, i {
    //   return (<View><Text>{value.name}</Text></View>);
    // });
  }


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

          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}

          {/* <View>
          {this.state.routeCountList.map(value => (
            (<View><Text>{value.name}</Text></View>)
          ))}
          </View> */}

          {this.state.showList ? filterRouteCountList ?
            <View>
              <List.Section>
                <List.Subheader>Router/Counter List</List.Subheader>
                {this.renderList()}

              </List.Section>
            </View> : <Text> </Text> : <Text> </Text>}

          {!this.state.showList ?

            <View style={styles.user_view}>

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
              <TextInputCustom
                label="Name"
                returnKeyType="next"
                value={this.state.deptName}
                onChangeText={(name) => this.setState({ deptName })}
                error={!!this.state.errors.deptName}
                errorText={this.state.errors.deptName}
                autoCapitalize="none"
              />


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

  },
  dropDown: {
    width: '50%',
    height: '15%'
  }
});

export default RouteScreen;
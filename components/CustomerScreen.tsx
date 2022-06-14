import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import CustomerService from '../service/customerService';
import Dropdown from '../components/dropdown'
import { localDataSet } from '../config/localDataSet';
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dptList = [
  {
    "label": "All",
    "value": "ALL"
  }, {
    "label": "Distribution",
    "value": "DISTRIBUTION"
  }, {
    "label": "Counter",
    "value": "COUNTER"
  }];

const selectItem = { "label": "All", "value": "ALL" };

const CustomerServiceApi = new CustomerService()

class CustomerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      loaderStatus: false,
      routeCountList: [],
      filterRouteCountList: []
    }
  }

  componentDidMount() {
    // console.log("getTokenValue", this.getTokenValue());

    this.getCustomerList();
    // this.props.navigation.navigate.addListner('willFocus', this.reLoad);
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.reLoad();
    });
  }


  reLoad = () => {
    this.setState({
      customerList: [],
      filterRouteCountList: []
    })
    this.getCustomerList();
  }

  getCustomerList = () => {
    this.setState({
      loaderStatus: true
    })
    CustomerServiceApi.getCustomerList()
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
    this.props.navigation.navigate('CustomerAdd');
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
  selectedUser = (customerId) => {

    console.log("jai ram ji ki", customerId);
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
    let filterRouteCountList = [];
    if (deptType == "ALL") {
      filterRouteCountList = this.state.routeCountList;
    } else {
      filterRouteCountList = this.state.routeCountList.filter((value) => {
        return value.custType.type == deptType;
      })
    }

    this.setState({
      filterRouteCountList
    })

    this.renderList();

  }

  renderList() {
    return this.state.filterRouteCountList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.cust.nameF + " " + value.cust.nameF}
          left={props => <List.Icon icon="account-circle-outline" />}
          onPress={() => this.selectedUser(value.cust._id)}
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

          <View style={styles.dropDown}>
            <Dropdown label="Select Item" data={dptList} initalSelected={selectItem} onSelect={(value) => this.setDeptValue(value.value)} />
          </View>
          {/* <View style={styles.dropDown}>
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
          </View> */}

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
              <List.Section>
                {!this.state.loaderStatus && <List.Subheader>Customer List</List.Subheader>}
                <ScrollView style={{ height: 500 }}>
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
    paddingLeft: '4%',
    paddingTop: '2%',
  },
});

export default CustomerScreen;
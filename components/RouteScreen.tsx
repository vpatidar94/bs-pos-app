import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import { theme } from '../core/theme'
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
import Dropdown from '../components/dropdown'
import { UserVo, AclVo, UserEmpDepartmentDto, EmpDepartmentVo, DEPT_LIST, DEPT } from 'codeartist-core'
import { ActivityIndicator } from 'react-native-paper';


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

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


const RouteServiceApi = new RouteService();
let filterRouteCountList = [];
class RouteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeVo: {},
      routeCountList: [],
      loaderStatus: false,
      selected: '',
      selectItem: { "label": "All", "value": "ALL" },
      dropDownStatus: true
    }
  }

  componentDidMount() {
    this.getRouteCountList();
    const unsubscribe = this.props.navigation.addListener('state', (e) => {
      // Prevent default action
      this.reLoad();
    });
  }

  reLoad = () => {
    filterRouteCountList = []
    this.setState({
      // routeVo: {},
      routeCountList: [],
      dropDownStatus: false,
      selectItem: { "label": "All", "value": "ALL" }
    })
    this.getRouteCountList();
  }

  getRouteCountList = () => {

    this.setState({
      loaderStatus: true
    })
    RouteServiceApi.getRouteList("")
      .then(result => {
        if (result.status == 'SUCCESS') {
          this.setState({
            routeCountList: result.body,
            loaderStatus: false,
            dropDownStatus: true,
          }, () => this.setDeptValue("ALL"))
        }
      })
  }
  addUser = () => {
    this.props.navigation.navigate('RouteAdd', {
      routeVo: this.state.routeVo
    });
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
    let filter = []
    if (deptType == "ALL") {
      filter = this.state.routeCountList;
    } else {
      filter = this.state.routeCountList.filter((value) => {
        return value.type == deptType;
      })
    }

    filterRouteCountList = filter;

    this.renderList();

  }

  selecteRoute(routeVo) {
    this.props.navigation.navigate('RouteEdit', {
      routeVo
    });
  }

  renderList() {
    return filterRouteCountList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.name}
          onPress={() => this.selecteRoute(value)}
          right={() => <List.Icon icon="chevron-right" />}
        />

      </View>)
    })
  }


  render() {
    return (
      <Provider>
        <SafeAreaView>

          <FAB
            style={styles.fab}
            small
            icon="plus"
            color={theme.colors.surface}
            onPress={this.addUser}
          />
          {this.state.dropDownStatus &&
            <View style={styles.dropDown}>
              <Dropdown label="Select Item" data={dptList} initalSelected={this.state.selectItem} onSelect={(value) => this.setDeptValue(value.value)} />
            </View>
          }

          {filterRouteCountList &&
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
                {!this.state.loaderStatus && <List.Subheader>Router/Counter List</List.Subheader>}
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
  loader: {
    paddingTop: windowHeight / 3,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.logo_color
  },
  dropDown: {
    paddingLeft: '4%',
    paddingTop: '2%',
  },
  indicator: {}
});

export default RouteScreen;
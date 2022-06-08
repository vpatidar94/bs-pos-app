import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, FlatList, StatusBar, Dimensions } from "react-native";
import { FAB, List, Snackbar, Provider, Surface, Dialog, Portal, Paragraph } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { theme } from '../core/theme'
import RouteService from '../service/routeService';
import { localDataSet } from '../config/localDataSet';
import TextInputCustom from '../components/common/TextInput'
import ButtonCustom from '../components/common/Button'
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


const RouteServiceApi = new RouteService();
let filterRouteCountList = [];
class RouteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeCountList: [],
      loaderStatus: false
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
      routeCountList: []
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
            loaderStatus: false
          }, () => this.setDeptValue(DEPT.DISTRIBUTION))
        }
      })
  }
  addUser = () => {
    this.props.navigation.navigate('RouteAdd');
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



  renderList() {
    return filterRouteCountList.map((value, index) => {
      return (<View key={index}>
        <List.Item
          title={value.name}
          right={() => <List.Icon icon="chevron-right" />}
        />

      </View>)
    })
  }


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

          {filterRouteCountList &&
            <View>
              {this.state.loaderStatus &&
                <View style={styles.indicator_view}>
                  <ActivityIndicator
                    animating={this.state.loaderStatus}
                    color={theme.colors.logo_color}
                    size='large'
                    style={styles.loader}
                  />
                </View>}
              <List.Section>
                {!this.state.loaderStatus && <List.Subheader>Router/Counter List</List.Subheader>}
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
    width: '50%',
    paddingLeft: '4%',
    paddingTop: '2%'
  },
  indicator: {}
});

export default RouteScreen;
import React, { Component } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View, FlatList, Image, Dimensions } from "react-native";
import { localDataSet } from '../config/localDataSet';
import Card from './Card';
import { ROLE } from 'codeartist-core'
import { AdminMenuList } from '../role-drawer/AdminMenuList'
import { EmployeeMenuList } from '../role-drawer/EmployeeMenuList'
import AuthService from '../service/authService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AuthServiceeApi = new AuthService()

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  onChangeText = (event) => {
    let userName = this.state.userName;
    let userPassword = this.state.userPassword
  };

  componentDidMount() {
    this.getRole()
  }

  async getRole() {
    let role = await AuthServiceeApi.getRole();

    switch (role) {
      case ROLE.POS_ADMIN: this.setState({ dataSource: AdminMenuList.getAdminMenuList() });
        break;
      case ROLE.POS_EMP: this.setState({ dataSource: EmployeeMenuList.getEmployeeMenuList() });
        break;
      // case ROLE.POS_CUST: this.props.navigation.navigate('Route');
      //   break;
    }
  }

  openMe = (id) => {
    switch (id) {
      case 1: this.props.navigation.navigate('Dashboard');
        break;
      case 2: this.props.navigation.navigate('User');
        break;
      case 3: this.props.navigation.navigate('Route');
        break;
      case 4: this.props.navigation.navigate('Customer');
        break;

    }
  }

  render() {
    return (
      <SafeAreaView >
        {/* <Text> jjjj {this.state.dataSource}</Text>  */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'column', padding: '1%' }}>
              <Text onPress={() => this.openMe(item.id)}>
                <Card style={styles.card} icon={item.icon}>
                  <Text style={styles.sectionTitle}>{item.sectionTitle}</Text>
                </Card>
              </Text>
              {/* <Image style={styles.imageThumbnail} source={{ uri: item.src }} /> */}
            </View>
          )}
          //Setting the number of column
          numColumns={2}

          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    alignItems: 'center', // Centered horizontally
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
  },
  card: {
    height: windowHeight - 550,
    width: windowWidth - 190,
    backgroundColor: 'white',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
});

export default HomeScreen;
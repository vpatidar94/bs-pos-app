import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../service/authService';
import { localDataSet } from '../config/localDataSet';

const AuthServiceApi = new AuthService()

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userPassword: '',
      actionMessage: '',
      alertBox: false,
      errors: {},
    };
  }

  componentDidMount() {
    let token = this.getData();
  }



  async getData() {
    try {
      const token = await localDataSet.getLocal('token');
      //const token = await AsyncStorage.getItem('token');
      console.log("jsonValuejsonValue", token);
      if (token != null) {
        this.props.navigation.navigate('landing');
      } else {
        this.props.navigation.navigate('login');
      }
      // return token != null ? JSON.parse(token) : null;
      return token;
    } catch (e) {
      // error reading value
    }
  }



  handleValidation = () => {
    let errors = {}
    let formIsValid = true
    // Name

    // Email
    if (!this.state.userName) {
      formIsValid = false
      errors['email'] = 'Cannot be empty'
    }
    if (typeof this.state.userName !== 'undefined') {
      let lastAtPos = this.state.userName.lastIndexOf('@')
      let lastDotPos = this.state.userName.lastIndexOf('.')
      if (!(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        this.state.userName.indexOf('@@') == -1 &&
        lastDotPos > 2 &&
        this.state.userName.length - lastDotPos > 2
      )
      ) {
        formIsValid = false
        errors['email'] = 'Email is not valid'
      }
    }
    if (!this.state.userPassword) {
      formIsValid = false
      errors['password'] = 'Cannot be empty'
    }

    this.setState({ errors: errors })
    return formIsValid
  }
  onChangeText = (event) => {
    let userName = this.state.userName;
    let userPassword = this.state.userPassword
  };

  loginMe = () => {
    const userAuthDto = {
      email: this.state.userName,
      password: this.state.userPassword
    }
    if (this.handleValidation()) {
      AuthServiceApi.loginInfo(userAuthDto)
        .then(result => {
          if (result.status == 'SUCCESS') {
            this.setState({
              actionMessage: result.message,
              alertBox: true,
            })
            if (result.body.token) {
              localDataSet.setLocal('token', result.body.token);
              this.props.navigation.navigate('landing');
            }
          } else {

            this.setState({
              actionMessage: result.message,
              alertBox: true,
            })
          }
        })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: "50%",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(userName) => this.setState({ userName })}
            placeholder="Enter User Name"
            value={this.state.userName}
          />
          <View>
            <Text>
              {this.state.errors.email}
            </Text>
          </View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(userPassword) => this.setState({ userPassword })}
            placeholder="Enter User Password"
            value={this.state.userPassword}
          />
          <View style={styles.btnView}>
            <Button
              style={styles.btn}
              title="Login"
              onPress={this.loginMe}
            />
          </View>

          {this.state.alertBox ? <View>
            <Text>{this.state.actionMessage} </Text>
          </View> : <Text> </Text>}

          {/* <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
        </ScrollView>
      </SafeAreaView>
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
  }
});

export default LoginScreen;
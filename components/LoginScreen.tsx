import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../service/authService';
import { localDataSet } from '../config/localDataSet';
import ButtonCustom from '../components/common/Button'
import TextInputCustom from '../components/common/TextInput'
import { theme } from '../core/theme'
import { StackActions } from '@react-navigation/native';
import { UserAuthDto } from 'codeartist-core';
import { ActivityIndicator } from 'react-native-paper';

const AuthServiceApi = new AuthService()

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      actionMessage: '',
      alertBox: false,
      errors: {},
      loaderStatus: false
    };
  }

  componentDidMount() {
    this.getData();
  }



  async getData() {
    try {
      const token = await localDataSet.getLocal('token');
      //const token = await AsyncStorage.getItem('token');
      if (token != null) {
        this.props.navigation.navigate('landing');
      } else {
        this.props.navigation.navigate('login');
      }
      // return token != null ? JSON.parse(token) : null;
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

    if (!this.state.password) {
      formIsValid = false
      errors['password'] = "Password can't be empty"
    } else {
      if (this.state.password.length < 5) {
        formIsValid = false
        errors['password'] = 'Password must be at least 5 characters long'
      }
    }

    this.setState({ errors: errors })
    return formIsValid
  }

  loginMe = () => {

    const userAuthDto = {} as UserAuthDto;
    userAuthDto.email = this.state.email;
    userAuthDto.password = this.state.password;

    if (this.handleValidation()) {
      this.setState({
        loaderStatus: true
      })
      AuthServiceApi.loginInfo(userAuthDto)
        .then(result => {
          console.log("result", result.body.token);
          if (result.status == 'SUCCESS') {
            if (result.body.token) {
              localDataSet.setLocal('token', result.body.token);
              // this.props.navigation.navigate('landing');
              this.setState({
                loaderStatus: false
              })
              this.props.navigation.dispatch(
                StackActions.replace('landing')
              );
            }
          } else {

            this.setState({
              actionMessage: result.message,
              alertBox: true,
              loaderStatus: false
            })
          }
        })
        .catch(err => {
          this.setState({
            actionMessage: "Please Enter Valid Email Id and Password",
            alertBox: true,
            loaderStatus: false
          })
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
          {/* <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Enter User Name"
            value={this.state.email}
          />
          <View>
            <Text>
              {this.state.errors.email}
            </Text>
          </View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Enter User Password"
            value={this.state.password}
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
          </View> : <Text> </Text>} */}

          <TextInputCustom
            label="Email"
            returnKeyType="next"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            error={!!this.state.errors.email}
            errorText={this.state.errors.email}
            disabled={this.state.loaderStatus}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInputCustom
            label="Password"
            returnKeyType="done"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            error={!!this.state.errors.password}
            errorText={this.state.errors.password}
            disabled={this.state.loaderStatus}
            secureTextEntry
          />
          {/* <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View> */}
          {this.state.loaderStatus && <ActivityIndicator
            animating={this.state.loaderStatus}
            color={theme.colors.primary}
            size='large'
          />}

          <ButtonCustom mode="contained" disabled={this.state.loaderStatus} onPress={this.loginMe}>
            Login
          </ButtonCustom>

          {this.state.alertBox ? <View>
            <Text style={styles.loginFailed}>{this.state.actionMessage} </Text>
          </View> : <Text> </Text>}
          {/* <View style={styles.row}>
            <Text>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View> */}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loginFailed: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
})
// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
//   label: {
//     marginLeft: 12,
//   },
//   btnView: {
//     width: "100%",
//     alignItems: 'center',
//     justifyContent: 'center',
//     // marginLeft: 12,
//     // marginRight: 12,
//     // padding:20,
//   },
//   btn: {
//     width: "100%",
//     color: 'red',
//     margin: 20,
//     padding: 20
//   }
// });

export default LoginScreen;
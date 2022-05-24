import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../service/authService';
import { localDataSet } from '../config/localDataSet';
import ButtonCustom from '../components/common/Button'
import TextInputCustom from '../components/common/TextInput'
import { theme } from '../core/theme'
import { StackActions } from '@react-navigation/native';

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
    if (!this.state.userName) {
      formIsValid = false
      errors['email'] = "Email can't be empty"
    } else {
      if (this.state.userName) {
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
          errors['email'] = 'Ooops! We need a valid email address.'
        }
      }
    }

    if (!this.state.userPassword) {
      formIsValid = false
      errors['password'] = "Password can't be empty"
    } else {
      console.log("jj", this.state.userPassword.length)
      if (this.state.userPassword.length < 5) {
        formIsValid = false
        errors['password'] = 'Password must be at least 5 characters long'
      }
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
              // this.props.navigation.navigate('landing');
              this.props.navigation.dispatch(
                StackActions.replace('landing')
              );
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
          {/* <Text style={styles.label}>User Name</Text>
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
          </View> : <Text> </Text>} */}

          <TextInputCustom
            label="Email"
            returnKeyType="next"
            value={this.state.userName}
            onChangeText={(userName) => this.setState({ userName })}
            error={!!this.state.errors.email}
            errorText={this.state.errors.email}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInputCustom
            label="Password"
            returnKeyType="done"
            value={this.state.userPassword}
            onChangeText={(userPassword) => this.setState({ userPassword })}
            error={!!this.state.errors.password}
            errorText={this.state.errors.password}
            secureTextEntry
          />
          {/* <View style={styles.forgotPassword}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ResetPasswordScreen')}
            >
              <Text style={styles.forgot}>Forgot your password?</Text>
            </TouchableOpacity>
          </View> */}
          <ButtonCustom mode="contained" onPress={this.loginMe}>
            Login
      </ButtonCustom>
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
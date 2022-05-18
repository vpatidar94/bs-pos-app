import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View } from "react-native";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  onChangeText = (event) => {
    let userName = this.state.userName;
    let userPassword = this.state.userPassword
    console.log("jai ram ji");
  };

  loginMe = () => {
    // alert("jai ram ji ki");
    this.props.navigation.navigate('landing');
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
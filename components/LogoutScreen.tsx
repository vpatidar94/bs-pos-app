import React, { Component } from "react";
import { Text, SafeAreaView, ScrollView, StyleSheet, TextInput, Button, View } from "react-native";
import { localDataSet } from '../config/localDataSet';

class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  componentDidMount() {
    localDataSet.removeLocal('token');
    this.props.navigation.navigate('login');
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        
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

export default LogoutScreen;
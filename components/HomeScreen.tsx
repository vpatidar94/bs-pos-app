import React, { Component } from "react";
import { Text, SafeAreaView, StyleSheet, TextInput, Button, View, FlatList, Image } from "react-native";
import Card from './Card';

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
    console.log("jai ram ji");
  };

  componentDidMount() {
    var that = this;
    let homeItems =[{
      id: 1, sectionTitle: 'Dashboard',
    },{
      id: 2, sectionTitle: 'Customer'
    },{
      id: 3, sectionTitle: 'Customer1'
    },{
      id: 4, sectionTitle: 'Customer2'
    },{
      id: 5, sectionTitle: 'Customer2'
    },{
      id: 6, sectionTitle: 'Customer2'
    },{
      id: 7, sectionTitle: 'Customer2'
    },{
      id: 8, sectionTitle: 'Customer2'
    },{
      id: 9, sectionTitle: 'Customer2'
    },{
      id: 10, sectionTitle: 'Customer2'
    },{
      id: 11, sectionTitle: 'Customer2'
    },{
      id: 12, sectionTitle: 'Customer2'
    },{
      id: 13, sectionTitle: 'Customer2'
    },{
      id: 14, sectionTitle: 'Customer2'
    }]
    let items = Array.apply(null, Array(6)).map((v, i) => {
      return {
        id: i, sectionTitle: 'Dashboard'
      };
    });
    that.setState({
      //Setting the data source
      dataSource: homeItems,
    });
  }

  openMe = () => {
    this.props.navigation.navigate('Dashboard');
  }

  render() {
    return (
      <SafeAreaView >
        {/* <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Dashboard</Text>
        </Card> */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{flexDirection: 'column',padding: '1%'}}>
              <Card  style={styles.card}>
                <Text style={styles.sectionTitle} onPress={this.openMe}>{item.sectionTitle}</Text>
              </Card>
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
    height: 100,
    width: 170,
    backgroundColor: 'white',
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
  },
});

export default HomeScreen;
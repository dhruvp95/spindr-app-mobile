import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Video from './Video';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      fake: {
        "id": "3",
        "sex" : "m",
        "social_score": "10",
        "interests": ["b", "c"],
        "match_social_score": "10",
        "match_interests": "45",
        "match_weighted_interests": {"a": 0.2, "b":0.3}
      }
    }
  }

  readyToPlay = () => {
    axios.get(`http://13.57.52.97:3000/api/userId/${this.props.userId}`)
    .then(info => {
      this.setState({ userInfo : this.state.fake });
      console.log('UserInfo:', this.state.userInfo);
    })
    .then(() => {
      this.postToFlask();1
    })
    .catch(err => {
      console.log('Fetch err:', err);
    })
  }
  //
  postToFlask = () => {
    console.log('im in posttoflask', this.state.userInfo)
    axios.post('http://54.153.58.44:5000/',  this.state.userInfo, {
      headers: {
        'Content-Type': 'application/json'
      }})
    .then(() => {
      console.log('Posted to flask:', this.state.userInfo);
    })
    .catch(err => {
      console.log('posttoflask err', err);
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log('this is props in Main: ', this.props)
    return (
      <View style={styles.container}>
        <StatusBar
        barStyle='light-content'/>
        <Button
        title = 'Ready'
        buttonStyle={styles.readyBtn}
        onPress = {
          () => {
            this.readyToPlay()
            navigate('Ready');
          } 
          } />
        <Button 
        title = 'Matches'
        onPress = {() => navigate('Matches')}
        />
        <Button 
        title = 'Profile'
        onPress = {() => navigate('Profile')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  readyBtn: {
    borderRadius: 100,
  }
});

const mainState = (store) => {
  return {
    userId: store.Auth.userId,
  }
}

export default connect(mainState, null)(Main);

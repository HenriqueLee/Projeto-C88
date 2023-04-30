import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import PostCard from './PostCard'
import firebase from 'firebase'


import { FlatList } from 'react-native-gesture-handler'

const posts = require('./temp.json')





export default class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
      light_theme: true,
      posts: []
    }
  }

  

  

  async fetchUser() {
    let theme
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', snapshot => {
        theme = snapshot.val().current_theme
        this.setState({
          light_theme: theme === 'light'
        })
      })
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ posts: posts });
          //this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };


  renderItem = ({ item: post }) => {
    return (
      <PostCard post={post} navigation={this.props.navigation}></PostCard>
    )
  }
  keyExtractor = (item, index) => index.toString()
  componentDidMount(){
    this.fetchUser();
    this.fetchPosts();
  }
  render() {
    
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
              Espectagram
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            
             {
              !this.state.posts[0]?
              <View><Text>Nenhum post encontrado</Text></View>
              :
              <FlatList
              data={this.state.posts}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
            />}
          </View>
        </View>
      )
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c'
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white'
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row'
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center'
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    
  },
  cardContainer: {
    flex: 0.93
  },

  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    
  }
})


import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";
import firebase from "firebase";




export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
      is_liked: false,
 //likes: this.props.route.params.story.likes,
 light_theme: false
    };
  }

  
  
  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.props.route.params.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };
  async initiateTTS(title, author, story, moral) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("The moral of the story is!");
      Speech.speak(moral);
    } else {
      Speech.stop();
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

  componentDidMount(){
    this.fetchUser();
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } 
      return (
        <View style={this.state.light_theme?styles.containerLight:styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme? styles.appTitleTextLight:styles.appTitleText}>Espectagram</Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <ScrollView style={this.state.light_theme? styles.storyCardLight:styles.storyCard}>
              <Image
                source={require("../assets/image_1.jpg")}
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={this.state.light_theme? styles.storyTitleTextLight:styles.storyTitleText}>
                    {this.props.route.params.post.caption}
                  </Text>
                  <Text style={this.state.light_theme? styles.storyAuthorTextLight:styles.storyAuthorText}>
                    {this.props.route.params.post.author}
                  </Text>
                  
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.story.title,
                        this.props.route.params.story.author,
                        this.props.route.params.story.story,
                        this.props.route.params.story.moral
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={{ margin: RFValue(15) }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                //onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />

                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
              
              
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },

  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    
  },

  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "black",
    borderRadius: RFValue(20)
  },


  storyCardLight: {
    margin: RFValue(20),
    backgroundColor: "white",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    
    fontSize: RFValue(25),
    color: "white"
  },

  storyTitleTextLight: {
    
    fontSize: RFValue(25),
    color: "black"
  },

  storyAuthorText: {
    
    fontSize: RFValue(18),
    color: "white"
  },

  storyAuthorTextLight: {
    
    fontSize: RFValue(18),
    color: "black"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    
    fontSize: RFValue(15),
    color: "white"
  },

  storyTextLight: {
    
    fontSize: RFValue(15),
    color: "black"
  },
  moralText: {
    
    fontSize: RFValue(20),
    color: "white"
  },

  moralTextLight: {
   
    fontSize: RFValue(20),
    color: "black"
  },

  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10)
  },
  
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
   
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  },
  likeTextLight: {
    
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6
  }
});
import React from "react";
import {View, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView, StyleSheet} from "react-native";

function Home(props) {
  const signIn = () => {
    // Navigate to another screen for Login
    props.navigation.navigate("Login");
  };

  const signUp = () => {
    // Navigate to another screen for Sign Up
    props.navigation.navigate("SignUp");
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bgi.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>{}</View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Your Pantry, {"\n"}Our Plan!</Text>
          <Text style={styles.secondaryText}>
            {" "}
            Whip Up Magic with What's on Hand{" "}
          </Text>

          <View style={styles.inputContainer}></View>
        </View>
        {}
        <View style={styles.buttonContainer}>
          <>
            <TouchableOpacity style={styles.button1} onPress={signIn}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={signUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "left",
  },
  text: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 25,
    marginBottom: 20,
  },
  secondaryText: {
    color: "#A6A6A6",
    fontSize: 20,
    textAlign: "left",
    paddingLeft: 25,
    marginBottom: 25,
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    paddingBottom: 40,
  },
  button1: {
    backgroundColor: "#355E3B",
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: "100%",
  },
  button2: {
    backgroundColor: "#66000000",
    paddingVertical: 15,
    borderRadius: 20,
    borderColor: "#355E3B",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",

    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;

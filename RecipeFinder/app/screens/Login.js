import React, { useState } from "react";
import { View, TextInput, Text, ImageBackground, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      //console.log(response);
      props.navigation.navigate("Dashboard"); // Navigate to Dashboard upon successful login
    } catch (error) {
      //console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/bgi.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>Welcome Back! </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              secureTextEntry={true}
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
        </View>
        {/* Button container moved outside of the flex: 1 container to push it to the bottom */}
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#56CCF2" />
          ) : (
            <>
              <TouchableOpacity style={styles.button1} onPress={signIn}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </>
          )}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding an overlay effect
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,

    marginTop: 100, // Adjusted marginTop to position the text further up
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 25, // Increased font size
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    width: "100%", // Adjusted for full width
    alignItems: "center",
    paddingVertical: 15,
    padding: 20,
    borderRadius: 20,
    marginBottom: 80,
  },
  input: {
    width: "100%", // Full width of the container
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingHorizontal: 15,
    fontSize: 16,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    paddingBottom: 40, // Add padding to avoid buttons touching the edges of the screen
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

export default Login;

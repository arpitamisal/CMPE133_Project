import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import SignUp from "./app/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#526e75", // Set the background color of the header
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold", // Set the font weight of the title
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "#526e75", // Set the background color of the header
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold", // Set the font weight of the title
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

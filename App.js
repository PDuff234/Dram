import * as React from 'react'; 
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';


import CustHomeScreen from './screens/CustomerScreen';
import BartenderHome from './screens/BartenderScreen';
import ManagerHome from './screens/ManagerScreen'; 

import CustSignUp from './screens/SignUpPage_Customer';
import EmpSignUp from './screens/SignUpPage_Manager';
import BarSignUp from './screens/SignUpPage_Bartender';

import EmpLoginScreen from './screens/LoginPage_Manager';
import BarLoginScreen from './screens/LoginPage_Bartender';
import CustLoginScreen from './screens/LoginPage_Customer';




function HomeScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <StatusBar style="auto" />          
      <Image style = {{flex: 1, width: 400, height: 200, resizeMode: 'contain'}} source = {{uri: 'https://www.pngitem.com/pimgs/m/276-2761991_university-of-south-florida-transparent-university-of-south.png'}} />
      <Text style = {{ color: '#CFC493', fontSize: 32, marginTop: 20, fontFamily: 'Garamond'}}>
        Dram: All in One Cocktail App
      </Text>
      <Text style = {{ color: '#CFC493', fontSize: 20, marginTop: 6, marginBottom: 40, fontFamily: 'Garamond'}}>
        Chantal Espinosa, Patrick Duffany, Mike Bodzenski
      </Text>     
        <Button
          title="Bartender Login"
          onPress={() => navigation.navigate('Bartender Login')}
        />
        <Button
          title="Manager Login"
          onPress={() => navigation.navigate('Manager Login')}
        />
        <Button
          title="Customer Login"
          onPress={() => navigation.navigate('Customer Login')}
        />
        
    </View>
  );
}

function EmployeeLoginScreen() {
  return (
    <View style = {styles.container}>
      <EmpLoginScreen />
    </View>
  );
}

function BartenderLoginScreen() {
  return (
    <View style = {styles.container}>
      <BarLoginScreen />
    </View>
  );
}

function CustomerLoginScreen() {
  return (
    <View style = {styles.container}>
      <CustLoginScreen />
    </View>
  );
}

function ManagerScreen() {
  return (
    <View style = {styles.container}>
      <ManagerHome />
    </View>
  ); 
}

function BartenderScreen() {
  return (
    <View style = {styles.container}>
      <BartenderHome />
    </View>
  ); 
}

function CustomerScreen() {
  return (
    <View style = {styles.container}>
      <CustHomeScreen />
    </View>
  ); 
}

function CustSignUpPage() {
  return (
    <View style = {styles.container}>
      <CustSignUp />
    </View>
  ); 
}

function EmpSignUpPage() {
  return (
    <View style = {styles.container}>
      <EmpSignUp />
    </View>
  ); 
}

function BarSignUpPage() {
  return (
    <View style = {styles.container}>
      <BarSignUp />
    </View>
  ); 
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Manager Login" component={EmployeeLoginScreen} />
        <Stack.Screen name="Bartender Login" component={BartenderLoginScreen} />
        <Stack.Screen name="Customer Login" component={CustomerLoginScreen} />
        <Stack.Screen name="Manager Sign Up" component={EmpSignUpPage} />
        <Stack.Screen name="Bartender Sign Up" component={BarSignUpPage} />
        <Stack.Screen name="Customer Sign Up" component={CustSignUpPage} />
        <Stack.Screen name="Manager Screen" component={ManagerScreen} />
        <Stack.Screen name="Bartender Screen" component={BartenderScreen} />
        <Stack.Screen name="Customer Screen" component={CustomerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006747',
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    flexDirection: "row", 
    justifyContent: "space-around", 
    backgroundColor: 'green', 
  }, 
});
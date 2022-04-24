import * as React from 'react'; 
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import InscriptionScreen from './screens/SignUpPage';
import LoginScreen from './screens/LoginPage';
import CustomerHome from './screens/CustomerScreen';

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
          title="Employee Login"
          onPress={() => navigation.navigate('Employee Login')}
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
      <LoginScreen />
    </View>
  );
}

function BartenderLoginScreen() {
  return (
    <View style = {styles.container}>
      <LoginScreen />
    </View>
  );
}

function CustomerLoginScreen() {
  return (
    <View style = {styles.container}>
      <LoginScreen />
    </View>
  );
}

function EmployeeScreen() {
  return (
    <View style = {styles.container}>

    </View>
  ); 
}

function BartenderScreen() {
  return (
    <View style = {styles.container}>

    </View>
  ); 
}

function CustomerScreen() {
  return (
    <View style = {styles.container}>
      <CustomerHome />
    </View>
  ); 
}

function SignUpPage() {
  return (
    <View style = {styles.container}>
      <InscriptionScreen />
    </View>
  ); 
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Employee Login" component={EmployeeLoginScreen} />
        <Stack.Screen name="Bartender Login" component={BartenderLoginScreen} />
        <Stack.Screen name="Customer Login" component={CustomerLoginScreen} />
        <Stack.Screen name="Sign Up Page" component={SignUpPage} />
        <Stack.Screen name="Employee Screen" component={EmployeeScreen} />
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
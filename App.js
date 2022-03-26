import * as React from 'react'; 
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';


//Original Code
/*
export default function App() 
{
  return (
    <View style = {styles.container}>
        <StatusBar style="auto" />          
        <Image style = {{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} source = {{uri: 'https://www.pngitem.com/pimgs/m/276-2761991_university-of-south-florida-transparent-university-of-south.png'}} />
        <Button 
          title = "Bartender Login"
          onPress = {() => navigate('Bartender')}
        />
        <Button
          title = "Employee Login"
          onPress = {() => navigate('Employee')}
        />
        <Button
          title = "Customer Login"
          onPress = {() => navigate('Customer')}
        />
        <Text style = {{ color: '#CFC493', fontSize: 32, marginTop: 20, fontFamily: 'garamond'}}>
          Dram: All in One Cocktail App
        </Text>
        <Text style = {{ color: '#CFC493', fontSize: 20, marginTop: 6, fontFamily: 'garamond'}}>
          Chantal Espinosa, Patrick Duffany, Mike Bodzenski
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006747',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function inputField (props)
{
  const {label, placeholder, value, onChangeText} = props; 
  return
  (
    <View>
      <Text> {label} </Text>
      <TextInput
        placeholder = {placeholder}
        value = {value}
        onChangeText = {onChangeText}
      />
    </View>
  );
}
*/

//Testing code

function HomeScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <StatusBar style="auto" />          
      <Image style = {{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}} source = {{uri: 'https://www.pngitem.com/pimgs/m/276-2761991_university-of-south-florida-transparent-university-of-south.png'}} />
      <Text style = {{ color: '#CFC493', fontSize: 32, marginTop: 20, fontFamily: 'Garamond'}}>
        Dram: All in One Cocktail App
      </Text>
      <Text style = {{ color: '#CFC493', fontSize: 20, marginTop: 6, fontFamily: 'Garamond'}}>
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
    </View>
  );
}

function BartenderLoginScreen() {
  return (
    <View style = {styles.container}>
    </View>
  );
}

function CustomerLoginScreen() {
  return (
    <View style = {styles.container}>
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
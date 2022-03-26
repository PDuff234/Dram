# Initial Step: How to create a React Native App

## Introduction: Binaries and Application to use

Using VSCode, add and open a new project workspace. 

Open a terminal Window to your new workspace and execute the following commands

```
node -v
npm -v
npm install -g expo-cli
```

Once you have all that installed, you will finally be able to go into the expo CLI

## Expo CLI

Common Commands
- expo init [app-name]
- npm start

Once you create an app and its dependencies with expo init, and depending on what template you choose (for now we will just run in blank), change directories to the new application you created in the expo cli. 

To actually start your app, run an npm start command and follow the prompts on the terminal. In general, it will run the app in a webpage 

In general, you will be spending most of your time in the app.js file

## Documentation

[Expo API](https://docs.expo.dev/versions/latest/)

[React Native Components](https://reactnative.dev/docs/components-and-apis)

[Flexbox](https://reactnative.dev/docs/flexbox)

# Step 2: Core Components

## View Component

View component lets you create responsive layouts using flexbox  and add styling to nested components, similar to the div element in HTML

General style of a view component

`<View style = {{height: 100, width: 100, backgroundColor: 'red'}}>
</View>`

```javascript
import React from 'react';
import { View } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
    <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
  </View>
);

export default App;
```

## Text Component

Expo and React Native translate components to their native counterpart, and the web you can render text anywhere in a document without adding parent elements, however on Android and iOS, thats not possible

To render text on apps, the string needs to be wrapped in a text component. The component can also inherit styling from a parent text component

Example: 

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style = {{fontSize: 16}}>
    The 
    <Text style = {{fontWeight: 'bold'}}> quick brown fox </Text> 
    jumps over the lazy dog
    </Text>
  </View>
);

export default App;
```

## Image Component

Component that renders an image. You can load an image from a https://, a local file://, Base64 encoded string, or an image imported as a module

```javascript
import React from 'react';
import { Image, View } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
  <Image style = {{width: 100, height: 100}} source ={{uri: 'https://wallpaperaccess.com/full/1343906.jpg'}}/>
  <Image style = {{width: 100, height: 100}} source =   {require('./react-native.jpg')}/>
  </View>
);

export default App;
```

## ScrollView Component

ScrollView allows us to fully manage and customize how the content should be scrolled, since iOS and Android do not have scroll limits unlike web apps

```javascript
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style={{ fontSize: 24, textAlign: 'center' }}>
      Scroll me!
    </Text>
    <View style={{ height: 400, backgroundColor: '#e5e5e5' }}>
      <ScrollView vertical>
      {/* This is our scrollable area */}
      <View style={{ width: 300, height: 300, backgroundColor: 'red' }} />
      <View style={{ width: 300, height: 300, backgroundColor: 'green' }} />
      <View style={{ width: 300, height: 300, backgroundColor: 'blue' }} />
      </ScrollView>
    </View>
  </View>
);

export default App;
```

## Button Component

Buttons are exactly what they sound!

Examples

```javascript
<Button
  title="Profile page"
  onPress={() => navigate('profile')}
/>
```

```javascript
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const App = () => {
  const [pressedCount, setPressedCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ margin: 16 }}>
        {pressedCount > 0
          ? `The button was pressed ${pressedCount} times!`
          : 'The button isn\'t pressed yet'
        }
      </Text>
      <Button
        title='Press me'
        onPress={() => setPressedCount(pressedCount + 1)}
        disabled = {pressedCount >= 3}
      />
    </View>
  );
};

export default App;
```

## TextInput Component

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

const App = () => {
  const [name, setName] = useState('');

  return (
    <View style={{
      flex: 1,
      alignContent: 'center', 
      justifyContent: 'center', 
      padding: 16,
    }}>
      <Text style={{ marginVertical: 16 }}>
        {name ? `Hi ${name}!` : 'What is your name?'}
      </Text>
      <TextInput
        style={{ padding: 8, backgroundColor: '#f5f5f5' }}
        onChangeText={text => setName(text)}
        secureTextEntry
      />
    </View>
  );
};

export default App;
```

## Combining Components

As with anything, you can combine components to make a more complex and eloquent app. This also includes reusability of components such as...

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Box color = 'red' />
    <Box color = 'green' />
    <Box color = 'blue' />
  </View>
);

export default App;

export const Box = (test) => (
  <View style = {{width: 100, height: 100, backgroundColor: test.color}} />
);
```

As opposed to the normal declaration of each style by employing this method below

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
    <View style={{ width: 100, height: 100, backgroundColor: 'green' }} />
    <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
  </View>
);

export default App;

export const Box = () => (
  <View style = {{width: 100, height: 100, backgroundColor: temp.color}} />
);
```
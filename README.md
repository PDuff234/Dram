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

# How to run the application

Once you have all of the binaries installed to run this application, to have this run you must start the server and ensure that the host is configured correctly. 
- Go into the server folder and verify the configuration of your instance is correct
- Once verified, start the server with `nodemon index` or any other command to start the index file in a separate command prompt

With the server started... run the application in React Native and see how it works!

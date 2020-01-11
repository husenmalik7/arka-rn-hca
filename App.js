/**
 * App.js
 *
 * Root component of the app, 
 * responsible for setting up routes.
 *
*/

// Libs
import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EngineerListScreen from './src/screens/Engineer/EngineerListScreen';
import EngineerDetailScreen from './src/screens/Engineer/EngineerDetailScreen'

/**
 * createStackNavigator
 *
 * Creates a stack of our routes.
 *
*/
const Navigator = createStackNavigator({
    Login: { 
        screen: LoginScreen,  
        navigationOptions: { headerShown: false }
    },
    Register: { 
        screen: RegisterScreen,
        navigationOptions: { headerShown: false }
    },
    EngineerList: { 
        screen: EngineerListScreen,
        navigationOptions: { headerShown: false }
    },
    EngineerDetail: {
        screen: EngineerDetailScreen,
        navigationOptions: { headerShown: false }
    }

});


/**
 * createAppContainer
 *
 * Responsible for managing app state and linking
 * the top-level navigator to the app environment.
 *
*/
const App = createAppContainer(Navigator);

export default App;
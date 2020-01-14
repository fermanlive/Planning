import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/home';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import ForgetPasswordScreen from './src/screens/forgetPassword';
import ProfileScreen from './src/screens/profile';



const homeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home'
    }
  },  
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      title: 'Perfil'
    }
  },
},{
  initialRouteName:'Home'
}
);

const loginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      title: 'Registro'
    }
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: {
      title: 'Olvidaste Contraseña?'
    }
  },
},{
  initialRouteName:'Login'
}
);

export default createAppContainer(createSwitchNavigator(
  {
    home: homeStack,
    login: loginStack,
  },
  {
    initialRouteName: 'login',
  }
));

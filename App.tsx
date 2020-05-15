import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'

import Home from 'app/screens/home/Home'

import SelectPlayers from 'app/screens/new-game/SelectPlayers'
import EnterInfo from 'app/screens/new-game/EnterInfo'
import SetupComplete from 'app/screens/new-game/SetupComplete'

import Register from 'app/screens/register/Register'
import Bonus from 'app/screens/register/Bonus'

import Statistics from 'app/screens/statistics/Statistics'
import { colors } from 'app/config/constants'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.BACKGROUND,
  },
}

function fetchFonts() {
  return Font.loadAsync({
    'Formula Condensed Bold': require('./assets/fonts/FormulaCondensed-Bold.otf'),
    'Formula Condensed Light': require('./assets/fonts/FormulaCondensed-Light.otf'),
  })
}

function NewGameStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SelectPlayers" component={SelectPlayers} />
      <Stack.Screen name="EnterInfo" component={EnterInfo} />
      <Stack.Screen name="SetupComplete" component={SetupComplete} />
    </Stack.Navigator>
  )
}

function RegisterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Bonus" component={Bonus} />
    </Stack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewGame" component={NewGameStack} />
        <Stack.Screen name="Register" component={RegisterStack} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

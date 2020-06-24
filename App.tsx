import React, { useState, useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { store, autoEffect, clearEffect } from '@risingstack/react-easy-state'
import { state } from 'app/config/data'

import Home from 'app/screens/home/Home'

import AddPlayer from 'app/screens/add-player/AddPlayer'

import Register from 'app/screens/new-game/Register'
import Players from 'app/screens/new-game/Players'
import Bonus from 'app/screens/new-game/Bonus'
import Scores from 'app/screens/new-game/Scores'

import Statistics from 'app/screens/statistics/Statistics'
import { colors } from 'app/config/constants'
import AsyncStorage from '@react-native-community/async-storage'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.BACKGROUND,
  },
}

function NewGameStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Players" component={Players} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Bonus" component={Bonus} />
      <Stack.Screen name="Scores" component={Scores} />
    </Stack.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    async function getDataFromStorage() {
      const games = (await AsyncStorage.getItem('games')) || '[]'
      const players = (await AsyncStorage.getItem('players')) || '[]'
      console.log('players from storage: ', players)

      state.games = JSON.parse(games)
      state.players = JSON.parse(players)
    }

    getDataFromStorage()
  }, [])

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddPlayer" component={AddPlayer} />
        <Stack.Screen name="NewGame" component={NewGameStack} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

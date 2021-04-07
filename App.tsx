import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { state } from 'app/config/data'
import Home from 'app/screens/home/Home'

import AddPlayer from 'app/screens/add-player/AddPlayer'

import Register from 'app/screens/new-game/Register'
import Bonus from 'app/screens/new-game/Bonus'
import Scores from 'app/screens/new-game/Scores'

import Statistics from 'app/screens/statistics/Statistics'
import { colors } from 'app/config/constants'
import Settings from 'app/screens/home/Settings'
import { useFonts } from 'expo-font'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.BACKGROUND,
  },
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Bonus" component={Bonus} />
      <Stack.Screen name="Scores" component={Scores} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    async function getDataFromStorage() {
      // await AsyncStorage.setItem('games', '[]')
      const games = (await AsyncStorage.getItem('games')) || '[]'
      const players = (await AsyncStorage.getItem('players')) || '[]'
      const matchups = (await AsyncStorage.getItem('matchups')) || '[]'
      const highestId = (await AsyncStorage.getItem('highestId')) || '0'
      const timesPlayed = (await AsyncStorage.getItem('timesPlayed')) || '0'
      const showConfetti =
        (await AsyncStorage.getItem('showConfetti')) || 'true'
      const hasPurchased =
        (await AsyncStorage.getItem('@hasPurchased')) || 'false'

      state.games = JSON.parse(games)
      state.players = JSON.parse(players)
      state.matchups = JSON.parse(matchups)
      state.highestId = JSON.parse(highestId)
      state.timesPlayed = JSON.parse(timesPlayed)
      state.hasPurchased = JSON.parse(hasPurchased)
      state.showConfetti = JSON.parse(showConfetti)
    }

    getDataFromStorage()
  }, [])

  const [loaded] = useFonts({
    'FormulaCondensed-Bold': require('./assets/fonts/FormulaCondensed-Bold.otf'),
    'FormulaCondensed-Light': require('./assets/fonts/FormulaCondensed-Light.otf'),
  })

  if (!loaded) return null

  return (
    <NavigationContainer theme={theme}>
      <StatusBar barStyle="dark-content" />

      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="AddPlayer" component={AddPlayer} />
        <Stack.Screen name="Statistics" component={Statistics} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

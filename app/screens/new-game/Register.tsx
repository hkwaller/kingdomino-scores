import React, { useState, useEffect, useRef } from 'react'
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Header, Input, Button } from 'app/components'
import {
  colorArray,
  colors,
  types,
  landscapeColors,
  screen,
} from 'app/config/constants'
import { state } from 'app/config/data'
import Type from './components/Type'
import Progress from './components/Progress'
import Intro from './components/Intro'

function Register() {
  const route = useRoute()

  const [game, setGame] = useState(
    state.selectedPlayers.map(_ => [0, 0, 0, 0, 0, 0])
  )
  const [typeIndex, setTypeIndex] = useState<number>(0)
  const [playerIndex, setPlayerIndex] = useState<number>(0)
  const [inputValue, setInputValue] = useState('')

  const typeRef = useRef(null)
  const playerRef = useRef(null)
  const scrollViewRef = useRef(null)

  const navigation = useNavigation()

  useEffect(() => {
    if (game[playerIndex][typeIndex] !== 0)
      setInputValue(`${game[playerIndex][typeIndex]}`)
  }, [typeIndex, playerIndex])

  function continueTapped() {
    const scores = [...game]
    scores[playerIndex][typeIndex] = Number(inputValue)
    setGame(scores)
    setInputValue('')

    if (playerIndex < state.selectedPlayers.length - 1) {
      setPlayerIndex(playerIndex + 1)
    } else if (playerIndex === state.selectedPlayers.length - 1) {
      setPlayerIndex(0)
      if (typeIndex < types.length - 1) setTypeIndex(typeIndex + 1)
      else if (typeIndex === types.length - 1)
        navigation.navigate('Bonus', {
          game: game,
          players: state.selectedPlayers,
        })
    }
  }

  function previousTapped() {
    if (playerIndex === 0 && typeIndex === 0) return
    else if (playerIndex === 0) {
      setTypeIndex(typeIndex - 1)
      setPlayerIndex(state.selectedPlayers.length - 1)
    } else setPlayerIndex(playerIndex - 1)
  }

  useEffect(() => {
    playerRef.current.scrollToIndex({ index: playerIndex })
  }, [playerIndex])

  useEffect(() => {
    typeRef.current.scrollToIndex({ index: typeIndex })
  }, [typeIndex])

  return (
    <>
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
      >
        <Header title="Score" />
        <Progress progress={typeIndex} />
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          data={types}
          ref={typeRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEnabled={false}
          contentContainerStyle={{
            maxHeight: 120,
          }}
          horizontal
          renderItem={({ item }) => {
            const color = landscapeColors[item.toUpperCase()]
            return (
              <View style={styles.itemContainer}>
                <Type title={item} landscape left backgroundColor={color} />
              </View>
            )
          }}
        />
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          data={state.selectedPlayers}
          ref={playerRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Type
                  backgroundColor={colorArray[item.color]}
                  title={item.name}
                />
              </View>
            )
          }}
        />
        <Input
          placeholder="0"
          type="numeric"
          value={`${inputValue}`}
          handleFocus={() => scrollViewRef.current.scrollTo({ y: 100 })}
          continueTapped={continueTapped}
          previousTapped={previousTapped}
          handleChange={value => setInputValue(value)}
          style={{ paddingHorizontal: 12, width: 100 }}
        />
        <Intro show={(typeIndex === 0) & (playerIndex === 0)} />
      </ScrollView>
      <Button
        backgroundColor={colors.YELLOW}
        title="Continue"
        onPress={() => continueTapped()}
      />
      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 500,
  },
  itemContainer: {
    width: screen.WIDTH,
    alignItems: 'center',
  },
})

export default Register

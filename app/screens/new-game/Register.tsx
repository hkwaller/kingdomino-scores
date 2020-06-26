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
import Type from './components/Type'

function Register() {
  const route = useRoute()
  const { players = [] } = route.params
  const [game, setGame] = useState(players.map(_ => [0, 0, 0, 0, 0, 0]))
  const [typeIndex, setTypeIndex] = useState(0)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const typeRef = useRef(null)
  const playerRef = useRef(null)
  const scrollViewRef = useRef(null)

  const navigation = useNavigation()

  function continueTapped() {
    const scores = [...game]
    scores[playerIndex][typeIndex] = Number(inputValue)
    setGame(scores)
    setInputValue('')

    if (playerIndex < players.length - 1) {
      setPlayerIndex(playerIndex + 1)
    } else if (playerIndex === players.length - 1) {
      setPlayerIndex(0)
      if (typeIndex < types.length - 1) setTypeIndex(typeIndex + 1)
      else if (typeIndex === types.length - 1)
        navigation.navigate('Bonus', { game: game, players: players })
    }
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
            return (
              <View style={styles.itemContainer}>
                <Type
                  title={item}
                  landscape
                  left
                  backgroundColor={landscapeColors[item.toUpperCase()]}
                />
              </View>
            )
          }}
        />
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          data={players}
          ref={playerRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Type
                  backgroundColor={colorArray[item.colour]}
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
          continueTapped={() => {
            continueTapped()
          }}
          handleChange={value => setInputValue(value)}
          style={{ paddingHorizontal: 12, width: 100 }}
        />
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
    width: screen.WIDTH - 100,
    marginHorizontal: 40,
    alignItems: 'center',
  },
})

export default Register

import React, { useState, useEffect, useRef } from 'react'
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
} from 'react-native'
import { Header, Input, Button, Type } from 'app/components'
import { colors, types, landscapeColors } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

const initialState = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]]
const initialState2 = [[20, 10, 0, 0, 0, 0], [50, 0, 0, 40, 0, 0]]
const players = [
  { name: 'Hannes', color: colors.BLUE },
  { name: 'Christine', color: colors.RED },
]

function Register() {
  const [game, setGame] = useState(initialState2)
  const [typeIndex, setTypeIndex] = useState(0)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [inputValue, setInputValue] = useState(0)
  const typeRef = useRef(null)
  const playerRef = useRef(null)
  const navigation = useNavigation()

  function continueTapped() {
    const scores = [...game]
    scores[playerIndex][typeIndex] = Number(inputValue)
    setGame(scores)

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
      <Header title="Score" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
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
              <View
                style={{
                  width: Dimensions.get('screen').width - 100,
                  marginHorizontal: 40,
                  alignItems: 'center',
                }}>
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
              <View
                style={{
                  width: Dimensions.get('screen').width - 100,
                  marginHorizontal: 40,
                  alignItems: 'center',
                }}>
                <Type backgroundColor={item.color} title={item.name} />
              </View>
            )
          }}
        />
        <Input
          placeholder="0"
          type="numeric"
          continueTapped={() => {
            continueTapped()
          }}
          handleChange={value => setInputValue(value)}
          style={{ paddingHorizontal: 12, width: 100 }}
        />
      </ScrollView>
      <Button
        backgroundColor={colors.YELLOW}
        title="Nav"
        onPress={() =>
          navigation.navigate('Bonus', { game: game, players: players })
        }
        style={{ alignSelf: 'center' }}
      />
      <Button
        backgroundColor={colors.YELLOW}
        title="Continue"
        onPress={() => continueTapped()}
        style={{ alignSelf: 'center' }}
      />
      <SafeAreaView />
    </>
  )
}

export default Register

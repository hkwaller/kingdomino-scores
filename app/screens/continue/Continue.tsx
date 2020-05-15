import React, { useState, useEffect, useRef } from 'react'
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'
import { Header } from 'app/components'
import Type from 'app/components/Type'
import { colors, types, landscapeColors } from 'app/config/constants'
import Input from 'app/components/Input'
import { FlatList } from 'react-native-gesture-handler'
import Button from 'app/components/Button'

type Props = {}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

const initialState = [[1, 10, 50, 8, 7], [6, 12, 40, 2, 4]]
const players = [
  { name: 'Hannes', color: colors.BLUE },
  { name: 'Christine', color: colors.RED },
]

function Continue(props: Props) {
  const [game, setGame] = useState(initialState)
  const [typeIndex, setTypeIndex] = useState(0)
  const [playerIndex, setPlayerIndex] = useState(0)
  const [inputValue, setInputValue] = useState(0)
  const [roundCompleted, setRoundCompleted] = useState(false)
  const typeRef = useRef(null)
  const playerRef = useRef(null)

  function continueTapped() {
    console.log('going')
    const scores = [...game]
    scores[playerIndex][typeIndex] = 100000
    setGame(scores)

    if (playerIndex < players.length - 1) {
      setPlayerIndex(playerIndex + 1)
    } else if (playerIndex === players.length - 1) {
      setPlayerIndex(0)
      setRoundCompleted(true)
    }

    if (roundCompleted) {
      setRoundCompleted(false)
      return
    }

    if (typeIndex < types.length - 1) setTypeIndex(typeIndex + 1)
    else if (typeIndex === types.length - 1) setTypeIndex(0)
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
                  big
                  left
                  uppercased
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
        title="Continue"
        onPress={() => continueTapped()}
        style={{ alignSelf: 'center' }}
      />
      <SafeAreaView />
    </>
  )
}
export default Continue

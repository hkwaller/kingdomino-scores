import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { Header, SmallHeader, Type } from 'app/components'

type Props = {}

function Scores() {
  const route = useRoute()
  const [players, setPlayers] = useState([])
  const [game, setGame] = useState([])

  useEffect(() => {
    setPlayers(route.params.players)
    setGame(route.params.game)
  }, [])

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header title="Header" />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {players.map((p, index) => {
          let playerScore = game[index].reduce(
            (cur, acc) => Number(cur) + acc,
            0,
          )

          if (p.symmetric) playerScore = playerScore + 5
          if (p.king) playerScore = playerScore + 10

          return (
            <View style={{ width: '50%', padding: 40 }}>
              <Text>{p.name}</Text>
              <Text>{playerScore}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
})
export default Scores

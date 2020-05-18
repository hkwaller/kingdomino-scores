import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/core'
import { Header } from 'app/components'
import { fonts } from 'app/config/constants'
import { saveGame } from 'app/config/data'

type Props = {}

function Scores() {
  const route = useRoute()
  const [players, setPlayers] = useState([])
  const [game, setGame] = useState([])

  useEffect(() => {
    setPlayers(route.params.players)
    setGame(route.params.game)
    saveGame({ game: route.params.game, players: route.params.players })
  }, [])

  return (
    <>
      <SafeAreaView />
      <Header title="Scores" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {players.map((p, index) => {
            const playerScore =
              game[index].reduce((cur, acc) => Number(cur) + acc, 0) +
              (p.symmetric && 5) +
              (p.king && 10)

            return (
              <View key={index} style={styles.scoreContainer}>
                <View>
                  <View
                    style={[
                      styles.nameBackground,
                      { backgroundColor: p.color },
                    ]}
                  />
                  <Text style={styles.name}>{p.name}</Text>
                </View>
                <Text style={styles.score}>{playerScore}</Text>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  scoreContainer: {
    width: '50%',
    padding: 40,
    alignItems: 'center',
  },
  name: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
  },
  nameBackground: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ rotate: '2deg' }],
  },
  score: {
    fontFamily: fonts.BOLD,
    fontSize: 100,
    marginTop: 10,
  },
})

export default Scores

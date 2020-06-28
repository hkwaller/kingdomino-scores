import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import ConfettiCannon from 'react-native-confetti-cannon'

import { Header, Button } from 'app/components'
import { fonts, colors, screen } from 'app/config/constants'
import { saveGame } from 'app/config/data'
import CountUp from 'app/screens/new-game/components/CountUp'
import Details from 'app/screens/new-game/components/Details'

type Player = {
  name: string
  color: string
  king: boolean
  alldominos: boolean
  finished: boolean
}

function Scores() {
  const route = useRoute()
  const navigation = useNavigation()
  const [players, setPlayers] = useState<Player[]>([])
  const [game, setGame] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [indexOfHighestScorer, setIndexOfHighestScorer] = useState(0)

  useEffect(() => {
    setPlayers(
      route.params.players.map(p => Object.assign(p, { finished: false }))
    )
    setGame(route.params.game)
    saveGame({ game: route.params.game, players: route.params.players })
  }, [])

  function finish(index: number) {
    const p = [...players]
    p[index].finished = true
    setPlayers(p)
  }

  useEffect(() => {
    if (
      players.length > 0 &&
      players.filter(p => p.finished).length === players.length
    )
      setShowConfetti(true)
  }, [players])

  return (
    <>
      <SafeAreaView />
      <Header title="Scores" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {players.map((p: Player, index: number) => {
            const playerScore =
              game[index].reduce((cur, acc) => Number(cur) + acc, 0) +
              (p.alldominos && 5) +
              (p.king && 10)

            if (playerScore > players[indexOfHighestScorer]) {
              setIndexOfHighestScorer(index)
            }

            return (
              <View key={index} style={styles.scoreContainer}>
                <View
                  style={[styles.nameBackground, { backgroundColor: p.color }]}
                >
                  <Text style={styles.name}>{p.name}</Text>
                </View>
                <CountUp to={playerScore} onFinish={() => finish(index)} />
                <Details
                  score={game[index]}
                  alldominos={p.alldominos}
                  king={p.king}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
      <Button
        title="Start over"
        backgroundColor={colors.GREEN}
        onPress={() => navigation.navigate('Home')}
      />
      <SafeAreaView />
      {showConfetti && (
        <ConfettiCannon count={200} origin={{ x: screen.WIDTH / 2, y: -10 }} />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingBottom: 200,
  },
  scoreContainer: {
    width: '50%',
    alignItems: 'center',
    paddingTop: 40,
  },
  name: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
    lineHeight: 40,
  },
  nameBackground: {
    paddingHorizontal: 20,
    paddingTop: 5,
  },
})

export default Scores

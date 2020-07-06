import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import ConfettiCannon from 'react-native-confetti-cannon'

import { Header, Button } from 'app/components'
import { fonts, colors, screen } from 'app/config/constants'
import { saveGame, state } from 'app/config/data'
import CountUp from 'app/screens/new-game/components/CountUp'
import Details from 'app/screens/new-game/components/Details'
import { Player as PlayerType, Game } from 'app/config/data'

type ScoreRouteProp = {
  key: string
  name: string
  params: ScoresRouteParams
}

type ScoresRouteParams = {
  players: PlayerType[]
  game: Game
}

type Player = {
  id: number
  name: string
  score: number
  finished: boolean
  king: boolean | undefined
  alldominos: boolean | undefined
  color: string
}

function Scores() {
  const route = useRoute<ScoreRouteProp>()
  const navigation = useNavigation()
  const [players, setPlayers] = useState<Player[]>([])
  const [game, setGame] = useState([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [indexOfHighestScorer, setIndexOfHighestScorer] = useState(0)

  useEffect(() => {
    setPlayers(
      route.params.players.map((p, index) =>
        Object.assign(p, {
          finished: false,
          alldominos: p.alldominos,
          king: p.king,
          score:
            route.params.game[index].reduce(
              (cur: number, acc: number) => Number(cur) + acc,
              0
            ) +
            (p.alldominos && 5) +
            (p.king && 10),
        })
      )
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
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
      >
        <Header title="Scores" />
        <View style={styles.wrapper}>
          {players.map((p: Player, index: number) => {
            if (p.score > players[indexOfHighestScorer].score) {
              setIndexOfHighestScorer(index)
            }

            return (
              <View key={index} style={styles.scoreContainer}>
                <View
                  style={[styles.nameBackground, { backgroundColor: p.color }]}
                >
                  <Text style={styles.name}>{p.name}</Text>
                </View>
                <CountUp to={p.score} onFinish={() => finish(index)} />
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
        onPress={() => {
          ++state.timesPlayed
          navigation.navigate('Home', { checkForReview: true })
        }}
      />
      <SafeAreaView />
      {showConfetti && (
        <ConfettiCannon
          count={200}
          fallSpeed={1000}
          origin={{ x: screen.WIDTH / 2, y: -10 }}
        />
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
    paddingTop: 20,
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
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export default Scores

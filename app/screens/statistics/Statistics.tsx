import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { view } from '@risingstack/react-easy-state'

import { state } from 'app/config/data'
import { Header, SmallHeader } from 'app/components'
import Stats from './components/Stats'

import { colors, screen, fonts } from 'app/config/constants'
import { getStatsForPlayer } from './helpers'

type Stat = {
  wins: number
  draws: number
  losses: number
  playedGames: number
  id?: number
}

function Statistics() {
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    const stats = state.players
      .map(p => Object.assign(getStatsForPlayer(p.id), { id: p.id }))
      .sort((a, b) => a.playedGames > b.playedGames)
      .sort((a, b) => a.wins < b.wins)
    setStats(stats)
  }, [])

  return (
    <>
      <SafeAreaView />
      <Header
        title="Statistics"
        style={{ alignSelf: 'center', marginVertical: 20 }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {stats.map(stat => {
          const [player] = state.players.filter(p => p.id === stat.id)

          return (
            <View key={stat.id} style={styles.playerContainer}>
              <Stats stat={stat} />
              <View style={styles.row}>
                <Text style={styles.playerName}>{player.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.bigText, styles.greyText]}>Played</Text>
                  <Text
                    style={[styles.bigText, styles.blackText, { fontSize: 20 }]}
                  >
                    {stat.playedGames}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: screen.WIDTH - 80,
                  backgroundColor: player.color,
                  height: 2,
                  marginTop: 10,
                  marginBottom: 20,
                }}
              />
              <View style={styles.row}>
                <Stat title="wins" score={stat.wins} />
                <Stat title="draws" score={stat.draws} />
                <Stat title="losses" score={stat.losses} />
              </View>
            </View>
          )
        })}
        <SmallHeader title="Matchups" style={{ marginTop: 20 }} />
        {state.matchups.map((m, index) => {
          const currentMatchupGames = state.games.filter(g => {
            if (
              JSON.stringify(g.players.map(p => p.id).sort()) ===
              JSON.stringify(m)
            ) {
              return g
            }
          })

          return (
            <View key={index} style={{ alignItems: 'center', padding: 20 }}>
              {currentMatchupGames.reverse().map((game, index) => {
                const lineUp = game.players.map((p, playerIndex) => {
                  const playerScore =
                    game.game[playerIndex].reduce((cur, acc) => {
                      return cur + acc
                    }, 0) +
                    (game.players[playerIndex].alldominos && 10) +
                    (game.players[playerIndex].king && 5)

                  return {
                    name: p.name,
                    score: playerScore,
                  }
                })

                return (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', marginBottom: 10 }}
                  >
                    {lineUp.map((player, index) => {
                      if (index % 2 === 0)
                        return (
                          <>
                            <LeftPlayer
                              key={index}
                              name={player.name}
                              score={player.score}
                              isHighest={
                                player.score >= lineUp[index + 1].score
                              }
                            />
                            <View
                              style={{
                                backgroundColor: colors.BLACK,
                                width: 10,
                                height: 3,
                                marginHorizontal: 10,
                                alignSelf: 'center',
                              }}
                            />
                          </>
                        )
                      else
                        return (
                          <RightPlayer
                            key={index}
                            name={player.name}
                            score={player.score}
                            isHighest={player.score >= lineUp[index - 1].score}
                          />
                        )
                    })}
                  </View>
                )
              })}
            </View>
          )
        })}
      </ScrollView>
    </>
  )
}

type PlayerProps = {
  name: string
  score: number
  isHighest?: boolean
}

function LeftPlayer({ name, score, isHighest }: PlayerProps) {
  return (
    <View style={styles.rowContainer}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.LIGHT,
        }}
      >
        {name}
      </Text>
      <View
        style={[
          styles.scoreContainer,
          { right: 0, backgroundColor: isHighest ? colors.GREEN : colors.RED },
        ]}
      >
        <Text style={{ fontSize: 20 }}>{score}</Text>
      </View>
    </View>
  )
}

function RightPlayer({ name, score, isHighest }: PlayerProps) {
  return (
    <View style={styles.rowContainer}>
      <View
        style={[
          styles.scoreContainer,
          { left: 0, backgroundColor: isHighest ? colors.GREEN : colors.RED },
        ]}
      >
        <Text style={{ fontSize: 20 }}>{score}</Text>
      </View>
      <Text
        style={{
          fontSize: 20,
          textAlign: 'right',
          flex: 1,
          fontFamily: fonts.LIGHT,
        }}
      >
        {name}
      </Text>
    </View>
  )
}

type StatProps = {
  title: string
  score: number
}

function Stat({ title, score }: StatProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      <Text style={[styles.smallText, styles.greyText]}>{title}</Text>
      <Text style={[styles.bigText, styles.blackText]}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingBottom: 300,
  },
  playerContainer: {
    padding: 20,
    margin: 10,
    width: screen.WIDTH - 40,
    backgroundColor: colors.WHITE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerName: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
  },
  greyText: {
    fontFamily: fonts.BOLD,
    color: colors.GREY,
    marginRight: 2,
  },
  blackText: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
  bigText: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 15,
    marginBottom: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.WHITE,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scoreContainer: {
    backgroundColor: colors.GREEN,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default view(Statistics)

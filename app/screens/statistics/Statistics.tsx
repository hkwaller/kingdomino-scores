import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { view } from '@risingstack/react-easy-state'

import { state } from 'app/config/data'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from 'app/components'
import { colors, screen, fonts } from 'app/config/constants'

function Statistics() {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const stats = state.players
      .map(p => {
        return Object.assign(getStatsForPlayer(p.id), { id: p.id })
      })
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
              <View style={styles.row}>
                <Text style={styles.playerName}>{player.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[styles.bigText, styles.greyText]}>Played</Text>
                  <Text
                    style={[
                      styles.bigText,
                      styles.blackText,
                      { fontSize: 40, marginTop: -6 },
                    ]}
                  >
                    {stat.playedGames}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: screen.WIDTH - 100,
                  backgroundColor: player.color,
                  height: 4,
                  alignSelf: 'center',
                  marginVertical: 20,
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
      </ScrollView>
    </>
  )
}

type StatProps = {
  title: string
  score: string
}

function Stat({ title, score }: StatProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      <Text style={[styles.smallText, styles.greyText, { marginBottom: 3 }]}>
        {title}
      </Text>
      <Text style={[styles.bigText, styles.blackText]}>{score}</Text>
    </View>
  )
}

function getStatsForPlayer(id: number) {
  const games = state.games.filter(game => {
    if (game.ids.indexOf(id) > -1) return game
  })

  return games.reduce(
    (cur, acc) => {
      ++cur.playedGames
      const [player] = acc.players.filter(p => p.id === id)
      acc.players.map(p => {
        if (p.id !== id) {
          if (p.score > player.score) ++cur.losses
          else if (p.score === player.score) ++cur.draws
          else ++cur.wins
        }
      })

      return cur
    },
    { wins: 0, draws: 0, losses: 0, playedGames: 0 }
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
  playerContainer: {
    padding: 40,
    margin: 20,
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
    fontSize: 40,
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
    fontSize: 30,
  },
  smallText: {
    fontSize: 20,
  },
})
export default view(Statistics)

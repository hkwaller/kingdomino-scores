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
        <SmallHeader title="Matchups" style={{ marginTop: 20 }} />
        {state.matchups.map(m => {
          const currentMatchupGames = state.games.filter(g => {
            if (
              JSON.stringify(g.players.map(p => p.id).sort()) ===
              JSON.stringify(m)
            ) {
              return g
            }
          })
          return (
            <View style={{ alignItems: 'center', padding: 20 }}>
              {currentMatchupGames.reverse().map(game => {
                const lineUp = game.players.map(p => {
                  return { name: p.name, score: p.score }
                })

                return (
                  <View style={{ flexDirection: 'row' }}>
                    {lineUp.map((player, index) => {
                      if (index % 2 === 0)
                        return (
                          <LeftPlayer name={player.name} score={player.score} />
                        )
                      else
                        return (
                          <RightPlayer
                            name={player.name}
                            score={player.score}
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
}

function LeftPlayer({ name, score }: PlayerProps) {
  return (
    <View style={styles.rowContainer}>
      <Text style={{ fontSize: 20 }}>{name}</Text>
      <Text style={{ fontSize: 30 }}>{score} -</Text>
    </View>
  )
}

function RightPlayer({ name, score }: PlayerProps) {
  return (
    <View style={styles.rowContainer}>
      <Text style={{ fontSize: 30 }}> {score}</Text>
      <Text style={{ fontSize: 20 }}>{name}</Text>
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
      <Text style={[styles.smallText, styles.greyText, { marginBottom: 3 }]}>
        {title}
      </Text>
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
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
export default view(Statistics)

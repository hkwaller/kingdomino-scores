import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Header, Button } from 'app/components'
import { fonts, colors } from 'app/config/constants'
import { saveGame } from 'app/config/data'
import CountUp from 'app/screens/new-game/components/CountUp'
import Details from 'app/screens/new-game/components/Details'

function Scores() {
  const route = useRoute()
  const navigation = useNavigation()

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
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          {players.map((p, index) => {
            const playerScore =
              game[index].reduce((cur, acc) => Number(cur) + acc, 0) +
              (p.symmetric && 5) +
              (p.king && 10)
            console.log('p: ', p)

            return (
              <View key={index} style={styles.scoreContainer}>
                <View>
                  <View
                    style={[
                      styles.nameBackground,
                      { backgroundColor: p.colour },
                    ]}
                  />
                  <Text style={styles.name}>{p.name}</Text>
                </View>
                <CountUp to={playerScore} />
                <Details score={game[index]} />
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
    alignItems: 'center',
    paddingTop: 40,
  },
  name: {
    fontFamily: fonts.BOLD,
    fontSize: 30,
  },
  nameBackground: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ rotate: '2deg' }],
  },
})

export default Scores

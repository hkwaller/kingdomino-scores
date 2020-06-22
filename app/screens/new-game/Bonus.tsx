import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { State } from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  delay,
} from 'react-native-reanimated'

import { Header, NormalButton } from 'app/components'
import { fonts, colors } from 'app/config/constants'
import Check from 'app/screens/new-game/components/Check'
import Type from './components/Type'

const WIDTH = Dimensions.get('screen').width

function Bonus() {
  const [players, setPlayers] = useState([])
  const [activePlayer, setActivePlayer] = useState(0)
  const x = useSharedValue(500)
  const symmetric = useSharedValue(200)
  const king = useSharedValue(200)

  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    const players = route.params.players.map(p => {
      return Object.assign(p, { symmetric: true, king: true })
    })

    x.value = 0
    symmetric.value = 0
    king.style = 0

    setPlayers(players)
  }, [])

  function check(event, index, type) {
    if (event.nativeEvent.state === State.END) {
      const playersToUpdate = [...players]
      playersToUpdate[index][type] = !playersToUpdate[index][type]
      setPlayers(playersToUpdate)
    }
  }

  function continueTapped() {
    if (activePlayer < players.length - 1) {
      setActivePlayer(activePlayer + 1)
      x.value = WIDTH * players.indexOf(activePlayer)
    } else {
      navigation.navigate('Scores', {
        game: route.params.game,
        players: players,
      })
    }
  }

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(x.value) }],
    }
  })

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <Header title="Bonus" />
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: WIDTH * players.length,
            },
            style,
          ]}
        >
          {players.map((p, index) => {
            return (
              <View key={index} style={styles.item}>
                <Type
                  backgroundColor={p.color}
                  title={p.name}
                  style={{ marginBottom: 20 }}
                />
                <Check
                  item={p}
                  type="symmetric"
                  handleCheck={event => check(event, index, 'symmetric')}
                />
                <Check
                  item={p}
                  type="king"
                  handleCheck={event => check(event, index, 'king')}
                />
              </View>
            )
          })}
        </Animated.View>
      </View>

      <NormalButton
        title="Continue"
        backgroundColor={colors.YELLOW}
        onPress={() => continueTapped()}
      />

      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkmarkText: {
    fontFamily: fonts.LIGHT,
    fontSize: 20,
    marginLeft: 25,
    width: 150,
  },
})

export default Bonus

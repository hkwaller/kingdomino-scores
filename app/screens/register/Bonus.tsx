import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/core'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { Header, Type, Checkmark, Button } from 'app/components'
import { fonts, colors } from 'app/config/constants'
import Check from 'app/components/Check'

function Bonus() {
  const ref = useRef(null)
  const route = useRoute()
  const [players, setPlayers] = useState()
  const [activePlayer, setActivePlayer] = useState(0)
  const navigation = useNavigation()

  useEffect(() => {
    const players = route.params.players.map(p => {
      return Object.assign(p, { symmetric: true, king: true })
    })

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
      ref.current.scrollToIndex({ index: activePlayer + 1 })
    } else {
      navigation.navigate('Scores', {
        game: route.params.game,
        players: players,
      })
    }
  }

  return (
    <>
      <SafeAreaView />
      <View style={styles.container}>
        <Header title="Bonus" />
        <FlatList
          keyExtractor={(_, index) => `${index}`}
          data={players}
          ref={ref}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            if (!item) return <View />
            return (
              <View style={styles.item}>
                <Type
                  backgroundColor={item.color}
                  title={item.name}
                  style={{ marginBottom: 20 }}
                />
                <Check
                  item={item}
                  type="symmetric"
                  handleCheck={event => check(event, index, 'symmetric')}
                />
                <Check
                  item={item}
                  type="king"
                  handleCheck={event => check(event, index, 'king')}
                />
              </View>
            )
          }}
        />
        <Button
          title="Continue"
          backgroundColor={colors.YELLOW}
          onPress={() => continueTapped()}
        />
        <SafeAreaView />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    width: Dimensions.get('screen').width - 100,
    marginHorizontal: 40,
    alignItems: 'center',
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

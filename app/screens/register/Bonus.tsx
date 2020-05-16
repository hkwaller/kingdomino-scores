import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
} from 'react-native'
import { useRoute } from '@react-navigation/core'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { Header, Type, Checkmark } from 'app/components'
import { fonts } from 'app/config/constants'

function Bonus() {
  const ref = useRef(null)
  const route = useRoute()
  const [players, setPlayers] = useState()

  useEffect(() => {
    const players = route.params.players.map(p => {
      return Object.assign(p, { symmetric: true, king: true })
    })

    setPlayers(players)
  }, [])

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
                <Type backgroundColor={item.color} title={item.name} />
                <TapGestureHandler
                  onHandlerStateChange={event => {
                    if (event.nativeEvent.state === State.END) {
                      const playersToUpdate = [...players]
                      playersToUpdate[index].symmetric = !playersToUpdate[index]
                        .symmetric
                      setPlayers(playersToUpdate)
                    }
                  }}>
                  <View
                    style={[
                      styles.checkmark,
                      { marginBottom: 20, marginTop: 40 },
                    ]}>
                    <Checkmark checked={item.symmetric} />
                    <Text style={styles.checkmarkText}>Symmetric</Text>
                  </View>
                </TapGestureHandler>
                <TapGestureHandler
                  onHandlerStateChange={event => {
                    if (event.nativeEvent.state === State.END) {
                      const playersToUpdate = [...players]
                      playersToUpdate[index].king = !playersToUpdate[index].king
                      setPlayers(playersToUpdate)
                    }
                  }}>
                  <View style={styles.checkmark}>
                    <Checkmark checked={item.king} />
                    <Text style={styles.checkmarkText}>King in the middle</Text>
                  </View>
                </TapGestureHandler>
              </View>
            )
          }}
        />
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

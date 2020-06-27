import React, { useState, useCallback } from 'react'
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import { deletePlayer, state } from 'app/config/data'
import { Header, Button } from 'app/components'
import { fonts, colors } from 'app/config/constants'
import SelectPlayer from 'app/screens/new-game/components/SelectPlayer'

function Players() {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      setSelectedPlayers([])
    }, [])
  )

  function handlePress() {
    if (selectedPlayers.length === 0 && state.players.length !== 0) return
    const destination = state.players.length === 0 ? 'AddPlayer' : 'Register'
    navigation.navigate(destination, { players: selectedPlayers })
  }

  return (
    <>
      <SafeAreaView />
      <Header title="Who's playing?" />
      <ScrollView contentContainerStyle={{ margin: 20 }}>
        {state.players.length === 0 && (
          <Text
            style={[styles.playerText, { textAlign: 'center', marginTop: 40 }]}
          >
            You haven't created any players yet. Tap below bitte.
          </Text>
        )}
        {state.players.map((p, i) => {
          const isSelected = selectedPlayers.indexOf(p) > -1

          return (
            <SelectPlayer
              key={p.name}
              player={p}
              isSelected={isSelected}
              deletePlayer={() => {
                LayoutAnimation.configureNext({
                  duration: 600,
                  delete: {
                    type: LayoutAnimation.Types.spring,
                    property: LayoutAnimation.Properties.scaleXY,
                    springDamping: 0.6,
                  },
                })
                deletePlayer(p)
              }}
              selectPlayer={() => {
                const updatedSelectedPlayers = isSelected
                  ? selectedPlayers.filter(f => f.name !== p.name)
                  : selectedPlayers.concat(p)

                setSelectedPlayers(updatedSelectedPlayers)
              }}
            />
          )
        })}
      </ScrollView>
      <Button
        title={state.players.length === 0 ? 'Add players' : 'Continue'}
        backgroundColor={colors.YELLOW}
        onPress={() => handlePress()}
      />
      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  playerText: {
    fontFamily: fonts.LIGHT,
    fontSize: 24,
  },
})

export default view(Players)

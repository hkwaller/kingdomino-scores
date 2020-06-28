import React, { useState, useCallback } from 'react'
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  View,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import { deletePlayer, state } from 'app/config/data'
import { Header, Button, SmallHeader } from 'app/components'
import { fonts, colors } from 'app/config/constants'
import Matchup from './components/Matchup'
import Player from './components/Player'

function Players() {
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [hasSelectedMatchup, setHasSelectedMatchup] = useState(false)
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
        <SmallHeader title="Latest match-ups" style={{ alignSelf: 'center' }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {state.matchups.map((matchup, index) => {
            const matchupSelected = selectedPlayers.some(
              v => matchup.indexOf(v.id) !== -1
            )

            return (
              <Matchup
                key={index}
                players={matchup}
                isSelected={matchupSelected}
                onPress={() => {
                  if (hasSelectedMatchup) {
                    setHasSelectedMatchup(false)
                    setSelectedPlayers([])
                  } else {
                    setHasSelectedMatchup(true)
                    setSelectedPlayers([...matchup.map(p => state.players[p])])
                  }
                }}
              />
            )
          })}
        </ScrollView>
        <SmallHeader
          title="New setup"
          style={{ alignSelf: 'center', marginTop: 40, marginBottom: 10 }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {state.players.map((p, index) => {
            const isSelected = selectedPlayers.indexOf(p) > -1

            return (
              <Player
                key={index}
                name={p.name}
                color={p.color}
                isSelected={isSelected}
                onPress={() => {
                  const updatedSelectedPlayers = isSelected
                    ? selectedPlayers.filter(f => f.name !== p.name)
                    : selectedPlayers.concat(p)

                  setSelectedPlayers(updatedSelectedPlayers)
                }}
              />
            )
          })}
        </View>
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

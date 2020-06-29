import React, { useState, useCallback } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  View,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'

import { deletePlayer, state } from 'app/config/data'
import { SmallHeader } from 'app/components'
import { fonts } from 'app/config/constants'
import Matchup from './components/Matchup'
import Player from './components/Player'
import NoPlayers from './components/NoPlayers'
import ContinueButton from './components/ContinueButton'

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
    navigation.navigate('Register', { players: selectedPlayers })
  }

  return (
    <>
      <SafeAreaView />
      {state.players.length === 0 && <NoPlayers />}
      {state.players.length > 0 && (
        <>
          <SmallHeader title="Players" style={styles.playerHeader} />
          <View style={styles.players}>
            {state.players.map((p, index) => {
              const isSelected = selectedPlayers.indexOf(p) > -1

              return (
                <Player
                  key={index}
                  name={p.name}
                  color={p.color}
                  isSelected={isSelected}
                  deletePlayer={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.spring
                    )
                    deletePlayer(p)
                  }}
                  onPress={() => {
                    const updatedSelectedPlayers = isSelected
                      ? selectedPlayers.filter(f => f.name !== p.name)
                      : selectedPlayers.concat(p)

                    setSelectedPlayers(updatedSelectedPlayers)
                  }}
                />
              )
            })}
            <Player
              name="Add +"
              color="#FFB3BA"
              isSelected={true}
              onPress={() => navigation.navigate('AddPlayer')}
            />
          </View>
        </>
      )}
      {state.matchups.length > 0 && (
        <>
          <SmallHeader
            title="Latest match-ups"
            style={{ alignSelf: 'center' }}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ marginHorizontal: 10 }} />
            {state.matchups.reverse().map((matchup, index) => {
              return (
                <Matchup
                  key={index}
                  players={matchup}
                  onPress={() => {
                    navigation.navigate('Register', {
                      players: matchup.map(id => state.players[id]),
                    })
                  }}
                />
              )
            })}
          </ScrollView>
        </>
      )}
      <ContinueButton
        selectedPlayersIsOver={selectedPlayers.length > 1}
        onPress={() =>
          navigation.navigate('Register', { players: selectedPlayers })
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  playerText: {
    fontFamily: fonts.LIGHT,
    fontSize: 24,
  },
  players: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20,
    justifyContent: 'center',
  },
  playerHeader: { alignSelf: 'center', marginTop: 10 },
})

export default view(Players)

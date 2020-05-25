import React, { useState, useCallback } from 'react'
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import { getPlayers } from 'app/config/data'
import { Header } from 'app/components'
import { fonts, colors, colorArray } from 'app/config/constants'
import NormalButton from 'app/components/NormalButton'

function Players() {
  const [players, setPlayers] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      getPlayersFromStorage()
    }, []),
  )

  async function getPlayersFromStorage() {
    const p = await getPlayers()
    setPlayers(p || [])
  }

  function handlePress() {
    if (selectedPlayers.length === 0) return
    const destination = players.length === 0 ? 'AddPlayer' : 'Register'
    navigation.navigate(destination, { players: selectedPlayers })
  }

  return (
    <>
      <SafeAreaView />
      <Header title="Who's playing?" />
      <ScrollView contentContainerStyle={{ flex: 0, margin: 20 }}>
        {players.length === 0 && (
          <Text
            style={[styles.playerText, { textAlign: 'center', marginTop: 40 }]}>
            You haven't created any players yet. Tap below bitte.
          </Text>
        )}
        {players.map((p, i) => {
          const bgColour =
            selectedPlayers.indexOf(p) > -1
              ? colorArray[p.colour]
              : 'transparent'

          return (
            <TouchableOpacity
              key={p.name}
              onPress={() => {
                const indexOfPlayer = selectedPlayers.indexOf(p)

                const updatedSelectedPlayers =
                  indexOfPlayer > -1
                    ? selectedPlayers.filter(f => f.name !== p.name)
                    : selectedPlayers.concat(p)

                setSelectedPlayers(updatedSelectedPlayers)
              }}
              style={[
                styles.playerContainer,
                {
                  backgroundColor: bgColour,
                },
              ]}>
              <Text style={styles.playerText}>{p.name}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <NormalButton
        title={players.length === 0 ? 'Add players' : 'Continue'}
        backgroundColor={colors.YELLOW}
        onPress={() => handlePress()}
      />
      <SafeAreaView />
    </>
  )
}

const styles = StyleSheet.create({
  playerContainer: {
    padding: 20,
  },
  playerText: {
    fontFamily: fonts.LIGHT,
    fontSize: 24,
  },
})

export default Players

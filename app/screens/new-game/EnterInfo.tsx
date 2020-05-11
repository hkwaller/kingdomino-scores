import React, { useState } from 'react'
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native'
import { Header } from 'app/components'
import SmallHeader from 'app/components/SmallHeader'
import Input from 'app/components/Input'
import Button from 'app/components/Button'
import { colors } from 'app/config/constants'
import ColorPicker from 'app/components/ColorPicker'
import PageControl from 'app/components/PageControl'
import { useRoute } from '@react-navigation/core'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginHorizontal: 20,
    width: '80%',
  },
  views: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
})

function EnterInfo() {
  const route = useRoute()
  const [selected, setSelected] = useState(0)
  const [players, setPlayers] = useState(
    Array.from({ length: route.params.players || 2 }, (_, i) => {
      return {
        name: '',
        color: colors.RED,
      }
    }),
  )

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView />
        <Header title="New Game" />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          horizontal
          data={players}
          renderItem={({ item }) => {
            return (
              <View style={styles.views}>
                <SmallHeader title="Name" style={{ marginBottom: -20 }} />
                <Input placeholder="Christine" style={{ minWidth: '80%' }} />
                <SmallHeader title="Colour" style={{ marginTop: 30 }} />
                <ColorPicker />
              </View>
            )
          }}
        />
      </ScrollView>
      <PageControl selected={selected} players={route.params.players} />
      <Button
        title="Continue"
        backgroundColor={colors.YELLOW}
        style={{ alignSelf: 'center' }}
      />
      <SafeAreaView />
    </>
  )
}

export default EnterInfo

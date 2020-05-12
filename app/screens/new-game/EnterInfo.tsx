import React, { useState, useRef } from 'react'
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
import { useRoute, useNavigation } from '@react-navigation/core'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const [players, setPlayers] = useState(
    Array.from({ length: route.params.players || 2 }, (_, i) => {
      return {
        name: '',
        color: colors.RED,
      }
    }),
  )

  const navigation = useNavigation()

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView />
        <Header title="New Game" />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          horizontal
          ref={ref}
          scrollEnabled={false}
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
      <PageControl currentIndex={currentIndex} players={route.params.players} />
      <Button
        title="Continue"
        backgroundColor={colors.YELLOW}
        style={{ alignSelf: 'center' }}
        onPress={() => {
          if (currentIndex < players.length - 1) {
            const arr = [...players]
            ref.current.scrollToIndex({ index: currentIndex + 1 })
            setCurrentIndex(prev => prev + 1)
          } else {
            navigation.navigate('SetupComplete')
          }
        }}
      />
      <SafeAreaView />
    </>
  )
}

export default EnterInfo

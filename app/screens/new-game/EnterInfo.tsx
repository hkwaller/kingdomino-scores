import React, { useState, useRef } from 'react'
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/core'
import {
  Header,
  SmallHeader,
  Input,
  Button,
  ColorPicker,
  PageControl,
} from 'app/components'
import { colors } from 'app/config/constants'

function EnterInfo() {
  const route = useRoute()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentName, setCurrentName] = useState('')
  const [currentColor, setCurrentColor] = useState('')
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

  function continueTapped() {
    if (currentIndex < players.length - 1) {
      const arr = [...players, { name: currentName, color: currentColor }]
      ref.current.scrollToIndex({ index: currentIndex + 1 })
      setCurrentIndex(prev => prev + 1)
    } else {
      navigation.navigate('SetupComplete')
    }
  }

  return (
    <>
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always">
        <Header title="New Game" />
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          horizontal
          keyboardShouldPersistTaps="always"
          ref={ref}
          scrollEnabled={false}
          data={players}
          renderItem={({ item }) => {
            return (
              <View style={styles.views}>
                <SmallHeader title="Name" style={{ marginBottom: -20 }} />
                <Input
                  handleChange={t => setCurrentName(t)}
                  continueTapped={() => continueTapped()}
                  placeholder="Christine"
                  style={{ minWidth: '80%' }}
                />
                <SmallHeader title="Colour" style={{ marginTop: 30 }} />
                <ColorPicker
                  handleChange={color => setCurrentColor(color)}
                  alreadyPickedColors={players.map(p => p.color)}
                />
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
        onPress={() => continueTapped()}
      />
      <SafeAreaView />
    </>
  )
}

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

export default EnterInfo

import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import { useSpringTransition } from 'react-native-redash'
import { Header, SmallHeader, Input, Button } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import { savePlayer } from 'app/config/data'
import ColorPicker from './components/ColorPicker'

function AddPlayer() {
  const [name, setName] = useState('')
  const [colour, setColour] = useState('')
  const [s, setS] = useState(false)

  const animation = useSpringTransition(s)

  const translateY = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  function successfullySaved() {
    setS(true)
    setColour('')
    setName('')
    setTimeout(() => {
      setS(false)
    }, 2000)
  }

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <Header title="Add player" />
          <ScrollView contentContainerStyle={styles.views}>
            <SmallHeader title="Name" style={{ marginBottom: -20 }} />
            <Input
              handleChange={t => setName(t)}
              placeholder="Christine"
              value={name}
              hideInputAccessory={true}
              style={{ minWidth: '80%' }}
            />
            <SmallHeader title="Preferred colour" style={{ marginTop: 30 }} />
            <ColorPicker
              handleChange={colour => setColour(colour)}
              currentColour={colour}
            />
          </ScrollView>
          <Button
            title="Save player"
            backgroundColor={colors.YELLOW}
            onPress={async () => {
              const s = await savePlayer({ name: name, colour: colour })
              if (s) {
                successfullySaved()
              }
            }}
          />
        </SafeAreaView>
      </View>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: colors.WHITE,
          left: 0,
          right: 0,
          height: 200,
          transform: [{ translateY }],
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.successful}>Player added!</Text>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  views: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  playerAdded: {
    padding: 40,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  successful: {
    fontSize: 40,
    fontFamily: fonts.BOLD,
  },
})

export default AddPlayer

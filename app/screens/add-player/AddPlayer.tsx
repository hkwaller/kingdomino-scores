import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import { Header, SmallHeader, Input, Button } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import { savePlayer } from 'app/config/data'
import ColorPicker from './components/ColorPicker'

function AddPlayer() {
  const [name, setName] = useState('')
  const [savedName, setSavedName] = useState('')
  const [colour, setColour] = useState('')

  const [s, setS] = useState(false)

  const translateY = useSharedValue(200)

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  useEffect(() => {
    if (s) translateY.value = withSpring(0)
    else translateY.value = withSpring(200)
  }, [s])

  async function save() {
    const s = await savePlayer({ name: name, colour: colour })
    if (s) {
      setS(true)
      Keyboard.dismiss()

      setSavedName(name)
      setColour('')
      setName('')
      setTimeout(() => {
        setS(false)
      }, 2000)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView
            contentContainerStyle={styles.views}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
          >
            <Header title="Add player" />
            <SmallHeader title="Name" style={{ marginBottom: -20 }} />
            <Input
              handleChange={t => setName(t)}
              placeholder="Christine"
              continueTapped={() => save()}
              inputAccessoryText="Save"
              value={name}
              style={{ minWidth: '80%' }}
            />
            <SmallHeader title="Preferred colour" style={{ marginTop: 30 }} />
            <ColorPicker
              handleChange={colour => setColour(colour)}
              currentColour={colour}
            />
          </ScrollView>
          <Button
            title="Save"
            backgroundColor={colors.YELLOW}
            onPress={() => save()}
          />
        </SafeAreaView>
      </View>
      <Animated.View style={[styles.popup, style]}>
        <Text style={styles.successful}>{savedName} added!</Text>
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
  popup: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.WHITE,
    left: 0,
    right: 0,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AddPlayer

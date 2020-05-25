import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { Header, SmallHeader, ColorPicker, Input } from 'app/components'
import { colors } from 'app/config/constants'
import { savePlayer } from 'app/config/data'
import NormalButton from 'app/components/NormalButton'

function AddPlayer() {
  const [name, setName] = useState('')
  const [colour, setColour] = useState('')

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
              hideInputAccessory={true}
              style={{ minWidth: '80%' }}
            />
            <SmallHeader title="Preferred colour" style={{ marginTop: 30 }} />
            <ColorPicker handleChange={colour => setColour(colour)} />
          </ScrollView>
          <NormalButton
            title="Save"
            backgroundColor={colors.YELLOW}
            onPress={async () => {
              const s = await savePlayer({ name: name, colour: colour })
              console.log('s: ', s)
            }}
          />
          <Text>Add another</Text>
        </SafeAreaView>
      </View>
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
})

export default AddPlayer

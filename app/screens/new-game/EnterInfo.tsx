import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from 'app/components'
import SmallHeader from 'app/components/SmallHeader'
import Input from 'app/components/Input'
import Button from 'app/components/Button'
import { colors } from 'app/config/constants'
import ColorPicker from 'app/components/ColorPicker'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    width: '80%',
  },
  views: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

function EnterInfo() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <View style={styles.views}>
        <Header title="New Game" />
        <View style={styles.viewContainer}>
          <SmallHeader title="Name?" style={{ alignSelf: 'center' }} />
          <Input placeholder="Christine" />
        </View>
        <SmallHeader
          title="Colour?"
          style={{ marginLeft: 20, marginBottom: -40 }}
        />
        <ColorPicker />
        <Button title="Continue" backgroundColor={colors.YELLOW} />
      </View>
      <SafeAreaView />
    </ScrollView>
  )
}

export default EnterInfo

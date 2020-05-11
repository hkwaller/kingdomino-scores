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
    alignItems: 'center',
  },
})

function EnterInfo() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView />
        <View style={styles.views}>
          <Header title="New Game" />
          <SmallHeader title="Name" />
          <Input placeholder="Christine" style={{ minWidth: '80%' }} />
          <SmallHeader title="Colour" style={{ marginTop: 30 }} />
          <ColorPicker />
        </View>
        <SafeAreaView />
      </ScrollView>
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

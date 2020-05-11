import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from 'app/components'
import SmallHeader from 'app/components/SmallHeader'
import Input from 'app/components/Input'
import Button from 'app/components/Button'
import { colors } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    marginTop: 20,
  },
  views: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

function SelectPlayers() {
  const navigation = useNavigation()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <View style={styles.views}>
        <Header title="New Game" />
        <View style={styles.viewContainer}>
          <SmallHeader title="How many players?" />
          <Input />
        </View>
        <Button
          title="Continue"
          backgroundColor={colors.YELLOW}
          destination="EnterInfo"
        />
      </View>
      <SafeAreaView />
    </ScrollView>
  )
}

export default SelectPlayers

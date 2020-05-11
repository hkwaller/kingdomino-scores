import React from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Header } from 'app/components'
import Button from 'app/components/Button'
import { colors } from 'app/config/constants'
import { useNavigation } from '@react-navigation/core'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView />
      <Header title="King Domino" />
      <View style={styles.buttonContainer}>
        <Button
          title="New Game"
          backgroundColor={colors.GREEN}
          lean="right"
          destination="NewGame"
        />
        <Button
          title="Continue"
          backgroundColor={colors.YELLOW}
          lean="left"
          destination=""
        />
        <Button
          title="Statistics"
          backgroundColor={colors.BLUE}
          lean="right"
          destination=""
        />
      </View>
    </ScrollView>
  )
}

export default Home

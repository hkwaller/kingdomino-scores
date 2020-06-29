import React from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Header, Button } from 'app/components'
import { colors } from 'app/config/constants'
import Players from '../new-game/Players'

function Home() {
  const navigation = useNavigation()

  return (
    <>
      <SafeAreaView />
      <Header title="King Domino" />

      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <Players />
        {/* <Button
          title="New Game"
          backgroundColor={colors.YELLOW}
          lean="right"
          onPress={() => navigation.navigate('NewGame')}
        /> */}
        {/* <Button
          title="Add Player"
          lean="left"
          small
          backgroundColor={colors.GREEN}
          onPress={() => navigation.navigate('AddPlayer')}
        /> */}
        <View style={{ marginVertical: 20 }} />
        <Button
          title="Statistics"
          backgroundColor={colors.BLUE}
          lean="right"
          small
          onPress={() => navigation.navigate('Statistics')}
        />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
})

export default Home

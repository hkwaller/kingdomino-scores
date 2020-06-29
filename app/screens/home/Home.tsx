import React from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'
import { Header, Button } from 'app/components'
import { colors } from 'app/config/constants'
import { state } from 'app/config/data'
import Players from '../new-game/Players'
import ContinueButton from '../new-game/components/ContinueButton'

function Home() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <Header title="King Domino" />
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
      <ContinueButton
        selectedPlayersIsOver={state.selectedPlayers.length > 1}
        onPress={() =>
          navigation.navigate('Register', { players: state.selectedPlayers })
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    paddingBottom: 200,
  },
})

export default view(Home)

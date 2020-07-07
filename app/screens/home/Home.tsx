import React, { useEffect, useCallback } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'
import * as StoreReview from 'expo-store-review'

import { Header, Button } from 'app/components'
import { colors } from 'app/config/constants'
import { state } from 'app/config/data'
import Players from '../new-game/Players'
import ContinueButton from '../new-game/components/ContinueButton'

function Home() {
  const navigation = useNavigation()
  const route = useRoute()

  useFocusEffect(
    useCallback(() => {
      if (
        Platform.OS === 'ios' &&
        route.params?.checkForReview &&
        state.timesPlayed > 0 &&
        state.timesPlayed % 2 === 0
      ) {
        StoreReview.requestReview()
      }
    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <Header title="King Domino" />
        <Players />
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

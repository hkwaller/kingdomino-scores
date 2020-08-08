import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { view } from '@risingstack/react-easy-state'
import * as StoreReview from 'expo-store-review'
import * as InAppPurchases from 'expo-in-app-purchases'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Header, Button } from 'app/components'
import { colors, fonts } from 'app/config/constants'
import { state } from 'app/config/data'
import Players from '../new-game/Players'
import ContinueButton from '../new-game/components/ContinueButton'
import Modal from 'app/components/Modal'
import AsyncStorage from '@react-native-community/async-storage'

function Home() {
  const [isVisible, setIsVisible] = useState(
    !state.hasPurchased && state.timesPlayed >= 5
  )
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    state.limited && setIsVisible(false)
  }, [state.limited])

  setTimeout(() => {
    if (
      route.params?.checkForReview &&
      state.timesPlayed % 5 === 0 &&
      !state.hasAsked &&
      Platform.OS === 'ios'
    ) {
      state.hasAsked = true
      StoreReview.requestReview()
    }
  }, 1000)

  useEffect(() => {
    async function check() {
      const history = await InAppPurchases.connectAsync()
      if (history.responseCode === InAppPurchases.IAPResponseCode.OK) {
        history.results.forEach(result => {
          console.log('result: ', result)
          if (result) state.hasPurchased = true
        })
      } else {
        console.log('could not get history')
      }

      const id = Platform.select({
        ios: ['1'],
        android: ['Premium'],
      })

      await InAppPurchases.getProductsAsync(id || [])

      InAppPurchases.setPurchaseListener(
        ({ responseCode, results, errorCode }) => {
          if (responseCode === InAppPurchases.IAPResponseCode.OK) {
            results.forEach(purchase => {
              if (!purchase.acknowledged) {
                state.hasPurchased = true
                AsyncStorage.setItem('@hasPurchased', JSON.stringify(true))
                InAppPurchases.finishTransactionAsync(purchase, true)
              }
            })
          }

          if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
            console.log('User canceled the transaction')
          } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
            console.log(
              'User does not have permissions to buy but requested parental approval (iOS only)'
            )
          } else {
            console.warn(
              `Something went wrong with the purchase. Received errorCode ${errorCode}`
            )
          }
        }
      )
    }
    if (!state.hasPurchased) {
      check()
      if (state.timesPlayed > 10) {
        state.limited = true
      }
    }
  }, [])

  useEffect(() => {
    if (state.timesPlayed > 10 && !state.hasPurchased) {
      state.limited = true
    }
  }, [state.timesPlayed])

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.buttonContainer}>
          <Header title="King Domino" />
          {!state.limited && <Players />}
          <View style={{ marginVertical: 20 }} />
          <Button
            title="Statistics"
            backgroundColor={colors.BLUE}
            lean="right"
            small
            onPress={() => navigation.navigate('Statistics')}
          />
          {!state.hasPurchased && state.timesPlayed > 5 && (
            <>
              <Text style={{ padding: 24, textAlign: 'center', fontSize: 18 }}>
                You still haven't purchased the full app. That is ok. You still
                got {Math.max(0, 10 - state.timesPlayed)} more games to go
                before you have to make a decision.
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  padding: 20,
                  backgroundColor: colors.PINK,
                  borderRadius: 50,
                }}
                onPress={() => setIsVisible(true)}
              >
                <Text
                  style={{
                    color: colors.WHITE,
                    fontSize: 24,
                    fontFamily: fonts.BOLD,
                  }}
                >
                  Purchase now
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
        <ContinueButton
          selectedPlayersIsOver={state.selectedPlayers.length > 1}
          onPress={() =>
            navigation.navigate('Register', { players: state.selectedPlayers })
          }
        />
      </SafeAreaView>
      <Modal isVisible={isVisible} onPress={() => setIsVisible(false)} />
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
    paddingBottom: 200,
  },
})

export default view(Home)

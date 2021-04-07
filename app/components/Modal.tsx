import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Platform } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'
import {
  TouchableOpacity,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'
import * as InAppPurchases from 'expo-in-app-purchases'

import { screen, colors, fonts } from 'app/config/constants'
import SmallHeader from './SmallHeader'
import { state } from 'app/config/data'
import { setupPurchases, setupPurchaseListener } from 'app/config/utils'

type Props = {
  isVisible: boolean
  onPress: () => void
}

function Modal({ isVisible, onPress }: Props) {
  const translateY = useSharedValue(screen.HEIGHT + 50)

  useEffect(() => {
    if (isVisible) translateY.value = 0
    else translateY.value = screen.HEIGHT + 50
  }, [isVisible])

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withSpring(translateY.value, { damping: 15 }) },
      ],
    }
  })

  return (
    <Animated.View style={[style, styles.outerContainer]}>
      <TapGestureHandler
        onHandlerStateChange={event => {
          if (event.nativeEvent.state === State.END) {
            onPress()
          }
        }}
      >
        <Animated.View style={styles.fillObject} />
      </TapGestureHandler>
      <View style={[styles.container]}>
        <SmallHeader title="Continue with KD Scores?" />
        <Text style={{ paddingVertical: 40 }}>
          In order to continue to use the app you have to purchase the full
          version.
        </Text>
        <TouchableOpacity
          style={styles.buyButtonContainer}
          onPress={async () => {
            const id = Platform.OS === 'android' ? 'premium' : '1'
            await setupPurchases()
            await setupPurchaseListener()
            await InAppPurchases.purchaseItemAsync(id)
          }}
        >
          <Text style={styles.buyButtonText}>Purchase now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statsButton}
          onPress={() => {
            onPress()
            state.limited = !state.hasPurchased && state.timesPlayed > 10
          }}
        >
          <Text>I'm just going to check some stats</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    height: screen.HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    width: screen.WIDTH,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    height: screen.HEIGHT / 2,
    paddingTop: 40,
    backgroundColor: colors.WHITE,
  },
  buyButtonContainer: {
    backgroundColor: colors.PINK,
    padding: 20,
    borderRadius: 100,
    alignContent: 'center',
  },
  buyButtonText: {
    textAlign: 'center',
    fontFamily: fonts.BOLD,
    fontSize: 20,
  },
  statsButton: {
    marginBottom: 60,
    alignSelf: 'center',
    marginTop: 40,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK,
  },
  fillObject: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.BLACK,
    marginTop: -50,
    opacity: 0.8,
  },
})
export default Modal

import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  InputAccessoryView,
  TouchableOpacity,
  Text,
} from 'react-native'
import { colors, fonts } from 'app/config/constants'

type Props = {
  placeholder?: string
  type?: 'numeric' | 'default'
  style?: StyleProp<ViewStyle>
  handleChange: (string) => void
  continueTapped?: () => void
  handleFocus?: () => void
  hideInputAccessory?: boolean
  inputAccessoryText?: string
  value: string
}

function Input({
  placeholder,
  type = 'default',
  style,
  value,
  handleChange,
  continueTapped,
  hideInputAccessory = false,
  handleFocus = () => {},
  inputAccessoryText,
}: Props) {
  const inputAccessoryViewID = 'supermegaID'

  return (
    <>
      <View style={[styles.container, style]}>
        <View style={styles.background} />
        <TextInput
          style={styles.text}
          keyboardType={type}
          onChangeText={text => {
            handleChange(text)
          }}
          onFocus={handleFocus}
          value={value}
          inputAccessoryViewID={inputAccessoryViewID}
          placeholder={placeholder}
        />
      </View>
      {!hideInputAccessory && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={styles.inputAccessoryViewContainer}>
            <TouchableOpacity
              style={styles.inputAccessoryViewButton}
              onPress={() => {
                continueTapped()
              }}
            >
              <Text style={styles.inputAccessoryViewButtonText}>
                {inputAccessoryText || 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.WHITE,
    transform: [{ rotate: '2deg' }],
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 60,
    fontFamily: fonts.BOLD,
  },
  inputAccessoryViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
  },
  inputAccessoryViewButton: {
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: colors.YELLOW,
    transform: [{ rotate: '2deg' }],
    alignSelf: 'center',
  },
  inputAccessoryViewButtonText: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: fonts.BOLD,
  },
})

export default Input

import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  InputAccessoryView,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native'
import { colors, fonts } from 'app/config/constants'

type Props = {
  placeholder?: string
  type?: 'numeric' | 'default'
  style?: StyleProp<ViewStyle>
  handleChange: (val: string) => void
  continueTapped?: () => void
  previousTapped?: () => void
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
  previousTapped,
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
          onFocus={handleFocus}
          defaultValue={value}
          inputAccessoryViewID={inputAccessoryViewID}
          placeholder={placeholder}
          onChangeText={text => {
            handleChange(text)
          }}
        />
      </View>
      {!hideInputAccessory && Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={styles.inputAccessoryViewContainer}>
            {previousTapped && (
              <TouchableOpacity
                onPress={() => previousTapped()}
                style={[
                  styles.inputAccessoryViewButton,
                  { backgroundColor: colors.PINK },
                ]}
              >
                <Text style={styles.inputAccessoryViewButtonText}>
                  {inputAccessoryText || 'Previous'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.inputAccessoryViewButton}
              onPress={() => continueTapped && continueTapped()}
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
  },
  inputAccessoryViewButton: {
    padding: 10,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.YELLOW,
    transform: [{ rotate: '2deg' }],
    alignSelf: 'center',
  },
  inputAccessoryViewButtonText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fonts.BOLD,
  },
})

export default Input

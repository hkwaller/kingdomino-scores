import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from 'app/config/constants'
// import { setupPurchases } from 'app/config/utils'

function Purchase() {
  return (
    <>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          padding: 20,
          backgroundColor: colors.GREEN,
          borderRadius: 50,
          paddingHorizontal: 30,
          marginTop: 20,
        }}
        // onPress={() => setupPurchases()}
      >
        <Text
          style={{
            fontSize: 24,
            fontFamily: fonts.BOLD,
          }}
        >
          Restore purchase
        </Text>
      </TouchableOpacity>
    </>
  )
}
export default Purchase

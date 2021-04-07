import {
  connectAsync,
  IAPResponseCode,
  getProductsAsync,
  setPurchaseListener,
  finishTransactionAsync,
} from 'expo-in-app-purchases'
import { state } from './data'
import AsyncStorage from '@react-native-async-storage/async-storage'

export async function setupPurchases() {
  const history = await connectAsync()
  if (history.responseCode === IAPResponseCode.OK) {
    history.results?.forEach((result) => {
      if (result.productId === 'premium') state.hasPurchased = true
    })
  } else {
    console.log('shit failed yo')
  }
}

export async function setupPurchaseListener() {
  await getProductsAsync(['premium'])

  setPurchaseListener(({ responseCode, results, errorCode }) => {
    if (responseCode === IAPResponseCode.OK) {
      results.forEach((purchase) => {
        if (!purchase.acknowledged) {
          state.hasPurchased = true
          AsyncStorage.setItem('@hasPurchased', JSON.stringify(true))
          finishTransactionAsync(purchase, false)
        }
      })
    }

    if (responseCode === IAPResponseCode.USER_CANCELED) {
      console.log('User canceled the transaction')
    } else if (responseCode === IAPResponseCode.DEFERRED) {
      console.log(
        'User does not have permissions to buy but requested parental approval (iOS only)'
      )
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`
      )
    }
  })
}

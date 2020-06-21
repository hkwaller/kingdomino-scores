import React, { useEffect, useState, useRef } from 'react'
import { View, Animated } from 'react-native'

type Props = {
  children: React.ReactNode
  delay: number
  active: boolean
}

function BonusRow({ children, delay, active }: Props) {
  console.log('active: ', active)
  const [isActive, setIsActive] = useState(false)
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setIsActive(active)
  }, [])

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isActive ? 1 : 0,
      delay: delay,
      duration: 500,
    }).start()
  }, [isActive])

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  })

  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      {children}
    </Animated.View>
  )
}
export default BonusRow

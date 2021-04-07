import React, { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { fonts } from 'app/config/constants'

type Props = {
  to: number
  onFinish: () => void
}

function CountUp({ to, onFinish }: Props) {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(100)

  useEffect(() => {
    if (count === to) {
      return onFinish()
    }
    setTimeout(() => {
      setCount(count => count + 1)
      setTime(time => time - 10)
    }, time)
  }, [count])

  return <Text style={styles.score}>{count}</Text>
}

const styles = StyleSheet.create({
  score: {
    fontFamily: fonts.BOLD,
    fontSize: 100,
    marginTop: 10,
  },
})

export default CountUp

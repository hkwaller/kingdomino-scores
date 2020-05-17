import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { VictoryPie, VictoryChart } from 'victory-native'

import { data } from 'app/config/data'
import { ScrollView } from 'react-native-gesture-handler'
import { Header } from 'app/components'

type Props = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
  },
})

function Statistics(props: Props) {
  return (
    <>
      <SafeAreaView />
      <Header title="Statistics" />
      <ScrollView contentContainerStyle={styles.container}>
        <VictoryPie
          animate={{
            duration: 1000,
          }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#c43a31',
              strokeWidth: 3,
            },
            labels: {
              fontSize: 25,
              fill: '#c43a31',
            },
          }}
          colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
          categories={{ x: ['dogs', 'cats', 'Birds'] }}
          data={[
            { x: 'Cats', y: 35 },
            { x: 'Dogs', y: 40 },
            { x: 'Birds', y: 55 },
          ]}
        />
      </ScrollView>
    </>
  )
}
export default Statistics

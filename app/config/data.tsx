import AsyncStorage from '@react-native-community/async-storage'
import { store, autoEffect } from '@risingstack/react-easy-state'

export type Player = {
  id: number
  name: string
  color: string
}

export type Game = {
  date: Date
  game: number[][]
  players: number[]
}

type State = {
  players: Player[]
  games: Game[]
  matchups: number[][]
}

export const state = store<State>({
  players: [],
  games: [],
  matchups: [],
})

autoEffect(() => {
  if (state.players.length === 0) return
  AsyncStorage.setItem('players', JSON.stringify(state.players))
})

autoEffect(() => {
  if (state.games.length === 0) return
  AsyncStorage.setItem('games', JSON.stringify(state.games))
})

autoEffect(() => {
  if (state.matchups.length === 0) return
  AsyncStorage.setItem('matchups', JSON.stringify(state.matchups))
})

export async function saveGame(data) {
  console.log('data: ', data)
  // await AsyncStorage.setItem('games', '[]')
  const newData = {
    game: data.game,
    players: data.players,
    ids: data.players.map((p: Player) => p.id),
    date: new Date(),
  }

  console.log('newData: ', newData)
  const p = state.games
  p.push(newData)
  state.games = p
  state.matchups.push(data.players.map(p => p.id))
}

export async function savePlayer(player: Player) {
  try {
    const highestExistingId =
      Math.max.apply(Math, state.players.map(p => p.id) || 0) + 1

    if (state.players.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      state.players.push(
        Object.assign(player, {
          id: highestExistingId === -Infinity ? 0 : highestExistingId,
        })
      )

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}

export async function deletePlayer(player: Player) {
  const matchups = state.matchups.filter(m => {
    if (m.indexOf(player.id) > -1) return m
  })

  const players = state.players.filter(p => {
    if (player.id !== p.id) return p
  })

  state.players = players
  state.matchups = matchups
}

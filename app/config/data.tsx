import AsyncStorage from '@react-native-community/async-storage'
import { store, autoEffect } from '@risingstack/react-easy-state'

export type Player = {
  id: number
  name: string
  color: string
  alldominos?: boolean
  king?: boolean
  score?: number
  finished?: boolean
}

export type Game = {
  date: Date
  game: number[][]
  players: number[]
  ids: number[]
}

type State = {
  players: Player[]
  games: Game[]
  matchups: number[][]
  selectedPlayers: Player[]
  highestId: number
  timesPlayed: number
  hasAsked: boolean
}

export const state = store<State>({
  players: [],
  games: [],
  matchups: [],
  selectedPlayers: [],
  highestId: 0,
  timesPlayed: 0,
  hasAsked: false,
})

autoEffect(() => {
  if (state.players.length === 0) return
  AsyncStorage.setItem('players', JSON.stringify(state.players))
  AsyncStorage.setItem('highestId', JSON.stringify(state.highestId))
})

autoEffect(() => {
  if (state.games.length === 0) return
  AsyncStorage.setItem('games', JSON.stringify(state.games))
})

autoEffect(() => {
  if (state.matchups.length === 0) return
  AsyncStorage.setItem('matchups', JSON.stringify(state.matchups))
})

autoEffect(() => {
  if (state.timesPlayed === 0) return
  AsyncStorage.setItem('timesPlayed', JSON.stringify(state.timesPlayed))
})

export async function saveGame(data) {
  const newData = {
    game: data.game,
    players: data.players,
    ids: data.players.map((p: Player) => p.id),
    date: new Date(),
  }

  state.games.push(newData)
  const matchups = [data.players.map(p => p.id), ...state.matchups]

  const stringifiedMatchups = new Set(matchups.map(JSON.stringify))
  state.matchups = Array.from(stringifiedMatchups).map(JSON.parse)
}

export async function savePlayer(player: Player) {
  try {
    if (state.players.filter(p => p.name === player.name).length > 0) {
      return 'nonono we got that one'
    } else {
      state.players.push(
        Object.assign(player, {
          id: state.highestId + 1,
        })
      )

      ++state.highestId

      return 'hell yeah'
    }
  } catch (e) {
    console.log('e: ', e)
  }
}

export async function deletePlayer(player: Player) {
  const matchups = state.matchups.filter(m => {
    if (m.indexOf(player.id) === -1) return m
  })

  const players = state.players.filter(p => {
    if (player.id !== p.id) return p
  })

  state.selectedPlayers = state.selectedPlayers.filter(p => p.id !== player.id)
  state.players = players
  state.matchups = matchups
}

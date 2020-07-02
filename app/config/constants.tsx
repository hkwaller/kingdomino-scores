import { Dimensions } from 'react-native'
import {
  fish,
  fishWhite,
  lion,
  lionWhite,
  unicorn,
  unicornWhite,
  crocodile,
  crocodileWhite,
  user,
  userWhite,
} from 'app/config/images'
export const colors = {
  GREEN: '#28ECA5',
  BLUE: '#3FC0F8',
  PINK: '#f54291',
  YELLOW: '#FDD827',
  BACKGROUND: '#EAE7D6',
  WHITE: '#fff',
  BLACK: '#2B2B2C',
  GREY: '#999999',
}

export const colorArray = ['#FDD827', '#FF5959', '#28ECA5', '#3FC0F8']

export const landscapeColors = {
  FIELD: '#fbd46d',
  WOODS: '#438a5e',
  WATER: '#0fabbc',
  GRASS: '#a8df65',
  MUD: '#b9ac92',
  MINE: '#092532',
}

export const animals = {
  GREEN: crocodile,
  BLUE: fish,
  YELLOW: lion,
  PINK: unicorn,
}

export const animalsWhite = {
  GREEN: crocodileWhite,
  BLUE: fishWhite,
  YELLOW: lionWhite,
  PINK: unicornWhite,
}

export function getAnimalWithColor(color: string, isWhite: boolean) {
  switch (color) {
    case colors.PINK:
      return isWhite ? unicornWhite : unicorn
    case colors.YELLOW:
      return isWhite ? lionWhite : lion
    case colors.BLUE:
      return isWhite ? fishWhite : fish
    case colors.GREEN:
      return isWhite ? crocodileWhite : crocodile
    default:
      return isWhite ? userWhite : user
  }
}

export const landscapeFontColors = {
  FIELD: '#000',
  WOODS: '#000',
  WATER: '#000',
  GRASS: '#000',
  MUD: '#000',
  MINE: '#fff',
}

export const fonts = {
  BOLD: 'FormulaCondensed-Bold',
  LIGHT: 'FormulaCondensed-Light',
}

export const screen = {
  HEIGHT: Dimensions.get('screen').height,
  WIDTH: Dimensions.get('screen').width,
}

export const types = ['Field', 'Woods', 'Water', 'Grass', 'Mud', 'Mine']

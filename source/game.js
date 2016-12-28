import {Record, Set} from 'immutable'

const ACTIONS = {DOWN: '↓', LEFT: '←', RIGHT: '→', UP: '↑'}
const ENTITIES = {ROBSON: '🤖', GOAL: '❤', HAZARD: '💀'}

const Tile = new Record({row: 0, col: 0})

const State = new Record({
  rows: 3, cols: 3,
  robson: new Tile({row: 0, col: 0}),
  goals: new Set([new Tile({row: 0, col: 2})]),
  hazards: new Set([new Tile({row: 0, col: 1}), new Tile({row: 1, col: 1})])
})

const observe = new Record({robson: null, goals: null})
const actions = () => Object.values(ACTIONS)

const victory = s => s.goals.size === 0
const defeat = s => s.robson === null
const final = s => victory(s) || defeat(s)

const reward = (s1, s0) =>
  (s0.goals.size - s1.goals.size) -
  (s1.robson === null ? 0.99 : 0) -
  0.01

const act = (s, a) => {
  const {rows, cols, robson: {row, col}} = s

  const robson = new Tile({
    row:
      a === ACTIONS.UP && row > 0 ? row - 1 :
      a === ACTIONS.DOWN && row + 1 < rows ? row + 1 :
      row,
    col:
      a === ACTIONS.LEFT && col > 0 ? col - 1 :
      a === ACTIONS.RIGHT && col + 1 < cols ? col + 1 :
      col
  })

  return s
    .set('robson', s.hazards.includes(robson) ? null : robson)
    .set('goals', s.goals.delete(robson))
}

export {
  ACTIONS, ENTITIES,
  Tile, State,
  observe, actions,
  victory, defeat, final,
  reward, act
}

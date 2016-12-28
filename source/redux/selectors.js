import {createSelector} from 'reselect'
import {rater} from 'markovjs-immutable'
import {Range, is} from 'immutable'
import * as gw from '../game'

const baseGame = s => s.game
const prevGame = s => s.gameState
const currGame = s => s.nextGameState

const memory = s => s.memory
const running = s => s.running

const alpha = s => s.alpha
const gamma = s => s.gamma
const epsilon = s => s.epsilon
const interval = s => s.interval

const final = createSelector(currGame, gw.final)
const rows = createSelector(baseGame, g => g.rows)
const cols = createSelector(baseGame, g => g.cols)
const goals = createSelector(currGame, g => g.goals)
const initial = createSelector(baseGame, currGame, is)

const board = createSelector(currGame, g =>
  new Range(0, g.rows).map(row =>
    new Range(0, g.cols).map(col =>
      new gw.Tile({row, col}))))

const robson = tile => createSelector(baseGame, prevGame, currGame, (b, p, c) => ({
  base: is(b.robson, tile),
  prev: is(p && p.robson, tile),
  curr: is(c.robson, tile)
}))
const goal = tile => createSelector(baseGame, prevGame, currGame, (b, p, c) => ({
  base: b.goals.includes(tile),
  prev: p && p.goals.includes(tile),
  curr: c.goals.includes(tile)
}))
const hazard = tile => createSelector(baseGame, prevGame, currGame, (b, p, c) => ({
  base: b.hazards.includes(tile),
  prev: p && p.hazards.includes(tile),
  curr: c.hazards.includes(tile)
}))

const values = tile => createSelector(currGame, memory, (g, m) =>
  (rate => Object.values(gw.ACTIONS).reduce(
    (vs, a) => ({...vs, [a]: rate(a)}), {}
  ))(rater(m, g.set('robson', tile)))
)

const greedy = tile => createSelector(values(tile), vs =>
  Object.keys(vs).reduce((v, k) =>
    v && v.value > vs[k] ? v : {action: k, value: vs[k]}, null
  ))

const color = tile => createSelector(greedy(tile), goals, ({value}, {size}) => {
  const vmin = (1 + value) * 255
  const vmax = (1 - value) / size * 255
  return {
    r: value > 0 ? vmax : 255,
    g: value < 0 ? vmin : 255,
    b: value < 0 ? vmin : value > 0 ? vmax : 255
  }
})

export {
  running, final, rows, cols, initial,
  alpha, gamma, epsilon, interval,
  board, values, greedy, color,
  robson, goal, hazard
}

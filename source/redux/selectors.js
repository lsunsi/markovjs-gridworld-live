import {createSelector} from 'reselect'
import {rater} from 'markovjs-immutable'
import {Range, is} from 'immutable'
import Color from 'color'
import {ACTIONS, Tile, final} from '../game'

const resetGameState = s => s.game
const gameState = s => s.nextGameState
const memoryState = s => s.memory
const interval = s => s.interval
const action = s => s.action
const reward = s => s.reward

const params = s => ({alpha: s.alpha, gamma: s.gamma, epsilon: s.epsilon, interval: s.interval})

const done = createSelector(gameState, final)

const dimensions = createSelector(gameState, gs => ({rows: gs.rows, cols: gs.cols}))

const board = createSelector(gameState, gs =>
  new Range(0, gs.rows).map(row =>
    new Range(0, gs.cols).map(col =>
      new Tile({row, col}))))

const tile = tile => createSelector(
  gameState, memoryState, (gs, ms) => ({
    robson: is(gs.robson, tile),
    goal: gs.goals.includes(tile),
    hazard: gs.hazards.includes(tile),
    values: (rate => Object.values(ACTIONS).reduce((vs, a) => ({...vs, [a]: rate(a)}), {}))(rater(ms, {robson: tile}))
  })
)

const color = t => createSelector(resetGameState, tile(t), (gs, {values}) => {
  const max = gs.goals.size
  const v = Math.max.apply(null, Object.values(values))
  const vmin = (1 + v) * 255
  const vmax = (1 - v) / max * 255
  return (
    v < 0 ? new Color({r: 255, g: vmin, b: vmin}) :
    v > 0 ? new Color({r: vmax, g: 255, b: vmax}) :
    new Color({r: 255, g: 255, b: 255})
  ).string()
})

export {action, reward, done, board, dimensions, tile, interval, color, params}

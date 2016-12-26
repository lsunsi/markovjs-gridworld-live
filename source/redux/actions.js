const GAME = {MOVE: 'game/MOVE', LEARN: 'game/LEARN', RESET: 'game/RESET'}
const TASKS = {PLAY: 'tasks/PLAY', TRAIN: 'tasks/TRAIN', CANCEL: 'tasks/CANCEL'}
const BOARD = {ROWS: 'board/ROWS', COLS: 'board/COLS', GOAL: 'board/GOAL', HAZARD: 'board/HAZARD'}
const PARAMS = {ALPHA: 'params/ALPHA', GAMMA: 'params/GAMMA', EPSILON: 'params/EPSILON', INTERVAL: 'params/INTERVAL'}

const move = () => ({type: GAME.MOVE})
const learn = () => ({type: GAME.LEARN})
const reset = () => ({type: GAME.RESET})
const play = () => ({type: TASKS.PLAY})
const train = () => ({type: TASKS.TRAIN})
const cancel = () => ({type: TASKS.CANCEL})
const rows = rows => ({type: BOARD.ROWS, payload: rows})
const cols = cols => ({type: BOARD.COLS, payload: cols})
const goal = tile => ({type: BOARD.GOAL, payload: tile})
const hazard = tile => ({type: BOARD.HAZARD, payload: tile})
const alpha = a => ({type: PARAMS.ALPHA, payload: a})
const gamma = g => ({type: PARAMS.GAMMA, payload: g})
const epsilon = e => ({type: PARAMS.EPSILON, payload: e})
const interval = ms => ({type: PARAMS.INTERVAL, payload: ms})

export {
  GAME, BOARD, PARAMS, TASKS,
  move, learn, reset,
  play, train, cancel, interval,
  rows, cols, goal, hazard,
  alpha, gamma, epsilon
}

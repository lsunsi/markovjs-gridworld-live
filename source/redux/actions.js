const task = {
  START: 'task/START',
  STOP: 'task/STOP',

  start: () => ({type: task.START}),
  stop: () => ({type: task.STOP})
}

const game = {
  MOVE: 'game/MOVE',
  LEARN: 'game/LEARN',
  RESET: 'game/RESET',

  move: () => ({type: game.MOVE}),
  learn: () => ({type: game.LEARN}),
  reset: () => ({type: game.RESET})
}

const board = {
  ROWS: 'board/ROWS',
  COLS: 'board/COLS',
  GOAL: 'board/GOAL',
  HAZARD: 'board/HAZARD',
  ROBSON: 'board/ROBSON',

  rows: rows => ({type: board.ROWS, rows}),
  cols: cols => ({type: board.COLS, cols}),
  goal: (tile, set) => ({type: board.GOAL, tile, set}),
  hazard: (tile, set) => ({type: board.HAZARD, tile, set}),
  robson: tile => ({type: board.ROBSON, tile})
}

const params = {
  ALPHA: 'params/ALPHA',
  GAMMA: 'params/GAMMA',
  EPSILON: 'params/EPSILON',
  INTERVAL: 'params/INTERVAL',

  alpha: alpha => ({type: params.ALPHA, alpha}),
  gamma: gamma => ({type: params.GAMMA, gamma}),
  epsilon: epsilon => ({type: params.EPSILON, epsilon}),
  interval: interval => ({type: params.INTERVAL, interval})
}

export {task, game, board, params}

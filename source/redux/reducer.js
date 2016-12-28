import move from 'markovjs/lib/move'
import learn from 'markovjs/lib/learn'
import * as policies from 'markovjs/policies'
import * as memory from 'markovjs-immutable'
import * as gridworld from '../game'
import {task, game, board, params} from './actions'
import initial from './initial'

const reducers = {
  [task.START]: s => ({...s, running: true}),
  [task.STOP]: s => ({...s, running: false}),

  [params.ALPHA]: (s, {alpha}) => ({...s, alpha}),
  [params.GAMMA]: (s, {gamma}) => ({...s, gamma}),
  [params.EPSILON]: (s, {epsilon}) => ({...s, epsilon}),
  [params.INTERVAL]: (s, {interval}) => ({...s, interval}),

  [board.ROWS]: (s, {rows}) => ({...s, game: s.game
    .set('rows', rows)
    .update('hazards', hzs => hzs.filter(hz => hz.row < rows))
    .update('goals', gs => gs.filter(g => g.row < rows))
  }),
  [board.COLS]: (s, {cols}) => ({...s, game: s.game
    .set('cols', cols)
    .update('hazards', hzs => hzs.filter(hz => hz.col < cols))
    .update('goals', gs => gs.filter(g => g.col < cols))
  }),
  [board.GOAL]: (s, {tile, set}) => ({...s, game: s.game
    .update('goals', gs => gs[set ? 'add' : 'remove'](tile))
  }),
  [board.HAZARD]: (s, {tile, set}) => ({...s, game: s.game
    .update('hazards', hzs => hzs[set ? 'add' : 'remove'](tile))
  }),
  [board.ROBSON]: (s, {tile}) => ({...s, game: s.game
    .set('robson', tile)
  }),

  [game.MOVE]: s => ({...s, ...move(
    gridworld, s.nextGameState,
    memory, s.memory,
    policies.egreedy(s.epsilon)
  )}),
  [game.LEARN]: s => ({...s, memory: learn(
    s.alpha, s.gamma,
    gridworld, s,
    memory, s.memory,
    policies.greedy
  )}),
  [game.RESET]: s => ({...s,
    nextGameState: s.game,
    gameState: initial.gameState,
    reward: initial.reward,
    action: initial.action
  })
}

export default (s = initial, {type, ...a}) =>
  (reducers[type] || (x => x))(s, a)

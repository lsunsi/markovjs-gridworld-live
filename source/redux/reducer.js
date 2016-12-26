import move from 'markovjs/lib/move'
import learn from 'markovjs/lib/learn'
import * as policies from 'markovjs/policies'
import * as memory from 'markovjs-immutable'
import * as game from '../game'
import {GAME, BOARD, PARAMS} from './actions'
import initial from './initial'

const reducer = (s = initial, a) => {
  switch (a.type) {
    case GAME.MOVE: return {...s, ...move(
      game, s.nextGameState,
      memory, s.memory,
      policies.egreedy(s.epsilon)
    )}
    case GAME.LEARN: return {...s, memory: learn(
      s.alpha, s.gamma,
      game, s,
      memory, s.memory,
      policies.greedy
    )}
    case GAME.RESET: return {...s,
      nextGameState: s.game,
      gameState: null,
      reward: null,
      action: null
    }
    case BOARD.ROWS: return {...s,
      game: s.game
        .set('rows', a.payload)
        .update('hazards', hzs => hzs.filter(hz => hz.row < a.payload))
        .update('goals', hzs => hzs.filter(hz => hz.row < a.payload)),
      nextGameState: s.nextGameState.set('rows', a.payload)
        .set('rows', a.payload)
        .update('hazards', hzs => hzs.filter(hz => hz.row < a.payload))
        .update('goals', hzs => hzs.filter(hz => hz.row < a.payload))
    }
    case BOARD.COLS: return {...s,
      game: s.game
        .set('cols', a.payload)
        .update('hazards', hzs => hzs.filter(hz => hz.col < a.payload))
        .update('goals', hzs => hzs.filter(hz => hz.col < a.payload)),
      nextGameState: s.nextGameState
        .set('cols', a.payload)
        .update('hazards', hzs => hzs.filter(hz => hz.col < a.payload))
        .update('goals', hzs => hzs.filter(hz => hz.col < a.payload))
    }
    case BOARD.GOAL: return {...s,
      game: s.game.update('goals',
        gs => gs.includes(a.payload) ? gs.remove(a.payload) : gs.add(a.payload))
    }
    case BOARD.HAZARD: return {...s,
      game: s.game.update('hazards',
        hs => hs.includes(a.payload) ? hs.remove(a.payload) : hs.add(a.payload))
    }
    case PARAMS.ALPHA: return {...s, alpha: a.payload}
    case PARAMS.GAMMA: return {...s, gamma: a.payload}
    case PARAMS.EPSILON: return {...s, epsilon: a.payload}
    case PARAMS.INTERVAL: return {...s, interval: a.payload}
    default: return s
  }
}

export default reducer

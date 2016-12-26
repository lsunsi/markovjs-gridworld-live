import {init} from 'markovjs-immutable'
import {State, observe} from '../game'

export default {
  game: new State(),
  memory: init(0.0, observe),
  interval: 500,

  nextGameState: new State(),
  gameState: null,
  action: null,
  reward: null,

  alpha: 0.9,
  gamma: 0.9,
  epsilon: 0.1
}
